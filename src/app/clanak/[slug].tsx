import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { categoryName } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Badge, formatDate } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data: article, loading } = useAsync(() => api.getArticle(slug), [slug]);

  return (
    <Screen loading={loading}>
      <Stack.Screen options={{ title: '' }} />
      {article ? (
        <>
          <View style={styles.head}>
            <Badge label={categoryName(article.categorySlug)} />
            <ThemedText style={styles.title}>{article.title}</ThemedText>
            <ThemedText type="small" themeColor="textMuted">
              {article.readingMinutes} min čitanja · Ažurirano {formatDate(article.updatedAt)}
            </ThemedText>
          </View>
          {article.body.map((s, i) => (
            <View key={i} style={styles.block}>
              {s.heading ? <ThemedText style={styles.heading}>{s.heading}</ThemedText> : null}
              <ThemedText themeColor="textBody" style={styles.text}>
                {s.text}
              </ThemedText>
            </View>
          ))}
        </>
      ) : !loading ? (
        <ThemedText>Članak nije pronađen.</ThemedText>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: Spacing.two },
  title: { fontSize: 26, lineHeight: 32, fontWeight: 700 },
  block: { gap: Spacing.two },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: 700 },
  text: { fontSize: 16, lineHeight: 26, fontWeight: 400 },
});
