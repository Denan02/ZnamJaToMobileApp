import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Card, ChipRow, SectionHeader } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { usePreferences, type ThemePreference } from '@/store/preferences';

const themes: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Sistemska' },
  { value: 'light', label: 'Svijetla' },
  { value: 'dark', label: 'Tamna' },
];

export default function SettingsScreen() {
  const theme = useTheme();
  const { theme: themePref, setTheme, location, setLocation } = usePreferences();

  return (
    <Screen inTabs title="Postavke" subtitle="Prilagodite aplikaciju sebi">
      <View style={styles.section}>
        <SectionHeader title="Tema" />
        <ChipRow options={themes} value={themePref} onChange={setTheme} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Mjesto stanovanja" />
        <Link href="/lokacija" asChild>
          <Pressable>
            <Card>
              <View style={styles.row}>
                <Icon name="border" color={theme.primary} />
                <View style={styles.flex}>
                  <ThemedText style={styles.bold}>{location?.name ?? 'Nije odabrano'}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {location ? `${location.region} · ${location.entity}` : 'Odaberite općinu ili grad'}
                  </ThemedText>
                </View>
                <Icon name="chevron" size={16} color={theme.textMuted} />
              </View>
            </Card>
          </Pressable>
        </Link>
        {location ? (
          <Pressable onPress={() => setLocation(null)}>
            <ThemedText type="small" style={{ color: theme.danger }}>
              Ukloni lokaciju
            </ThemedText>
          </Pressable>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.two },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  flex: { flex: 1 },
  bold: { fontWeight: 700 },
});
