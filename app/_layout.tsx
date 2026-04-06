import {
  Inter_400Regular,
  Inter_500Medium,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts as useManropeFonts,
} from '@expo-google-fonts/manrope';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded] = useInterFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  });

  const [manropeLoaded] = useManropeFonts({
    'Manrope-SemiBold': Manrope_600SemiBold,
    'Manrope-Bold': Manrope_700Bold,
  });

  useEffect(() => {
    if (interLoaded && manropeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, manropeLoaded]);

  if (!interLoaded || !manropeLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
