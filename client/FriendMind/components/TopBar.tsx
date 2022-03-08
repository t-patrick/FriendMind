import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { navigate } from "../navigation/RootNavigation";

function TopBar() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Appbar.Header style={[styles.bar]}>
        <Appbar.Action icon="home" onPress={() => navigate("Home")} />
        <Appbar.Action
          icon="account-group"
          onPress={() => navigate("Friends")}
        />
        <Logo />
      </Appbar.Header>
    </View>
  );
}

const Logo = () => {
  return (
    <Image style={styles.logo} source={require("../assets/images/logo2.png")} />
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 50,
    width: "100%",
    marginTop: -15,
    backgroundColor: "white",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: 10,
  },
});

export default TopBar;
