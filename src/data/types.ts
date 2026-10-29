export type Category = {
  slug: string;
  name: string;
  articleCount: number;
  icon: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  topicSlug?: string;
  readingMinutes: number;
  updatedAt: string;
  body: { heading?: string; text: string }[];
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  articleCount: number;
};

export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export type Severity = 'ok' | 'warning' | 'critical';

export type Outage = {
  id: string;
  title: string;
  provider: string;
  location: string;
  status: 'Najavljeno' | 'Aktivno' | 'Završeno';
};

export type BorderCrossing = {
  id: string;
  name: string;
  country: 'Hrvatska' | 'Srbija' | 'Crna Gora';
  waitMinutes: number;
  severity: Severity;
};

export type RoadAlert = {
  id: string;
  road: string;
  title: string;
  severity: Severity;
};

export type RadarControl = {
  id: string;
  place: string;
  area: string;
  time: string;
  active: boolean;
};

export type ServicesSnapshot = {
  outages: Outage[];
  borders: BorderCrossing[];
  roads: RoadAlert[];
  radars: RadarControl[];
  lastChecked: string;
};

export type SiteStats = { articles: number; topics: number; tools: number };
