import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = (): number => {
  if (isSmall) {
    return 330;
  }
  return 350;
};

const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth()) * size;

const guidelineBaseHeight = (): number => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
};

const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight()) * size;

const guidelineBaseFonts = (): number => {
  if (width > 410) {
    return 430;
  }
  return 400;
};

const scaleFontSize = (size: number): number =>
  Math.round((width / guidelineBaseFonts()) * size);

export { horizontalScale, scaleFontSize, verticalScale };
