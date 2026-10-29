import { StyleSheet, View } from 'react-native';

import type { Article, Category, Tool, Topic } from '@/data/types';
import { categories } from '@/data/mock';
import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { Badge, IconBubble, LinkCard, formatDate } from './ui';

export function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <LinkCard href={{ pathname: '/clanak/[slug]', params: { slug: article.slug } }}>
      <View style={styles.meta}>
        <Badge label={categoryName(article.categorySlug)} />
        <ThemedText type="small" themeColor="textMuted">
          {article.readingMinutes} min
        </ThemedText>
      </View>
      <ThemedText type="default" style={styles.bold}>
        {article.title}
      </ThemedText>
      <ThemedText type="small" themeColor="textMuted">
        Ažurirano {formatDate(article.updatedAt)}
      </ThemedText>
    </LinkCard>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <LinkCard href={{ pathname: '/tema/[slug]', params: { slug: topic.slug } }}>
      <Badge label={`${categoryName(topic.categorySlug)} · ${topic.articleCount} članaka`} />
      <ThemedText type="default" style={styles.bold}>
        {topic.title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" numberOfLines={3}>
        {topic.description}
      </ThemedText>
    </LinkCard>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <LinkCard href={{ pathname: '/alat/[slug]', params: { slug: tool.slug } }}>
      <View style={styles.row}>
        <IconBubble name={tool.icon} />
        <View style={styles.flex}>
          <ThemedText type="default" style={styles.bold}>
            {tool.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {tool.description}
          </ThemedText>
        </View>
      </View>
    </LinkCard>
  );
}

export function CategoryTile({ category }: { category: Category }) {
  return (
    <LinkCard href={{ pathname: '/kategorija/[slug]', params: { slug: category.slug } }}>
      <IconBubble name={category.icon} />
      <ThemedText type="smallBold">{category.name}</ThemedText>
      <ThemedText type="small" themeColor="textMuted">
        {category.articleCount} članaka
      </ThemedText>
    </LinkCard>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bold: { fontWeight: 700 },
  row: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  flex: { flex: 1, gap: Spacing.half },
});
