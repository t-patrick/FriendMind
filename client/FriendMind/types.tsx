import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/*///////////////////
  NAVIGATION TYPES
  Necessary for passing props through navigation interface.
*//////////////////////////////////////

export type RootStackParamList = {
  Home: undefined;
  Friends: undefined;
  Drawer: undefined;
  Friend: {friendData: Friend};
  AddFriend: undefined;
  AddEvent: {location: string} | undefined
};

export type AddEventProps = NativeStackScreenProps<RootStackParamList, 'AddEvent'>;
export type AddFriendProps = NativeStackScreenProps<RootStackParamList, 'AddFriend'>;
export type FriendsProps = NativeStackScreenProps<RootStackParamList, 'Friends'>;
export type FriendProps = NativeStackScreenProps<RootStackParamList, 'Friend'>;
export type ReminderProps = {
  reminder: Reminder
}

export type HomeTabParamList = {
  Remind: undefined;
  Reminisce: undefined;
};


export type RootDrawerParamList = {
  Home: undefined;
  Friends: undefined;
  Stack: undefined
}

/* ///////////////////
  ACTUAL DATA TYPES
    TODO: create api to fetch these from server.
*//////////////////////////////////////

export type Friend = {
  firstName: string,
  lastName: string, 
  birthDay: number,
  birthMonth: string,
  lastComms: Array<LastComm>,
  notes?: Array<string>
}

export type FriendWithLastComms = {
  firstName: string,
  lastName: string, 
  lastComms: Array<LastComm>,
}

export type Reminder = {
  friendId: number,
  firstName: string,
  lastName: string,
  lastComm: LastComm
}
export type LastComm = {
  preference: CommPreference, 
  lastCommunication: Date
}

export type CommPreference = {
  mode: 'Write' | 'Talk' | 'Meet' | 'Added'
  timeUnit: 'Days' | 'Weeks' | 'Months' | 'Years';
  amount: number;
}

export type FriendForCard = {
  firstName: string,
  lastName: string;
  lastSeen: Date;
}

