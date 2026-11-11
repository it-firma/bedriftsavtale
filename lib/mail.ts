import nodemailer from 'nodemailer';
import { contact } from './contact';

export function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_USER?.trim() &&
    process.env.SMTP_PASSWORD
  );
}

export async function sendContactMail(message: {
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const host =
    process.env.SMTP_HOST?.trim() || 'smtp.domeneshop.no';

  const port = Number(process.env.SMTP_PORT || 587);

  if (![587, 465].includes(port)) {
    throw new Error('SMTP_PORT må være 587 eller 465.');
  }

  if (!smtpConfigured()) {
    throw new Error('SMTP-brukernavn eller passord mangler.');
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,

    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: process.env.SMTP_PASSWORD!
    },

    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,

    disableFileAccess: true,
    disableUrlAccess: true
  });

  try {
    const result = await transport.sendMail({
      from: {
        name: 'Bedriftsavtale.no',
        address: contact.email
      },
      to: contact.email,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text
    });

    const accepted = result.accepted?.some(
      address =>
        String(address).toLowerCase() ===
        contact.email.toLowerCase()
    );

    if (!accepted) {
      throw new Error('E-postserveren aksepterte ikke mottakeren.');
    }
  } finally {
    transport.close();
  }
}
