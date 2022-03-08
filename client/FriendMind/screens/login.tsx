import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import { UserContext } from "../navigation";
import { navigate } from "../navigation/RootNavigation";
import { NavigationProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const splash = require("../assets/images/friendsplash.jpg");

function Login() {
  // const navigation = useNavigation<NavigationProps>();

  const { setIsLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Logo = () => {
    return (
      <Image
        style={styles.logo}
        source={require("../assets/images/mainlogo.png")}
      />
    );
  };

  const login = () => {
    setIsLoggedIn(true);
    navigate("Drawer");
  };

  return (
    <ImageBackground source={splash} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.loginbox}>
          <Logo />
          <Headline style={styles.title}>Login</Headline>
          <TextInput
            label="Username"
            autoComplete={false}
            style={styles.input}
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            autoComplete={false}
            style={styles.input}
            onChangeText={(val) => setEmail(val)}
          />
          <View>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: -70,
  },
  loginbox: {
    height: "50%",
    width: "80%",
  },
  input: {
    height: 60,
    marginTop: 10,
  },
  title: {
    marginBottom: 20,
    fontFamily: "Manrope_500Regular",
    textAlign: "center",
    color: "white",
    fontSize: 32,
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    padding: 10,
    backgroundColor: "#3EB489",
    width: 100,
    borderRadius: 15,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "white",
    fontFamily: "Manrope_500Medium",
    textAlign: "center",
    fontSize: 18,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Login;
