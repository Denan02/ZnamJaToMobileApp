import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Badge, Card, IconBubble } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAsync } from '@/hooks/use-async';
import { api } from '@/services/api';

export default function ToolScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data: tool, loading } = useAsync(() => api.getTool(slug), [slug]);

  return (
    <Screen loading={loading}>
      <Stack.Screen options={{ title: '' }} />
      {tool ? (
        <>
          <View style={styles.head}>
            <IconBubble name={tool.icon} />
            <ThemedText style={styles.title}>{tool.title}</ThemedText>
            <ThemedText themeColor="textSecondary">{tool.description}</ThemedText>
          </View>
          <Card>
            <Badge label="Uskoro" tone="warning" />
            <ThemedText themeColor="textSecondary">
              Forma kalkulatora i rezultat bit će dodani kad se definira API.
            </ThemedText>
          </Card>
        </>
      ) : !loading ? (
        <ThemedText>Alat nije pronađen.</ThemedText>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: Spacing.two },
  title: { fontSize: 26, lineHeight: 32, fontWeight: 700 },
});
