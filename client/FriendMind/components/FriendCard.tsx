import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Headline } from "react-native-paper";
import { FriendCardProps } from "../types";

const FriendCard: FC<FriendCardProps> = (props) => {
  const { friend, goToFriend } = props;

  return (
    <TouchableOpacity onPress={() => goToFriend(friend.id)}>
      <View style={styles.card}>
        <Avatar.Image
          source={{ uri: friend.picture, width: 200, height: 300 }}
        />
        <Headline style={styles.name}>
          {friend.firstName} {friend.lastName}
        </Headline>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#3EB489",
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginLeft: 40,
    fontFamily: "Manrope_400Regular",
  },
  para: {
    color: "white",
    fontFamily: "Roboto",
    flexShrink: 1,
    width: 80,
  },
});

export default FriendCard;
