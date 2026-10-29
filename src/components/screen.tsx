import { ActivityIndicator, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

type ScreenProps = {
  /** Naslov unutar sadržaja (za tab ekrane bez nativnog headera). */
  title?: string;
  subtitle?: string;
  /** Ekran unutar tabova treba dodatni razmak ispod zbog tab bara. */
  inTabs?: boolean;
  loading?: boolean;
  contentStyle?: ViewStyle;
  children?: React.ReactNode;
};

export function Screen({ title, subtitle, inTabs, loading, contentStyle, children }: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentInsetAdjustmentBehavior={title ? 'never' : 'automatic'}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: title ? insets.top + Spacing.three : Spacing.three,
          paddingBottom: (inTabs ? BottomTabInset : 0) + insets.bottom + Spacing.five,
        },
        contentStyle,
      ]}>
      {title ? (
        <View style={styles.header}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle ? <ThemedText themeColor="textSecondary">{subtitle}</ThemedText> : null}
        </View>
      ) : null}
      {loading ? <ActivityIndicator style={styles.loader} color={theme.primary} /> : children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: { gap: Spacing.one },
  title: { fontSize: 32, lineHeight: 38, fontWeight: 700 },
  loader: { marginTop: Spacing.five },
});
