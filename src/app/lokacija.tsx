import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SectionList, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { locations, type Location } from '@/data/locations';
import { useTheme } from '@/hooks/use-theme';
import { usePreferences } from '@/store/preferences';

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

export default function LocationScreen() {
  const theme = useTheme();
  const { location, setLocation } = usePreferences();
  const [query, setQuery] = useState('');
  const q = normalize(query.trim());

  const sections = Object.entries(
    Object.groupBy(
      locations.filter((l) => !q || normalize(l.name + l.region).includes(q)),
      (l) => l.region,
    ),
  ).map(([title, data]) => ({ title, data: data as Location[] }));

  return (
    <View style={[styles.flex, { backgroundColor: theme.background }]}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Pretražite općinu ili grad"
        placeholderTextColor={theme.textMuted}
        style={[
          styles.input,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border, color: theme.text },
        ]}
      />
      <SectionList
        sections={sections}
        keyExtractor={(l) => l.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        renderSectionHeader={({ section }) => (
          <ThemedText type="smallBold" themeColor="textSecondary" style={{ paddingTop: Spacing.three }}>
            {section.title}
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setLocation(item);
              router.back();
            }}
            style={[styles.item, { borderColor: theme.border }]}>
            <ThemedText style={styles.flex}>{item.name}</ThemedText>
            {location?.id === item.id ? <Icon name="check" color={theme.primary} /> : null}
          </Pressable>
        )}
        ListEmptyComponent={<ThemedText themeColor="textSecondary">Nema rezultata.</ThemedText>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  input: {
    margin: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
  },
  list: { paddingHorizontal: Spacing.three, paddingBottom: Spacing.five },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
