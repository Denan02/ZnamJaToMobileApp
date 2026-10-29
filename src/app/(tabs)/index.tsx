import { ScrollView, StyleSheet, View } from 'react-native';

import { ArticleCard, CategoryTile, TopicCard } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Badge, Card, LinkCard, SearchField, SectionHeader } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { useTheme } from '@/hooks/use-theme';
import { api } from '@/services/api';
import { usePreferences } from '@/store/preferences';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const theme = useTheme();
  const { location } = usePreferences();
  const { data, loading } = useAsync(async () => {
    const [stats, topics, recent, mostRead, categories, services] = await Promise.all([
      api.getStats(),
      api.getTopics(),
      api.getRecentArticles(),
      api.getMostReadArticles(),
      api.getCategories(),
      api.getServices(),
    ]);
    return { stats, topics, recent, mostRead, categories, services };
  });

  return (
    <Screen
      inTabs
      title="Znam Ja To"
      subtitle="Jasni odgovori za svakodnevne situacije u BiH"
      loading={loading || !data}>
      {data ? (
        <>
          <Link href="/lokacija">
            <ThemedText type="small" style={{ color: theme.primary }}>
              {location ? `Lokacija: ${location.name}` : 'Odaberite svoje mjesto stanovanja'}
            </ThemedText>
          </Link>

          <SearchField placeholder="Pretražite pitanje, postupak ili situaciju" href="/pretraga" />

          <View style={styles.stats}>
            {[
              [data.stats.articles, 'Članci'],
              [data.stats.topics, 'Teme'],
              [data.stats.tools, 'Alati'],
            ].map(([n, label]) => (
              <Card key={label} style={styles.stat}>
                <ThemedText style={[styles.statNumber, { color: theme.primary }]}>{n}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {label}
                </ThemedText>
              </Card>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader title="Izdvojene teme" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hList}>
              {data.topics.map((t) => (
                <View key={t.slug} style={styles.hItem}>
                  <TopicCard topic={t} />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Servisne informacije" href="/servisi" />
            <LinkCard href="/servisi">
              <View style={styles.serviceRow}>
                <ServiceStat label="Prekidi" value={data.services.outages.length} />
                <ServiceStat
                  label="Granice"
                  value={data.services.borders.filter((b) => b.severity !== 'ok').length}
                  tone="warning"
                />
                <ServiceStat
                  label="Putevi"
                  value={data.services.roads.length}
                  tone="danger"
                />
                <ServiceStat
                  label="Radari"
                  value={data.services.radars.filter((r) => r.active).length}
                />
              </View>
              <Badge label="Aktuelno danas" tone="success" />
            </LinkCard>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Nedavno ažurirani članci" href="/clanci" />
            {data.recent.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader title="Najčitaniji članci" />
            {data.mostRead.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader title="Oblasti" />
            <View style={styles.grid}>
              {data.categories.map((c) => (
                <View key={c.slug} style={styles.gridItem}>
                  <CategoryTile category={c} />
                </View>
              ))}
            </View>
          </View>
        </>
      ) : null}
    </Screen>
  );
}

function ServiceStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'warning' | 'danger';
}) {
  const theme = useTheme();
  return (
    <View style={styles.serviceStat}>
      <ThemedText
        style={[styles.statNumber, { color: tone ? theme[tone] : theme.primary }]}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: Spacing.two },
  stat: { flex: 1, alignItems: 'center', paddingVertical: Spacing.three },
  statNumber: { fontSize: 24, lineHeight: 30, fontWeight: 700 },
  section: { gap: Spacing.two },
  hList: { gap: Spacing.two },
  hItem: { width: 280 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceStat: { alignItems: 'center', flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  gridItem: { width: '48.5%' },
});
