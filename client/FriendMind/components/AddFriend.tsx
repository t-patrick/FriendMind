import React, { useState, useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Headline,
  Subheading,
  TextInput,
  Modal,
  Portal,
  Button,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { AddFriendProps, FriendForAdd } from "../types";
import { addFriend } from "../api/FriendAPI";
import { FriendContext } from "../App";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

function AddFriend({ navigation }: AddFriendProps) {
  const { allFriends, setAllFriends } = useContext(FriendContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [monthValue, setMonthValue] = useState("January");
  const [dayValue, setDayValue] = useState("1");
  const [dayError, setDayError] = useState(false);

  const [commPreferences, setCommPreferences] = useState<Array<CommPreference>>(
    []
  );
  const [selectedMode, setSelectedMode] = useState<"Write" | "Talk" | "Meet">(
    "Meet"
  );
  const [amount, setAmount] = useState("");
  const [timeUnit, setTimeUnit] = useState<
    "Days" | "Weeks" | "Months" | "Years"
  >("Weeks");

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Day error validation

  const setDay = (day: string) => {
    console.log(day);
    if (day === "") setDayValue("");
    if (day.length > 2 || !/^\d{1,2}$/.test(day)) return;
    setDayValue(day);
    setDayError(!checkDayValid(parseInt(day), monthValue));
  };

  const setMonth = (month: string) => {
    setMonthValue(month);
    setDayError(!checkDayValid(parseInt(dayValue), month));
  };

  const addPreference = () => {
    const newState = [...commPreferences];

    const newPreference: CommPreference = {
      mode: selectedMode,
      timeUnit: timeUnit,
      amount: parseInt(amount),
    };

    newState.push(newPreference);
    setCommPreferences(newState);
    hideModal();
  };

  const handleAddFriend = async () => {
    const friend: FriendForAdd = {
      firstName: firstName,
      lastName: lastName,
      birthDay: parseInt(dayValue),
      birthMonth: monthValue,
      profilePictureUrl: image,
    };

    if (firstName.length === 0) {
      showDialog();
      return;
    }
    if (commPreferences.length === 0) {
      showDialog();
      return;
    }

    const resp = await addFriend(1, friend, commPreferences);
    setAllFriends([...allFriends, resp]);
    navigation.navigate("Friend", { friend: resp });
  };

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  const [dialogMessage, setDialogMessage] = React.useState<string>(
    "Please enter a first name!"
  );

  useEffect(() => {
    if (firstName.length === 0) {
      setDialogMessage("Please enter a first name!");
    } else {
      if (commPreferences.length === 0) {
        setDialogMessage("Please enter at least one communication preference");
      }
    }
  }, [firstName, commPreferences]);

  const commPreferenceModal = () => {
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.commAdder}>
            <Text
              style={{
                fontSize: 26,
                fontFamily: "Manrope_400Regular",
                marginBottom: 30,
              }}
            >
              Add Preference:{" "}
            </Text>
            <Subheading
              style={{
                fontSize: 18,
                color: "black",
                fontFamily: "Manrope_400Regular",
              }}
            >
              Ideally, I would like to:
            </Subheading>
            <View style={styles.meet}>
              <Picker
                selectedValue={selectedMode}
                onValueChange={(value) => setSelectedMode(value)}
                style={styles.modePicker}
              >
                <Picker.Item label="Meet" value="Meet" />
                <Picker.Item label="Write/Message" value="Write" />
                <Picker.Item label="Talk" value="Talk" />
              </Picker>
            </View>
            <Subheading style={{ fontSize: 18, color: "black" }}>
              At intervals of no more than:
            </Subheading>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <TextInput
              label=""
              style={styles.amount}
              value={amount}
              onChangeText={(text) => setAmount(text)}
              autoComplete={false}
              keyboardType="numeric"
              selectionColor="black"
            />
            <Picker
              selectedValue={timeUnit}
              onValueChange={(value) => setTimeUnit(value)}
              style={styles.timeunit}
            >
              <Picker.Item label="Days" value="Days" />
              <Picker.Item label="Weeks" value="Weeks" />
              <Picker.Item label="Months" value="Months" />
              <Picker.Item label="Years" value="Years" />
            </Picker>
          </View>
          <View style={styles.bottomButtons}>
            <Button
              mode="contained"
              style={[styles.bottomButton, { marginRight: 20 }]}
              onPress={addPreference}
            >
              Add
            </Button>
            <Button
              mode="contained"
              style={styles.bottomButton}
              onPress={hideModal}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  const warningDialog = () => {
    return (
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 30 }}>
      <Headline style={styles.header}>Add Friend</Headline>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        autoComplete={false}
        style={styles.firstName}
        selectionColor="black"
      />
      <TextInput
        label="Last Name"
        placeholderTextColor="black"
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        autoComplete={false}
        style={styles.firstName}
      />
      <Subheading style={{ marginTop: 20, color: "black" }}>
        Birthday:
      </Subheading>
      <View style={styles.birthday}>
        <TextInput
          label="Day"
          style={styles.day}
          value={dayValue}
          onChangeText={(text) => setDay(text)}
          autoComplete={false}
          error={dayError}
          keyboardType="numeric"
        />
        <Picker
          prompt="Month"
          selectedValue={monthValue}
          style={styles.month}
          onValueChange={(value) => setMonth(value)}
        >
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="March" value="March" />
          <Picker.Item label="April" value="April" />
          <Picker.Item label="May" value="May" />
          <Picker.Item label="June" value="June" />
          <Picker.Item label="July" value="July" />
          <Picker.Item label="August" value="August" />
          <Picker.Item label="September" value="September" />
          <Picker.Item label="October" value="October" />
          <Picker.Item label="November" value="November" />
          <Picker.Item label="December" value="December" />
        </Picker>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={pickImage}>Pick an profile picture image</Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
      </View>
      <Subheading
        style={{
          marginTop: 40,
          fontSize: 20,
          fontFamily: "Manrope_400Regular",
        }}
      >
        Communication Preferences:
      </Subheading>
      <Button
        icon="plus"
        mode="contained"
        color="#3EB489"
        style={{ marginTop: 20 }}
        onPress={showModal}
      >
        Add Communication Preference
      </Button>
      {commPreferenceModal()}
      <View style={{ marginTop: 5 }}>
        {commPreferences.map((comm, index) => {
          return (
            <View style={{ alignItems: "center" }}>
              <Text key={index} style={styles.commPref}>
                + {comm.mode} every {comm.amount} {comm.timeUnit}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.bottomButtons}>
        <Button
          mode="contained"
          style={[styles.bottomButton, { marginRight: 20 }]}
          onPress={handleAddFriend}
        >
          Add Friend
        </Button>
        <Button
          mode="contained"
          style={styles.bottomButton}
          onPress={navigation.goBack}
        >
          Back
        </Button>
      </View>
      {warningDialog()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 28,
    color: "black",
    fontFamily: "Manrope_400Regular",
  },
  firstName: {
    marginBottom: 20,
    fontFamily: "Manrope_400Regular",
  },
  birthday: {
    flexDirection: "row",
    marginTop: 5,
    color: "black",
    fontFamily: "Manrope_400Regular",
  },
  commAdder: {
    marginTop: 5,
    fontFamily: "Manrope_400Regular",
    alignItems: "center",
  },
  meet: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
    fontFamily: "Manrope_400Regular",
  },
  modePicker: {
    width: 180,
    height: 30,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    fontFamily: "Manrope_400Regular",
  },
  month: {
    width: "50%",
    height: "100%",
  },
  day: {
    flex: 1,
    width: 40,
    backgroundColor: "#FBFBFB",
  },
  amount: {
    width: "20%",
    height: 50,
    marginLeft: 20,
    backgroundColor: "#d6d6d6",
  },
  timeunit: {
    width: 150,
    marginLeft: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  buttons: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    width: "50%",
    justifyContent: "space-between",
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 50,
  },
  bottomButton: {
    width: 150,
    backgroundColor: "#1685EC",
  },
  commPref: {
    fontFamily: "Manrope_400Regular",
    fontSize: 22,
  },
});

const checkDayValid = (day: number, month: string) => {
  if (Number.isNaN(day) || day < 1 || day > 31) return false;

  const thirtyOne = [
    "January",
    "March",
    "May",
    "July",
    "August",
    "October",
    "December",
  ];

  if (month === "February") {
    return day > 29 ? false : true;
  }

  if (thirtyOne.includes(month)) return true;

  return day > 30 ? false : true;
};

type CommPreference = {
  mode: "Write" | "Talk" | "Meet";
  timeUnit: "Days" | "Weeks" | "Months" | "Years";
  amount: number;
};

export default AddFriend;
