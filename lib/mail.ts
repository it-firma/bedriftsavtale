import { NextResponse } from 'next/server';
import { contact } from '@/lib/contact';
import { sendContactMail, smtpConfigured } from '@/lib/mail';

export const runtime = 'nodejs';
export const maxDuration = 60;

const attempts = new Map<
  string,
  { count: number; until: number }
>();

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (origin) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json(
          { error: 'Forespørselen må sendes fra nettsiden.' },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Ugyldig forespørsel.' },
        { status: 400 }
      );
    }
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { error: 'Ugyldig innholdstype.' },
      { status: 415 }
    );
  }

  if (Number(request.headers.get('content-length')) > 16000) {
    return NextResponse.json(
      { error: 'Forespørselen er for stor.' },
      { status: 413 }
    );
  }

  let data: Record<string, unknown>;

  try {
    const text = await request.text();

    if (text.length > 16000) {
      return NextResponse.json(
        { error: 'Forespørselen er for stor.' },
        { status: 413 }
      );
    }

    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: 'Ugyldig forespørsel.' },
      { status: 400 }
    );
  }

  if (!data || Array.isArray(data) || typeof data !== 'object') {
    return NextResponse.json(
      { error: 'Ugyldig forespørsel.' },
      { status: 400 }
    );
  }

  // Ignorer innsendinger som fyller ut det skjulte spamfeltet.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const str = (key: string) =>
    typeof data[key] === 'string'
      ? String(data[key]).trim()
      : '';

  const company = str('company');
  const name = str('name');
  const email = str('email');
  const phone = str('phone');
  const message = str('message');
  const services = str('services');
  const type = str('type');

  if (
    company.length < 2 ||
    company.length > 120 ||
    /[\r\n]/.test(company) ||
    !name ||
    name.length > 120 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 200 ||
    phone.length > 30 ||
    (phone && !/^\+?[\d\s().-]{8,30}$/.test(phone)) ||
    message.length > 2000 ||
    services.length > 1000 ||
    !['customer', 'partner'].includes(type)
  ) {
    return NextResponse.json(
      {
        error: 'Kontroller at navn, bedrift og e-post er riktig utfylt.'
      },
      { status: 400 }
    );
  }

  if (!smtpConfigured()) {
    return NextResponse.json(
      {
        error:
          `Vi kunne ikke sende forespørselen. ` +
          `Referanse: SMTP_CONFIG. ` +
          `Send gjerne e-post til ${contact.email}.`
      },
      { status: 503 }
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);

  if (![587, 465].includes(port)) {
    console.error('SMTP_FEIL', {
      reference: 'SMTP_PORT',
      message: 'SMTP_PORT må være 587 eller 465.'
    });

    return NextResponse.json(
      {
        error:
          `Vi kunne ikke sende forespørselen. ` +
          `Referanse: SMTP_PORT. ` +
          `Send gjerne e-post til ${contact.email}.`
      },
      { status: 503 }
    );
  }

  const now = Date.now();

  for (const [key, value] of attempts) {
    if (value.until < now) {
      attempts.delete(key);
    }
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';

  const rate = attempts.get(ip);

  if (rate && rate.count >= 5) {
    return NextResponse.json(
      {
        error:
          'Du har sendt flere forespørsler. Vent litt før du prøver igjen.'
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(
            Math.max(1, Math.ceil((rate.until - now) / 1000))
          )
        }
      }
    );
  }

  if (attempts.size > 1000) {
    const oldest = attempts.keys().next().value;

    if (oldest !== undefined) {
      attempts.delete(oldest);
    }
  }

  attempts.set(ip, {
    count: (rate?.count || 0) + 1,
    until: rate?.until || now + 3600000
  });

  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  const escaped = (value: string) =>
    value.replace(/[&<>"']/g, character => replacements[character]);

  const rows: Record<string, string> = {
    Type:
      type === 'partner'
        ? 'Partnerforespørsel'
        : 'Gratis avtalegjennomgang',
    Bedrift: company,
    Kontaktperson: name,
    'E-post': email,
    Telefon: phone,
    Avtaleområder: services,
    Melding: message
  };

  try {
    await sendContactMail({
      replyTo: email,

      subject:
        `${type === 'partner' ? 'Partnerforespørsel' : 'Avtalegjennomgang'}: ` +
        company,

      text: Object.entries(rows)
        .map(([label, value]) => `${label}: ${value}`)
        .join('\n\n'),

      html: `
        <h2>Ny henvendelse fra Bedriftsavtale.no</h2>
        <table>
          ${Object.entries(rows)
            .map(
              ([label, value]) => `
                <tr>
                  <th style="text-align:left;padding:8px">
                    ${escaped(label)}
                  </th>
                  <td style="padding:8px;white-space:pre-wrap">
                    ${escaped(value)}
                  </td>
                </tr>
              `
            )
            .join('')}
        </table>
      `
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const smtpError = error as {
      name?: string;
      message?: string;
      code?: string;
      responseCode?: number;
      command?: string;
    };

    const code = smtpError?.code || '';
    const responseCode = smtpError?.responseCode;

    let reference = 'SMTP_ERROR';

    if (code === 'EAUTH' || responseCode === 535) {
      reference = 'SMTP_AUTH';
    } else if (
      [
        'ETIMEDOUT',
        'ECONNECTION',
        'ECONNREFUSED',
        'ECONNRESET',
        'ESOCKET'
      ].includes(code)
    ) {
      reference = 'SMTP_CONNECTION';
    } else if (['ENOTFOUND', 'EDNS', 'EAI_AGAIN'].includes(code)) {
      reference = 'SMTP_DNS';
    } else if (
      [
        'ETLS',
        'CERT_HAS_EXPIRED',
        'DEPTH_ZERO_SELF_SIGNED_CERT',
        'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
        'ERR_TLS_CERT_ALTNAME_INVALID'
      ].includes(code)
    ) {
      reference = 'SMTP_TLS';
    } else if (
      ['EENVELOPE', 'EMESSAGE'].includes(code) ||
      (responseCode !== undefined && responseCode >= 500)
    ) {
      reference = 'SMTP_REJECTED';
    }

    // Logg bare utvalgte feildetaljer, ikke hele feilobjektet.
    const password = process.env.SMTP_PASSWORD || '';
    const description = String(
      smtpError?.message || 'Ukjent feil ved e-postsending.'
    );

    const safeDescription = password
      ? description.split(password).join('[SKJULT]')
      : description;

    console.error('SMTP_FEIL', {
      reference,
      code,
      responseCode,
      command: smtpError?.command,
      message: safeDescription.slice(0, 600)
    });

    return NextResponse.json(
      {
        error:
          `Forespørselen kunne ikke sendes. ` +
          `Referanse: ${reference}. ` +
          `Send gjerne e-post til ${contact.email}.`
      },
      { status: 502 }
    );
  }
}
