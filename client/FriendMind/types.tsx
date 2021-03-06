import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";

/*///////////////////
  NAVIGATION TYPES
  Necessary for passing props through navigation interface.
*/ /////////////////////////////////////

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Friends: undefined;
  Drawer: undefined;
  Friend: { friend: Friend };
  AddFriend: undefined;
  AddEvent: { friendId: number; communication: Communication };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type AddEventProps = NativeStackScreenProps<
  RootStackParamList,
  "AddEvent"
>;
export type AddFriendProps = NativeStackScreenProps<
  RootStackParamList,
  "AddFriend"
>;
export type FriendsProps = NativeStackScreenProps<
  RootStackParamList,
  "Friends"
>;
export type FriendProps = NativeStackScreenProps<RootStackParamList, "Friend">;
export type ReminderProps = {
  reminder: Reminder;
};

export interface FriendCardProps {
  friend: FriendForCard;
  goToFriend: (id: number) => void;
}

export type HomeTabParamList = {
  Remind: undefined;
  Reminisce: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  Friends: undefined;
  Stack: undefined;
};

/* ///////////////////
  ACTUAL DATA TYPES
*/ /////////////////////////////////////

export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type UserContextType = {
  user: User;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export type Friend = {
  id: number;
  firstName: string;
  lastName: string;
  birthDay: number;
  birthMonth: string;
  lastComms: Array<LastComm>;
  notes?: Array<Note>;
  profilePictureUrl?: string;
};

export type Note = {
  text: string;
};

export type FriendWithLastComms = {
  firstName: string;
  lastName: string;
  lastComms: Array<LastComm>;
};

export type Reminder = {
  friendId: number;
  firstName: string;
  lastName: string;
  lastComm: LastComm;
  picture: string | undefined;
};
export type LastComm = {
  preference: CommPreference;
  lastCommunication: Communication;
};

export type Communication = {
  id?: number;
  date: Date;
  type: "Write" | "Talk" | "Meet" | "Added";
};

export type FriendForAdd = {
  firstName: string;
  lastName: string;
  birthDay: number;
  birthMonth: string;
  profilePictureUrl?: string;
};

export type MeetEvent = {
  title: string;
  location: string;
};
export type FullEvent = {
  communication: Communication;
  event: MeetEvent | null;
};

export type CommPreference = {
  mode: "Write" | "Talk" | "Meet";
  timeUnit: "Days" | "Weeks" | "Months" | "Years";
  amount: number;
};

export type FriendForCard = {
  id: number;
  firstName: string;
  lastName: string;
  lastSeen: Date;
  picture: string | undefined;
};

export interface Reminiscence extends FullEvent {
  friend: Friend;
}

export type FriendContextValue = {
  allFriends: Array<Friend>;
  setAllFriends: Dispatch<SetStateAction<Friend[]>>;
};
