import { Platform } from "react-native";


/* 
  Complicated. Will maybe use later.
*/

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  let boxShadow = {};
  if (Platform.OS === 'ios') {
    boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }

  return boxShadow;
};