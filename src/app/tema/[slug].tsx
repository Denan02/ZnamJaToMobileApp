import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ArticleCard, categoryName } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function TopicScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading } = useAsync(async () => {
    const [topic, articles] = await Promise.all([
      api.getTopic(slug),
      api.getArticles({ topicSlug: slug }),
    ]);
    return { topic, articles };
  }, [slug]);

  return (
    <Screen loading={loading}>
      <Stack.Screen options={{ title: '' }} />
      {data?.topic ? (
        <>
          <View style={styles.head}>
            <Badge label={categoryName(data.topic.categorySlug)} />
            <ThemedText style={styles.title}>{data.topic.title}</ThemedText>
            <ThemedText themeColor="textSecondary">{data.topic.description}</ThemedText>
          </View>
          <View style={styles.list}>
            {data.articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </View>
        </>
      ) : !loading ? (
        <ThemedText>Tema nije pronađena.</ThemedText>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: Spacing.two },
  title: { fontSize: 26, lineHeight: 32, fontWeight: 700 },
  list: { gap: Spacing.two },
});
