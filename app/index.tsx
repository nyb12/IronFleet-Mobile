import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>
        <Link href="/webview/webview">Go to Webview</Link>
      </Text>
    </View>
  );
}
