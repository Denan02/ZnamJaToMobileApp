import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ArticleCard, categoryName } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading } = useAsync(() => api.getArticles({ categorySlug: slug }), [slug]);

  return (
    <Screen loading={loading}>
      <Stack.Screen options={{ title: categoryName(slug) }} />
      <View style={styles.list}>
        {data?.map((a) => <ArticleCard key={a.slug} article={a} />)}
        {data?.length === 0 ? (
          <ThemedText themeColor="textSecondary">Nema članaka u ovoj oblasti.</ThemedText>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ list: { gap: Spacing.two } });
