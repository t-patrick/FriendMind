import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FriendContext } from "../App";
import { Friend as FriendType, Reminder } from "../types";
import ReminderCard from "./ReminderCard";
import { DurationInputArg1, DurationInputArg2 } from "moment";
import { Headline } from "react-native-paper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const splash = require("../assets/images/friendsplash.jpg");

type Birthday = {
  friend: FriendType;
  date: Date;
};

function Remind() {
  const { allFriends } = useContext(FriendContext);
  const [reminders, setReminders] = useState<Array<Reminder>>([]);
  const [birthdays, setBirthdays] = useState<Array<Birthday>>([]);

  useEffect(() => {
    // Turn Friend Preferences into Reminders.
    // Filter them by comparing preferences to last communication.

    const reminds: Array<Reminder> = [];
    allFriends.length > 0 &&
      allFriends.forEach((friend) => {
        friend.lastComms.forEach((comm) => {
          const lastComm = moment(comm.lastCommunication.date);
          const amount = comm.preference.amount as DurationInputArg1;
          const unit =
            comm.preference.timeUnit[0].toLowerCase() as DurationInputArg2;
          const cutoff = lastComm.add(amount, unit);
          if (Date.now() > cutoff.valueOf())
            reminds.push({
              friendId: friend.id,
              firstName: friend.firstName,
              lastName: friend.lastName,
              lastComm: comm,
              picture: friend.profilePictureUrl,
            });
        });
      });

    const bdays: Array<Birthday> = allFriends
      .map((friend) => {
        const birthday = moment(
          friend.birthMonth +
            " " +
            friend.birthDay +
            " " +
            new Date().getFullYear()
        );
        return {
          friend: friend,
          date: birthday.toDate(),
        };
      })
      .filter((b) => {
        const difference = moment(b.date).diff(new Date(), "days");
        if (difference > 0 && difference < 8) return true;
        return false;
      });

    setBirthdays(bdays);
    setReminders(reminds);
  }, [allFriends]);

  const renderBirthdays = () => {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <Headline
          style={{
            color: "white",
            fontSize: 28,
            marginBottom: 20,
            fontFamily: "Manrope_400Regular",
          }}
        >
          Upcoming Birthdays:
        </Headline>
        {birthdays?.map((birthday, index) => (
          <Text style={styles.birthday} key={index}>
            {birthday.friend.firstName} {birthday.friend.lastName}:{" "}
            {birthday.date.toDateString()}
          </Text>
        ))}
      </View>
    );
  };

  return reminders ? (
    <ImageBackground source={splash} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.list}>
        <View style={styles.mainBox}>
          {birthdays?.length > 0 ? renderBirthdays() : <></>}
        </View>
        <View style={{ alignItems: "center" }}>
          <Headline
            style={{
              color: "white",
              fontSize: 28,
              marginBottom: 20,
              fontFamily: "Manrope_400Regular",
            }}
          >
            Reminders:
          </Headline>
          {reminders.map((reminder, index) => (
            <ReminderCard key={index} reminder={reminder} />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  ) : (
    <Text>You are all up to date with your friends!</Text>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
  },
  mainBox: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  birthday: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(22, 133, 236, 0.8)",
    padding: 15,
    borderRadius: 15,
    elevation: 1,
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Remind;
