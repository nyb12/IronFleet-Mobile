// app/index.tsx
import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
      setTimeout(() => {
        router.replace('/webview/webview');
      }, 1000);
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Loading app... 🚀✈️</Text>
    </View>
  );
}
