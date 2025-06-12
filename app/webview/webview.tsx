import SafeScreen from '@/components/SafeScreen';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WebView } from 'react-native-webview';

function Webview(): React.JSX.Element {
  return (
    <SafeScreen>
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: 'https://56be-161-69-80-64.ngrok-free.app/aviOS' }}
          style={styles.webview}
          originWhitelist={['*']}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          allowsBackForwardNavigationGestures={true}
          allowsPictureInPictureMediaPlayback={true}
          allowsFullscreen={true}
        />
      </SafeAreaView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Webview;
