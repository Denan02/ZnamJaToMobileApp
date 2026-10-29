import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Icon } from './icon';
import { ThemedText } from './themed-text';

export function SectionHeader({ title, href, action }: { title: string; href?: Href; action?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {href ? (
        <Link href={href}>
          <ThemedText type="small" style={{ color: theme.primary }}>
            {action ?? 'Sve'}
          </ThemedText>
        </Link>
      ) : null}
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        style,
      ]}>
      {children}
    </View>
  );
}

/** Kartica koja vodi na drugi ekran. */
export function LinkCard({ href, children }: { href: Href; children: React.ReactNode }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Card>{children}</Card>
      </Pressable>
    </Link>
  );
}

export function Badge({
  label,
  tone = 'primary',
}: {
  label: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger';
}) {
  const theme = useTheme();
  const bg: Record<string, string> = {
    primary: theme.primarySoft,
    success: theme.successSoft,
    warning: theme.warningSoft,
    danger: theme.dangerSoft,
  };
  const fg: Record<string, string> = {
    primary: theme.primary,
    success: theme.success,
    warning: theme.warning,
    danger: theme.danger,
  };
  return (
    <View style={[styles.badge, { backgroundColor: bg[tone] }]}>
      <ThemedText type="smallBold" style={{ color: fg[tone], fontSize: 12, lineHeight: 16 }}>
        {label}
      </ThemedText>
    </View>
  );
}

export function IconBubble({ name, color }: { name: string; color?: ThemeColor }) {
  const theme = useTheme();
  return (
    <View style={[styles.bubble, { backgroundColor: theme.primarySoft }]}>
      <Icon name={name} color={theme[color ?? 'primary']} />
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.primary : theme.backgroundElement,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}>
      <ThemedText
        type="small"
        style={{ color: selected ? theme.onPrimary : theme.textBody }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function ChipRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
      {options.map((o) => (
        <Chip key={o.value} label={o.label} selected={o.value === value} onPress={() => onChange(o.value)} />
      ))}
    </ScrollView>
  );
}

export function SearchField({ placeholder, href }: { placeholder: string; href: Href }) {
  const theme = useTheme();
  return (
    <Link href={href} asChild>
      <Pressable
        style={StyleSheet.flatten([
          styles.search,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        ])}>
        <Icon name="search" color={theme.textMuted} />
        <ThemedText themeColor="textMuted">{placeholder}</ThemedText>
      </Pressable>
    </Link>
  );
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${Number(d)}. ${Number(m)}. ${y}.`;
}

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  sectionTitle: { fontSize: 20, lineHeight: 26, fontWeight: 700 },
  card: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: { gap: Spacing.two },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
