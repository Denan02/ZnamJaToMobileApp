// Privremena lista lokacija (entitet > kanton/regija > općina/grad). Zamijeniti podacima s API-ja.
export type Location = {
  id: string;
  name: string;
  /** Kanton, regija ili entitet kojem lokacija pripada. */
  region: string;
  entity: 'FBiH' | 'Republika Srpska' | 'Brčko Distrikt';
};

const loc = (
  entity: Location['entity'],
  region: string,
  names: string[],
): Location[] =>
  names.map((name) => ({ id: `${region}-${name}`.toLowerCase().replace(/\s+/g, '-'), name, region, entity }));

export const locations: Location[] = [
  ...loc('FBiH', 'Kanton Sarajevo', [
    'Sarajevo - Centar', 'Sarajevo - Novo Sarajevo', 'Sarajevo - Novi Grad', 'Sarajevo - Stari Grad',
    'Ilidža', 'Vogošća', 'Hadžići', 'Ilijaš', 'Trnovo (FBiH)',
  ]),
  ...loc('FBiH', 'Zenicko-dobojski kanton', ['Zenica', 'Visoko', 'Kakanj', 'Maglaj', 'Zavidovići', 'Žepče']),
  ...loc('FBiH', 'Tuzlanski kanton', ['Tuzla', 'Lukavac', 'Gradačac', 'Živinice', 'Srebrenik']),
  ...loc('FBiH', 'Unsko-sanski kanton', ['Bihać', 'Cazin', 'Velika Kladuša', 'Sanski Most']),
  ...loc('FBiH', 'Srednjobosanski kanton', ['Travnik', 'Bugojno', 'Busovača', 'Jajce', 'Kreševo']),
  ...loc('FBiH', 'Hercegovačko-neretvanski kanton', ['Mostar', 'Konjic', 'Jablanica', 'Čapljina']),
  ...loc('FBiH', 'Posavski kanton', ['Orašje', 'Odžak']),
  ...loc('FBiH', 'Bosansko-podrinjski kanton', ['Goražde']),
  ...loc('FBiH', 'Zapadnohercegovački kanton', ['Široki Brijeg', 'Ljubuški']),
  ...loc('FBiH', 'Kanton 10', ['Livno', 'Tomislavgrad']),
  ...loc('Republika Srpska', 'Republika Srpska', [
    'Banja Luka', 'Bijeljina', 'Doboj', 'Prijedor', 'Trebinje', 'Istočno Sarajevo',
    'Zvornik', 'Brod', 'Gradiška', 'Foča',
  ]),
  ...loc('Brčko Distrikt', 'Brčko Distrikt', ['Brčko']),
];
