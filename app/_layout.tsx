import { Stack } from 'expo-router';
// import { useColorScheme } from 'react-native';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="webview/webview" options={{ headerShown: false }} />
    </Stack>
    // </ThemeProvider>
  );
}
