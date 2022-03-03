/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Root: NavigatorScreenParams<RootTabParamList> | undefined;
// Modal: undefined;
// NotFound: undefined;

export type RootStackParamList = {
  Home: undefined;
  Friends: undefined;
  Drawer: undefined;
  Friend: undefined;
  AddFriend: undefined;
  AddEvent: {location: string} | undefined
};

export type AddEventProps = NativeStackScreenProps<RootStackParamList, 'AddEvent'>;

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, Screen>



export type HomeTabParamList = {
  Remind: undefined;
  Reminisce: undefined;
};


export type RootDrawerParamList = {
  Home: undefined;
  Friends: undefined;
  Stack: undefined
}

// type Props = NativeStackScreenProps<RootStackParamList, ''>;

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, Screen>,
//   NativeStackScreenProps<RootStackParamList>
// >;

