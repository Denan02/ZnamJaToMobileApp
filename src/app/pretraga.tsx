import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArticleCard, TopicCard } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { articles, topics } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

// Privremeno lokalno filtriranje mocka; kasnije pozvati API pretrage.
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');

export default function SearchScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const q = normalize(query.trim());

  const foundArticles = q ? articles.filter((a) => normalize(a.title + a.excerpt).includes(q)) : [];
  const foundTopics = q ? topics.filter((t) => normalize(t.title + t.description).includes(q)) : [];

  return (
    <Screen>
      <TextInput
        autoFocus
        value={query}
        onChangeText={setQuery}
        placeholder="Pretražite pitanje, postupak ili situaciju"
        placeholderTextColor={theme.textMuted}
        returnKeyType="search"
        style={[
          styles.input,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border, color: theme.text },
        ]}
      />
      {!q ? (
        <ThemedText themeColor="textSecondary">Unesite pojam, npr. „penzija“ ili „pasoš“.</ThemedText>
      ) : null}
      {q && !foundArticles.length && !foundTopics.length ? (
        <ThemedText themeColor="textSecondary">Nema rezultata za „{query}“.</ThemedText>
      ) : null}
      {foundTopics.length ? (
        <View style={styles.list}>
          <ThemedText type="smallBold">Teme</ThemedText>
          {foundTopics.map((t) => (
            <TopicCard key={t.slug} topic={t} />
          ))}
        </View>
      ) : null}
      {foundArticles.length ? (
        <View style={styles.list}>
          <ThemedText type="smallBold">Članci</ThemedText>
          {foundArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
  },
  list: { gap: Spacing.two },
});
