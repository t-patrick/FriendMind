import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Headline, Paragraph } from "react-native-paper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imga = require("../assets/images/reminisce-splash.jpg");
import { getReminsce } from "../api/FriendAPI";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Reminiscence } from "../types";
import moment from "moment";

function Reminisce() {
  const [events, setEvents] = useState<Array<Reminiscence>>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const events = await getReminsce(1);
    setEvents(events);
  };

  const getDateDiff = (date: Date) => {
    const d = moment(date);
    const diff = Math.abs(d.diff(new Date(), "days"));

    if (diff >= 365) {
      const years = Math.floor(diff / 365);
      return "" + years + (years === 1 ? " year" : " years");
    }

    if (diff > 30) {
      const months = Math.floor(diff / 30);
      return "" + months + (months === 1 ? " month" : " months");
    }

    if (diff > 6) {
      const weeks = Math.floor(diff / 7);
      return "" + weeks + (weeks === 1 ? " week" : " weeks");
    }
    return Math.abs(diff) + " days";
  };

  return (
    <ImageBackground source={imga} resizeMode="cover" style={styles.image}>
      <ScrollView>
        {events && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Headline
              style={{
                color: "white",
                fontSize: 34,
                marginBottom: 20,
                marginTop: 50,
                height: 40,
              }}
            >
              Reminisce
            </Headline>
            {events.map((event, index) => {
              return (
                <TouchableOpacity key={index}>
                  <View style={styles.card}>
                    <Paragraph style={styles.para}>
                      {getDateDiff(new Date(event.communication.date))} ago:
                    </Paragraph>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 20,
                        color: "white",
                        marginTop: 10,
                      }}
                    >
                      "{event.event?.title}"
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 20,
                        color: "white",
                        marginTop: 10,
                      }}
                    >
                      with {event.friend.firstName}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 40,
    width: "100%",
    backgroundColor: "rgba(62, 180, 137, 0.85)",
    borderRadius: 10,
    padding: 20,
    maxWidth: 300,
    minWidth: 300,
    alignItems: "center",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    fontFamily: "Roboto",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  para: {
    color: "white",
    fontFamily: "Roboto",
    flexShrink: 1,
    marginTop: 10,
    fontSize: 18,
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
  },
  bottomButtonsOther: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  bottomButton: {
    width: 150,
    backgroundColor: "#1685EC",
  },
  bottomButtonOther: {
    backgroundColor: "#1685EC",
    height: 40,
  },
});

export default Reminisce;
