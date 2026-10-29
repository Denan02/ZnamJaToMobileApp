import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Badge, Card, ChipRow, formatDate } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import type { ServicesSnapshot, Severity } from '@/data/types';
import { useAsync } from '@/hooks/use-async';
import { useTheme } from '@/hooks/use-theme';
import { api } from '@/services/api';

type Section = 'outages' | 'borders' | 'roads' | 'radars';

const sections: { value: Section; label: string }[] = [
  { value: 'outages', label: 'Prekidi' },
  { value: 'borders', label: 'Granice' },
  { value: 'roads', label: 'Putevi' },
  { value: 'radars', label: 'Radari' },
];

const tone = (s: Severity) => (s === 'ok' ? 'success' : s === 'warning' ? 'warning' : 'danger');

export default function ServicesScreen() {
  const [section, setSection] = useState<Section>('outages');
  const { data, loading } = useAsync(() => api.getServices());

  return (
    <Screen
      inTabs
      title="Servisi"
      subtitle="Prekidi, granice, putevi i radari u BiH"
      loading={loading || !data}>
      {data ? (
        <>
          <ChipRow options={sections} value={section} onChange={setSection} />
          <View style={styles.list}>
            <SectionList section={section} data={data} />
          </View>
          <ThemedText type="small" themeColor="textMuted">
            Posljednja provjera: {formatDate(data.lastChecked)}
          </ThemedText>
        </>
      ) : null}
    </Screen>
  );
}

function SectionList({ section, data }: { section: Section; data: ServicesSnapshot }) {
  const theme = useTheme();

  if (section === 'outages')
    return data.outages.map((o) => (
      <Card key={o.id}>
        <Badge label={o.status} tone={o.status === 'Aktivno' ? 'danger' : 'warning'} />
        <ThemedText style={styles.bold}>{o.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {o.provider}
        </ThemedText>
      </Card>
    ));

  if (section === 'borders')
    return data.borders.map((b) => (
      <Card key={b.id}>
        <View style={styles.row}>
          <Icon name="border" color={theme.primary} />
          <View style={styles.flex}>
            <ThemedText style={styles.bold}>{b.name}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {b.country}
            </ThemedText>
          </View>
          <Badge
            label={b.waitMinutes ? `${b.waitMinutes} min` : 'Bez zastoja'}
            tone={tone(b.severity)}
          />
        </View>
      </Card>
    ));

  if (section === 'roads')
    return data.roads.map((r) => (
      <Card key={r.id}>
        <Badge label={r.road} tone={tone(r.severity)} />
        <ThemedText style={styles.bold}>{r.title}</ThemedText>
      </Card>
    ));

  return data.radars.map((r) => (
    <Card key={r.id}>
      <Badge label={r.active ? 'Aktivno sada' : 'Najavljeno'} tone={r.active ? 'danger' : 'primary'} />
      <ThemedText style={styles.bold}>{r.place}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {r.area} · {r.time}
      </ThemedText>
    </Card>
  ));
}

const styles = StyleSheet.create({
  list: { gap: Spacing.two },
  bold: { fontWeight: 700 },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  flex: { flex: 1 },
});
