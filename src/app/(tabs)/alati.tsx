import { StyleSheet, View } from 'react-native';

import { ToolCard } from '@/components/content-cards';
import { Screen } from '@/components/screen';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function ToolsScreen() {
  const { data, loading } = useAsync(() => api.getTools());

  return (
    <Screen inTabs title="Alati" subtitle="Kalkulatori, procjene i praktični generatori" loading={loading}>
      <View style={styles.list}>{data?.map((t) => <ToolCard key={t.slug} tool={t} />)}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({ list: { gap: Spacing.two } });
