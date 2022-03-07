/* 
1. Fetch All Friends from server.
2. Fetch the communication preferences.
3. For each communication preference
  a) find the last time 
  b) create new friend with info
*/

import { Communication, FriendForAdd, MeetEvent } from "../types";

/* 
  The format I need to end up with is 'Friend'
  UserId defaults to 1 for now
*/

const baseUrl = 'http://10.0.2.2:3000';

export const getFriends = async (userId: number) => {
  return fetch(`${baseUrl}/friends?id=${userId}`)
      .then(friends => friends.json())
} 

export const getEvents = async (friendId: number) => {
  return fetch(`${baseUrl}/meetings?id=${friendId}`)
      .then(events => events.json())
} 

export const  addFriend = async (userId: number, friend: FriendForAdd, preferences: Array<CommPreference>) => {
  return fetch(`${baseUrl}/friend?id=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ friend, preferences })
  }).then(resp => resp.json());
}

export const addFriendNote = (id: number, note: Note) => {
  return fetch(`${baseUrl}/friendnote?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  }).then(resp => resp.json());
}

export const postCommunication = (friendId: number, communication: Communication) => {
  return fetch(`${baseUrl}/communication?id=${friendId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(communication)
  }).then(resp => resp.json());
}
export const postEvent = (commId: number, event: MeetEvent) => {
  return fetch(`${baseUrl}/meeting?id=${commId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then(resp => resp.json());
}




export type Friend = {
  id: number,
  firstName: string,
  lastName: string, 
  birthDay: number,
  birthMonth: string,
  lastComms: Array<LastComm>,
  notes?: Array<string>,
  imageUrl? : string
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

export type Note = {
  text: string
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

