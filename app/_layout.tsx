import { Stack } from 'expo-router';
// import { useColorScheme } from 'react-native';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack initialRouteName="webview/webview">
      <Stack.Screen name="webview/webview" options={{ headerShown: false }} />
    </Stack>
    // </ThemeProvider>
  );
}
