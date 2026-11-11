# Bedriftsavtale.no

En komplett Next.js-nettside basert på den godkjente grønne mockupen. Skoggrønn, mintgrønne knapper, store bilder og tydelig fokus på bedriftskunden.

## Last opp i GitHub og publiser på Vercel

1. Pakk ut ZIP-filen. Opprett et GitHub-repository og last opp **innholdet** i prosjektmappen. `package.json`, `app`, `components`, `lib` og `public` skal ligge i roten.
2. Importer repositoryet i Vercel. Velg **Next.js** som framework. Root Directory er prosjektroten. Standard build er `npm run build`. Ikke sett Output Directory manuelt.
3. Sett miljøvariablene fra `.env.example` i Vercel. `RESEND_API_KEY`, `CONTACT_TO_EMAIL` og `CONTACT_FROM_EMAIL` er nødvendige for e-post. Avsenderdomenet må være verifisert hos Resend. Publiser på nytt etter endring av variabler.
4. Koble bedriftsavtale.no til prosjektet under Domains i Vercel og legg inn DNS-verdiene som Vercel viser.
5. Test en ekte henvendelse og bekreft at e-posten kommer frem før markedsføring starter.

Nettsiden er ikke lastet opp til ditt GitHub-repository eller publisert i din Vercel-konto av denne leveransen.

## Lokal kjøring

Node.js 22 LTS eller nyere kompatibel LTS. Kjør `npm ci`, deretter `npm run dev`. Lokal adresse vises i terminalen. Produksjon: `npm run build` og `npm start`.

## Dette er med

- Responsiv forside som følger det godkjente designet, med fire nye illustrasjonsbilder i optimalisert WebP.
- Egen side for alle åtte avtaleområdene, oversiktsside, prosess, om oss, kontakt og diskret partnerside.
- Interaktiv eksempelrapport. Standardvalgene summerer til 2 000 kr per måned og 24 000 kr per år. Programvare beholdes fordi det tenkte alternativet ikke dekker behovet.
- Kontaktskjema med validering, feilvisning, honeypot og serverrute for Resend. Ingen falsk bekreftelse når sending ikke er konfigurert.
- Lokal skrifttype, ingen annonsepiksler, ingen analyseintegrasjon, ingen samtykkebanner som ikke trengs av denne leveransen.
- Sidetitler, beskrivelser, canonical-lenker, Open Graph-bilde, sitemap.xml, robots.txt og strukturerte data for organisasjon, tjenester og synlig FAQ.
- Tastaturnavigasjon, synlige fokusmarkeringer, mobilmeny, redusert bevegelse og utskriftsvennlig eksempelrapport.

## Må avklares før en offentlig lansering

Design og kode er ferdige. Disse virksomhetsopplysningene var ikke levert og skal fylles inn med faktiske opplysninger:

- Juridisk firma, organisasjonsnummer og personvernkontakt i miljøvariabler.
- Virksomhetens faktiske personvernrutiner, behandlingsgrunnlag, databehandlere, overføringer og lagringstid. `app/personvern/page.tsx` er tydelig merket som utkast frem til disse er avklart. Miljøvariabler alene ferdigstiller ikke teksten.
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
