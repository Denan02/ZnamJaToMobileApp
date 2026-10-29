import { SymbolView, type SymbolViewProps } from 'expo-symbols';

type SymbolName = SymbolViewProps['name'];

const symbols: Record<string, SymbolName> = {
  scale: { ios: 'scalemass', android: 'balance', web: 'balance' },
  banknote: { ios: 'banknote', android: 'payments', web: 'payments' },
  briefcase: { ios: 'briefcase', android: 'work', web: 'work' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
  people: { ios: 'person.2', android: 'group', web: 'group' },
  car: { ios: 'car', android: 'directions_car', web: 'directions_car' },
  house: { ios: 'house', android: 'home', web: 'home' },
  cart: { ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' },
  book: { ios: 'book', android: 'menu_book', web: 'menu_book' },
  airplane: { ios: 'airplane', android: 'flight', web: 'flight' },
  laptop: { ios: 'laptopcomputer', android: 'laptop', web: 'laptop' },
  sparkles: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  calculator: { ios: 'function', android: 'calculate', web: 'calculate' },
  bolt: { ios: 'bolt', android: 'bolt', web: 'bolt' },
  flame: { ios: 'flame', android: 'local_fire_department', web: 'local_fire_department' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  chevron: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  guide: { ios: 'doc.text', android: 'article', web: 'article' },
  services: { ios: 'antenna.radiowaves.left.and.right', android: 'sensors', web: 'sensors' },
  tools: { ios: 'wrench.and.screwdriver', android: 'build', web: 'build' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  plug: { ios: 'powerplug', android: 'power', web: 'power' },
  border: { ios: 'flag', android: 'flag', web: 'flag' },
  road: { ios: 'road.lanes', android: 'add_road', web: 'add_road' },
  radar: { ios: 'camera.viewfinder', android: 'speed', web: 'speed' },
};

export type IconName = keyof typeof symbols;

export function Icon({ name, size = 20, color }: { name: string; size?: number; color: string }) {
  return (
    <SymbolView
      name={symbols[name] ?? symbols.guide}
      size={size}
      tintColor={color}
    />
  );
}
