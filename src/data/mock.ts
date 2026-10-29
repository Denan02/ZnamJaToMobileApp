// Privremeni mock podaci prema znamjato.com. Zamijeniti pozivima API-ja u src/services/api.ts.
import type {
  Article,
  Category,
  ServicesSnapshot,
  SiteStats,
  Tool,
  Topic,
} from './types';

export const stats: SiteStats = { articles: 497, topics: 49, tools: 14 };

export const categories: Category[] = [
  { slug: 'zakon', name: 'Zakon', articleCount: 143, icon: 'scale' },
  { slug: 'finansije', name: 'Finansije', articleCount: 53, icon: 'banknote' },
  { slug: 'posao', name: 'Posao', articleCount: 28, icon: 'briefcase' },
  { slug: 'zdravlje', name: 'Zdravlje', articleCount: 31, icon: 'heart' },
  { slug: 'porodica', name: 'Porodica', articleCount: 27, icon: 'people' },
  { slug: 'auto', name: 'Auto i transport', articleCount: 14, icon: 'car' },
  { slug: 'dom', name: 'Dom i stanovanje', articleCount: 19, icon: 'house' },
  { slug: 'kupovina', name: 'Kupovina', articleCount: 12, icon: 'cart' },
  { slug: 'obrazovanje', name: 'Obrazovanje', articleCount: 9, icon: 'book' },
  { slug: 'putovanja', name: 'Putovanja', articleCount: 8, icon: 'airplane' },
  { slug: 'tehnologija', name: 'Tehnologija', articleCount: 6, icon: 'laptop' },
  { slug: 'ljepota', name: 'Ljepota', articleCount: 4, icon: 'sparkles' },
];

export const topics: Topic[] = [
  {
    slug: 'porodiljsko-i-prava-roditelja-u-bih',
    title: 'Porodiljsko i prava roditelja u BiH',
    description:
      'Porodiljsko odsustvo i naknade po entitetima i kantonima, zaštita trudnice na poslu, dječiji dodatak i prava oca.',
    categorySlug: 'zakon',
    articleCount: 11,
  },
  {
    slug: 'penzija-u-bih',
    title: 'Penzija u BiH',
    description:
      'Uslovi za starosnu, prijevremenu, invalidsku i porodičnu penziju, provjera staža, staž iz inostranstva i rad u penziji.',
    categorySlug: 'zakon',
    articleCount: 11,
  },
  {
    slug: 'ugovor-o-dozivotnom-izdrzavanju-poklon-i-prenos-imovine-za-zivota',
    title: 'Ugovor o doživotnom izdržavanju, poklon i prenos imovine',
    description:
      'Najvažniji načini prenosa imovine za života: poklon, doživotno izdržavanje, troškovi i rizici.',
    categorySlug: 'zakon',
    articleCount: 6,
  },
  {
    slug: 'kupovina-polovnog-auta-u-bih',
    title: 'Kupovina polovnog auta u BiH',
    description:
      'Provjera oglasa, prodavca, papira, broja šasije, ugovora, kapare i prenosa vlasništva.',
    categorySlug: 'auto',
    articleCount: 14,
  },
  {
    slug: 'samostalni-rad-prvi-biznis-bih',
    title: 'Samostalni rad i prvi biznis u BiH',
    description:
      'Registracija, porezi, doprinosi i osnovni administrativni koraci za pokretanje samostalnog rada.',
    categorySlug: 'posao',
    articleCount: 13,
  },
];

const lorem = [
  {
    heading: 'Ukratko',
    text: 'Ovo je privremeni sadržaj članka koji služi samo za prikaz izgleda ekrana. Pravi tekst će se učitavati sa API-ja kada bude spreman.',
  },
  {
    heading: 'Ko ima pravo',
    text: 'Pravo zavisi od entiteta, kantona i vaše konkretne situacije. Provjerite uslove kod nadležne institucije prije podnošenja zahtjeva.',
  },
  {
    heading: 'Potrebni dokumenti',
    text: 'Najčešće su potrebni lična karta, uvjerenje o prebivalištu i obrazac zahtjeva. Rokovi i cijene se razlikuju od općine do općine.',
  },
  {
    heading: 'Česta pitanja',
    text: 'Ako vam je zahtjev odbijen, imate pravo žalbe u zakonskom roku. Sačuvajte kopije svih dokumenata koje predajete.',
  },
];

export const articles: Article[] = [
  {
    slug: 'rad-u-penziji-obustava-penzije-fbih-rs',
    title: 'Rad u penziji - smije li penzioner raditi i šta se tada dešava s penzijom',
    excerpt: 'Kada rad u penziji dovodi do obustave penzije u FBiH i RS i kako to izbjeći.',
    categorySlug: 'zakon',
    topicSlug: 'penzija-u-bih',
    readingMinutes: 17,
    updatedAt: '2026-08-27',
    body: lorem,
  },
  {
    slug: 'porodiljsko-odsustvo-za-oca-fbih-rs',
    title: 'Prava oca - porodiljsko odsustvo za očeve i kada ga otac može koristiti',
    excerpt: 'Uslovi, trajanje i naknada za očinsko odsustvo u FBiH i RS.',
    categorySlug: 'porodica',
    topicSlug: 'porodiljsko-i-prava-roditelja-u-bih',
    readingMinutes: 19,
    updatedAt: '2026-08-27',
    body: lorem,
  },
  {
    slug: 'poslodavac-nije-uplacivao-doprinose',
    title: 'Poslodavac nije uplaćivao doprinose - šta možete uraditi i koji rokovi važe',
    excerpt: 'Kako provjeriti staž, kome se obratiti i kako zaštititi svoja prava.',
    categorySlug: 'zakon',
    readingMinutes: 21,
    updatedAt: '2026-08-27',
    body: lorem,
  },
  {
    slug: 'sabiranje-staza-iz-inostranstva-penzija',
    title: 'Staž iz Njemačke, Austrije, Slovenije ili Hrvatske - kako se sabira staž iz inostranstva',
    excerpt: 'Međunarodni sporazumi o socijalnom osiguranju i postupak priznavanja staža.',
    categorySlug: 'zakon',
    topicSlug: 'penzija-u-bih',
    readingMinutes: 19,
    updatedAt: '2026-08-27',
    body: lorem,
  },
  {
    slug: 'kako-produziti-vozacku-dozvolu-u-bih-dokumenti-ljekarsko-uvjerenje-i-rokovi',
    title: 'Kako produžiti vozačku dozvolu u BiH - dokumenti, ljekarsko uvjerenje i rokovi',
    excerpt: 'Korak po korak: šta nositi, gdje se ide i koliko košta.',
    categorySlug: 'zakon',
    readingMinutes: 12,
    updatedAt: '2026-07-14',
    body: lorem,
  },
  {
    slug: 'uvjerenje-o-drzavljanstvu-bih-gdje-i-kako-se-vadi-i-sta-raditi-ako-niste-upisani',
    title: 'Uvjerenje o državljanstvu BiH: gdje i kako se vadi i šta raditi ako niste upisani',
    excerpt: 'Čemu služi uvjerenje i kako postupiti ako niste u evidenciji.',
    categorySlug: 'zakon',
    readingMinutes: 18,
    updatedAt: '2026-07-02',
    body: lorem,
  },
  {
    slug: 'kako-izvaditi-pasos-u-bih-potrebni-dokumenti-cijena-i-rokovi',
    title: 'Kako izvaditi pasoš u BiH - potrebni dokumenti, cijena i rokovi',
    excerpt: 'Sve o izdavanju biometrijskog pasoša, od prijave do preuzimanja.',
    categorySlug: 'zakon',
    readingMinutes: 13,
    updatedAt: '2026-06-20',
    body: lorem,
  },
  {
    slug: 'kako-ocitati-vodomjer-sta-znace-brojevi-i-kako-pratiti-potrosnju-vode',
    title: 'Kako očitati vodomjer - šta znače brojevi i kako pratiti potrošnju vode',
    excerpt: 'Crne i crvene cifre, mjesečna potrošnja i otkrivanje curenja.',
    categorySlug: 'dom',
    readingMinutes: 32,
    updatedAt: '2026-06-11',
    body: lorem,
  },
  {
    slug: 'komisija-za-bolovanje-kada-se-ide-i-sta-se-provjerava',
    title: 'Komisija za bolovanje - kada se ide i šta se tada provjerava',
    excerpt: 'Kako izgleda kontrola bolovanja i kakva su vaša prava.',
    categorySlug: 'posao',
    readingMinutes: 33,
    updatedAt: '2026-05-30',
    body: lorem,
  },
  {
    slug: 'povratak-na-posao-nakon-porodiljskog',
    title: 'Povratak na posao nakon porodiljskog - skraćeno radno vrijeme, dojenje i godišnji odmor',
    excerpt: 'Prava majke nakon isteka porodiljskog odsustva.',
    categorySlug: 'porodica',
    topicSlug: 'porodiljsko-i-prava-roditelja-u-bih',
    readingMinutes: 21,
    updatedAt: '2026-05-12',
    body: lorem,
  },
  {
    slug: 'djeciji-dodatak-fbih-rs-cenzus-zahtjev',
    title: 'Dječiji dodatak u FBiH i RS - ko ima pravo, cenzus i kako se prijaviti',
    excerpt: 'Cenzus prihoda, potrebna dokumentacija i rokovi za prijavu.',
    categorySlug: 'porodica',
    topicSlug: 'porodiljsko-i-prava-roditelja-u-bih',
    readingMinutes: 20,
    updatedAt: '2026-05-12',
    body: lorem,
  },
  {
    slug: 'prava-trudnice-na-poslu-otkaz-nocni-rad',
    title: 'Prava trudnice na poslu - otkaz, prekovremeni, noćni rad i premještaj',
    excerpt: 'Zaštita trudnice od otkaza i obaveze poslodavca.',
    categorySlug: 'porodica',
    topicSlug: 'porodiljsko-i-prava-roditelja-u-bih',
    readingMinutes: 19,
    updatedAt: '2026-05-12',
    body: lorem,
  },
];

/** Redoslijed slugova za "Najčitaniji". */
export const mostReadSlugs = [
  'kako-produziti-vozacku-dozvolu-u-bih-dokumenti-ljekarsko-uvjerenje-i-rokovi',
  'uvjerenje-o-drzavljanstvu-bih-gdje-i-kako-se-vadi-i-sta-raditi-ako-niste-upisani',
  'kako-izvaditi-pasos-u-bih-potrebni-dokumenti-cijena-i-rokovi',
  'kako-ocitati-vodomjer-sta-znace-brojevi-i-kako-pratiti-potrosnju-vode',
  'komisija-za-bolovanje-kada-se-ide-i-sta-se-provjerava',
];

export const tools: Tool[] = [
  {
    slug: 'kalkulator-neto-u-bruto-plate-fbih',
    title: 'Kalkulator neto u bruto plate (FBiH)',
    description: 'Izračunajte bruto platu, doprinose i porez na osnovu neto iznosa.',
    icon: 'calculator',
  },
  {
    slug: 'kalkulator-racuna-za-struju-bih',
    title: 'Kalkulator računa za struju',
    description: 'Procijenite mjesečni račun na osnovu potrošnje u kWh.',
    icon: 'bolt',
  },
  {
    slug: 'kalkulator-registracije-vozila-bih',
    title: 'Kalkulator registracije vozila',
    description: 'Okvirni troškovi registracije prema vrsti i snazi vozila.',
    icon: 'car',
  },
  {
    slug: 'kalkulator-troskova-grijanja-domacinstva-bih',
    title: 'Kalkulator troškova grijanja',
    description: 'Uporedite troškove grijanja za različite energente.',
    icon: 'flame',
  },
];

export const services: ServicesSnapshot = {
  lastChecked: '2026-10-29T10:00:00',
  outages: [
    {
      id: 'o1',
      title: 'Planirano isključenje - Novo Sarajevo',
      provider: 'Elektroprivreda BiH',
      location: 'Novo Sarajevo',
      status: 'Najavljeno',
    },
    {
      id: 'o2',
      title: 'Planirano isključenje - Visoko',
      provider: 'Elektroprivreda BiH',
      location: 'Visoko',
      status: 'Najavljeno',
    },
  ],
  borders: [
    { id: 'b1', name: 'Izačić', country: 'Hrvatska', waitMinutes: 0, severity: 'ok' },
    { id: 'b2', name: 'Gradiška', country: 'Hrvatska', waitMinutes: 0, severity: 'ok' },
    { id: 'b3', name: 'Rača', country: 'Srbija', waitMinutes: 45, severity: 'warning' },
    { id: 'b4', name: 'Zvornik', country: 'Srbija', waitMinutes: 0, severity: 'ok' },
    { id: 'b5', name: 'Hum', country: 'Crna Gora', waitMinutes: 0, severity: 'ok' },
  ],
  roads: [
    {
      id: 'r1',
      road: 'M-18',
      title: 'Odron - Brod na Drini-GP Hum/Šćepan Polje',
      severity: 'critical',
    },
    { id: 'r2', road: 'M-17', title: 'Radovi - Lepenica-Kreševo', severity: 'warning' },
  ],
  radars: [
    {
      id: 'x1',
      place: 'Potočari-Dubravice',
      area: 'Brčko Distrikt',
      time: '10:00–12:00',
      active: true,
    },
    { id: 'x2', place: 'Polje (kod groblja)', area: 'Busovača', time: '10:00–11:30', active: true },
    { id: 'x3', place: 'Ilidža', area: 'Kanton Sarajevo', time: '14:00–16:00', active: false },
  ],
};
