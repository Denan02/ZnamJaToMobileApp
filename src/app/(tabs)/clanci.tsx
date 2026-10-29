import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArticleCard } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ChipRow, SearchField } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function ArticlesScreen() {
  const [category, setCategory] = useState('sve');
  const { data, loading } = useAsync(async () => {
    const [articles, categories] = await Promise.all([api.getArticles(), api.getCategories()]);
    return { articles, categories };
  });

  const options = useMemo(
    () => [
      { value: 'sve', label: 'Sve' },
      ...(data?.categories.map((c) => ({ value: c.slug, label: c.name })) ?? []),
    ],
    [data],
  );
  const visible = data?.articles.filter((a) => category === 'sve' || a.categorySlug === category);

  return (
    <Screen inTabs title="Članci" subtitle="Odgovori, postupci i objašnjenja" loading={loading || !data}>
      <SearchField placeholder="Pretraži članke" href="/pretraga" />
      <ChipRow options={options} value={category} onChange={setCategory} />
      <View style={styles.list}>
        {visible?.map((a) => <ArticleCard key={a.slug} article={a} />)}
        {visible?.length === 0 ? (
          <ThemedText themeColor="textSecondary">Nema članaka u ovoj oblasti.</ThemedText>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ list: { gap: Spacing.two } });
