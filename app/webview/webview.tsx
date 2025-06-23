import SafeScreen from '@/components/SafeScreen';
import * as Audio from 'expo-audio';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

function Webview(): React.JSX.Element {
  const webviewRef = useRef<WebView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleWebMessage = async (event: any) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data);

    switch (type) {
      case 'get-location': {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          webviewRef.current?.injectJavaScript(
            `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
              {
                type: 'location-result',
                payload: location,
              },
            )} }));`,
          );
        }
        break;
      }

      case 'request-camera': {
        const { status } = await requestCameraPermission();
        webviewRef.current?.injectJavaScript(
          `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
            {
              type: 'camera-status',
              payload: status,
            },
          )} }));`,
        );
        break;
      }

      case 'request-microphone': {
        const { status } = await Audio.requestRecordingPermissionsAsync();
        webviewRef.current?.injectJavaScript(
          `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
            {
              type: 'microphone-status',
              payload: status,
            },
          )} }));`,
        );
        break;
      }

      default:
        console.warn('Unknown message type:', type);
    }
  };

  return (
    <SafeScreen>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={{ flex: 1 }}
        >
          <WebView
            source={{
              uri: 'https://275d-182-156-141-152.ngrok-free.app/aviOS',
            }}
            style={styles.webview}
            originWhitelist={['*']}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            allowsBackForwardNavigationGestures={true}
            allowsPictureInPictureMediaPlayback={true}
            keyboardDisplayRequiresUserAction={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="never"
            onMessage={handleWebMessage}
          />
        </KeyboardAvoidingView>
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
