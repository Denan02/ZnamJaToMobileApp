// Jedina tačka pristupa podacima. Sada vraća mock; kasnije zamijeniti fetch pozivima prema API-ju.
import {
  articles,
  categories,
  mostReadSlugs,
  services,
  stats,
  tools,
  topics,
} from '@/data/mock';
import type { Article, Category, ServicesSnapshot, SiteStats, Tool, Topic } from '@/data/types';

const delay = <T,>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const api = {
  getStats: (): Promise<SiteStats> => delay(stats),
  getCategories: (): Promise<Category[]> => delay(categories),
  getTopics: (): Promise<Topic[]> => delay(topics),
  getTopic: (slug: string): Promise<Topic | undefined> =>
    delay(topics.find((t) => t.slug === slug)),
  getArticles: (opts?: { categorySlug?: string; topicSlug?: string }): Promise<Article[]> =>
    delay(
      articles.filter(
        (a) =>
          (!opts?.categorySlug || a.categorySlug === opts.categorySlug) &&
          (!opts?.topicSlug || a.topicSlug === opts.topicSlug),
      ),
    ),
  getArticle: (slug: string): Promise<Article | undefined> =>
    delay(articles.find((a) => a.slug === slug)),
  getRecentArticles: (): Promise<Article[]> =>
    delay([...articles].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4)),
  getMostReadArticles: (): Promise<Article[]> =>
    delay(mostReadSlugs.flatMap((s) => articles.find((a) => a.slug === s) ?? [])),
  getTools: (): Promise<Tool[]> => delay(tools),
  getTool: (slug: string): Promise<Tool | undefined> => delay(tools.find((t) => t.slug === slug)),
  getServices: (): Promise<ServicesSnapshot> => delay(services),
};
