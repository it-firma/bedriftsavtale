# Bedriftsavtale.no

En komplett Next.js-nettside basert på den godkjente grønne mockupen. Skoggrønn, mintgrønne knapper, store bilder og tydelig fokus på bedriftskunden.

## Last opp i GitHub og publiser på Vercel

1. Pakk ut ZIP-filen. Opprett et GitHub-repository og last opp **innholdet** i prosjektmappen. `package.json`, `app`, `components`, `lib` og `public` skal ligge i roten.
2. Importer repositoryet i Vercel. Velg **Next.js** som framework. Root Directory er prosjektroten. Standard build er `npm run build`. Ikke sett Output Directory manuelt.
3. Legg inn `SMTP_USER` og `SMTP_PASSWORD` i Vercel, med e-postkontoens innlogging hos Domeneshop. Kontroller `SMTP_HOST` mot serverinnstillingene for kontoen. Standard er `smtp.domeneshop.no`, port 587 med påkrevd STARTTLS. Publiser på nytt etter endring av variabler.
4. Koble bedriftsavtale.no til prosjektet under Domains i Vercel og legg inn DNS-verdiene som Vercel viser.
5. Test en ekte henvendelse og bekreft at e-posten kommer frem før markedsføring starter.

Nettsiden er ikke lastet opp til ditt GitHub-repository eller publisert i din Vercel-konto av denne leveransen.

## Lokal kjøring

Node.js 22 LTS eller nyere kompatibel LTS. Kjør `npm ci`, deretter `npm run dev`. Lokal adresse vises i terminalen. Produksjon: `npm run build` og `npm start`.

## Dette er med

- Responsiv forside som følger det godkjente designet, med fire nye illustrasjonsbilder i optimalisert WebP.
- Egen side for alle åtte avtaleområdene, oversiktsside, prosess, om oss, kontakt og diskret partnerside.
- Interaktiv eksempelrapport. Standardvalgene summerer til 2 000 kr per måned og 24 000 kr per år. Programvare beholdes fordi det tenkte alternativet ikke dekker behovet.
- Kontaktskjema med validering, feilvisning, honeypot og serverrute for Domeneshop SMTP. Ingen falsk bekreftelse når sending ikke er konfigurert.
- Lokal skrifttype, ingen annonsepiksler, ingen analyseintegrasjon, ingen samtykkebanner som ikke trengs av denne leveransen.
- Sidetitler, beskrivelser, canonical-lenker, Open Graph-bilde, sitemap.xml, robots.txt og strukturerte data for organisasjon, tjenester og synlig FAQ.
- Tastaturnavigasjon, synlige fokusmarkeringer, mobilmeny, redusert bevegelse og utskriftsvennlig eksempelrapport.

## Må avklares før en offentlig lansering

Design og kode er ferdige. Eier er It-Firma AS, org.nr. 833 140 892. Felles e-post er hei@bedriftsavtale.no. Følgende gjenstår før drift:

- Domeneshop SMTP-innlogging i Vercel og korrekt SMTP-server. Mottaker, e-post og selskapsopplysninger ligger allerede i `lib/contact.ts`.
- Virksomhetens faktiske personvernrutiner, behandlingsgrunnlag, databehandlere, overføringer og lagringstid. Personverninformasjonen må gjenspeile den faktiske driften.
- Hvordan tjenesten får betalt, hvilke leverandører som sammenlignes og hvilke avtaler/fullmakter som brukes. FAQ lover å forklare dette, uten å finne på en provisjonsmodell.
- Rådgiverbildet og øvrige fotografier er genererte illustrasjoner. Ingen av personene presenteres med et oppdiktet navn eller kundehistorie. Bytt portrettet med et bilde av en faktisk rådgiver når det finnes.
- Alle beløp i eksempelrapporten er konstruerte regneeksempler, ikke reelle tilbud eller dokumenterte resultater. De er tydelig merket og må ikke brukes som kundecase.

Skjemaets frekvensbegrensning er lokal i den enkelte serverinstansen. Den er en enkel første barriere, ikke en global garantert begrensning. Bruk Vercels brannmur/botbeskyttelse eller en delt tjeneste hvis trafikk og misbruk tilsier det.

## Redigering

- Forsiden: `app/page.tsx`
- Farger, oppbygning og mobiltilpasning: `app/globals.css`
- Tjenestetekster og nettstedadresse: `lib/site.ts`
- Eksempelrapport og beregning: `components/ExampleReport.tsx`
- Kontaktskjema: `components/LeadForm.tsx`, e-postsending: `app/api/lead/route.ts`
- Bilder: `public/images/`
- Skrifttype: Manrope, lokalt levert. Lisens i `public/fonts/OFL-Manrope.txt`.

Søkesynlighet og omtale i svarmotorer avhenger også av publisering, dokumentert innhold, omdømme, innlenking og indeksering. Ingen plasseringer eller resultater garanteres av koden.

## Egne produktikoner

Åtte egne SVG-ikoner er integrert i forside og tjenestesider. Originalene ligger i `public/icons/`, oversikten i `design/produktikoner.svg`, og React-komponentene i `components/ProductIcons.tsx`. Rediger `scripts/generate-product-icons.mjs` og kjør det for å regenerere hele settet. Ikonene bruker `currentColor` og transparent bakgrunn.

## Tilpasning til mockup

Forsiden er justert mot den godkjente grønne referansen ved 1440 px bredde. Desktop bruker omtrent samme seksjonshøyder og linjeskift. De fire nye referansebaserte bildene er integrert som `*-v2.webp`. Mobil har eget bildeutsnitt og egen meny.

Bildene er generert på nytt med mockupen som referanse og er ikke identiske originalfotografier. Faktiske kildeoppløsninger: hovedbilde 1774 × 887, portrett 1254 × 1254, avtalegjennomgang 1402 × 1122, kafébilde 1942 × 809. Bildene er ikke kunstig oppskalert til 4K.

Et skjermbilde med mockupen til venstre og den faktiske nettsiden til høyre ligger i `design/sammenligning-mockup-nettside.png`.

## Oppdatert footer

Mørkegrønn footer med fire kolonner, alle åtte avtaleområder, lys logo og kundens godkjenning som trygghetsbudskap. Stilene ligger i `app/footer.css`. Kontaktopplysninger er tydelig merket som manglende. Vilkår er et utkast og må ferdigstilles før lansering.

## Visning uten plassholdere

Kundevendte lanseringsmerknader og tomme selskapsfelt er fjernet. Selskapsnavn, organisasjonsnummer og felles e-post hentes fra `lib/contact.ts`. Før reell lansering må SMTP-innlogging konfigureres, og personverninformasjon og tjenestevilkår kompletteres med faktisk grunnlag, databehandlere, lagring og godtgjørelse. Ingen funksjoner er aktivert av denne tekstoppryddingen.

## Felles innboks

Alle kunde- og partnerforespørsler sendes til hei@bedriftsavtale.no. En eventuell eldre CONTACT_TO_EMAIL-variabel brukes ikke, slik at ingen skjemaer sendes til en annen innboks. Kundens e-post settes som Reply-To. Koden setter ikke opp postkassen eller videresending av aliaser hos e-postleverandøren.


## E-post via Domeneshop

Resend er fjernet. Kunde- og partnerskjema bruker Nodemailer og sender gjennom Domeneshops SMTP-server. Avsender og mottaker er hei@bedriftsavtale.no. Kundens adresse er Reply-To, slik at Svar i innboksen svarer kunden. Sending avventes, og skjemaet bekrefter først etter at SMTP-serveren har akseptert mottakeren. Dette er ikke en garanti for levering helt frem til innboksen.

### Enkel oppskrift i Vercel

1. Last opp denne nye kodepakken til GitHub og la Vercel bygge den.
2. Åpne prosjektet i Vercel, deretter Settings > Environment Variables.
3. Legg inn SMTP_USER med e-postbrukernavnet hos Domeneshop. Det kan være et eget kontonavn, ikke nødvendigvis e-postadressen.
4. Legg inn SMTP_PASSWORD med passordet til e-postkontoen. Ikke bruk passordet til kontrollpanelet.
5. Legg inn SMTP_HOST med serveren vist for kontoen. Klassisk oppsett bruker smtp.domeneshop.no; enkelte andre kontoer viser mail1.no1.essentialhosting.net. Bruk informasjonen i ditt kundeområde.
6. SMTP_PORT kan utelates (standard 587). Hvis kontoen krever 465, sett SMTP_PORT=465. Kryptering og sertifikatkontroll er alltid aktivert.
7. Velg Production, og Preview hvis testpubliseringene også skal kunne sende. Trykk Save, så Deployments > siste publisering > Redeploy.
8. Send en kundehenvendelse og en partnerhenvendelse, kontroller innboksen og at Svar bruker kundens adresse. Se også søppelpost.

Ingen SMTP-passord er inkludert i leveransen. De skal bare lagres som servervariabler i Vercel. RESEND_API_KEY og CONTACT_FROM_EMAIL brukes ikke lenger og kan fjernes fra prosjektinnstillingene.
