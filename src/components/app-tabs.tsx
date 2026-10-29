import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.backgroundElement}
      indicatorColor={colors.backgroundSelected}
      tintColor={colors.primary}
      labelStyle={{ selected: { color: colors.primary } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Početna</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="clanci">
        <NativeTabs.Trigger.Label>Članci</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'doc.text', selected: 'doc.text.fill' }} md="article" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="alati">
        <NativeTabs.Trigger.Label>Alati</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="wrench.and.screwdriver" md="build" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="servisi">
        <NativeTabs.Trigger.Label>Servisi</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="antenna.radiowaves.left.and.right" md="sensors" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="postavke">
        <NativeTabs.Trigger.Label>Postavke</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
