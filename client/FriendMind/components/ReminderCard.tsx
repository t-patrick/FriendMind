import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Divider,
  Headline,
  Menu,
  Modal,
  Paragraph,
  Portal,
  TextInput,
} from "react-native-paper";
import { postCommunication } from "../api/FriendAPI";
import { FriendContext } from "../App";
import { Friend, NavigationProps, ReminderProps } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReminderCard: FC<ReminderProps> = ({ reminder }) => {
  const navigation = useNavigation<NavigationProps>();

  const { allFriends } = useContext(FriendContext);

  const [cardVisible, setCardVisible] = useState<boolean>(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDate(new Date(Date.now()));
  }, []);

  const onChange = (event: any, selectedDate?: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const lastComm = reminder.lastComm;

  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const goToFriend = () => {
    closeMenu();
    const friendData = allFriends.find(
      (item) => item.id === reminder.friendId
    ) as Friend;
    navigation.navigate("Friend", { friend: friendData });
  };

  const formatDate = () => {
    return new Date(lastComm.lastCommunication.date).toDateString();
  };

  const onDone = () => {
    closeMenu();
    setModalVisible(true);
  };

  const addEventHandle = async () => {
    const comm = await postCommunication(reminder.friendId, {
      date: date,
      type: reminder.lastComm.preference.mode,
    });

    setCardVisible(false);

    hideModal();
    navigation.navigate("AddEvent", {
      friendId: reminder.friendId,
      communication: comm,
    });
  };

  const onlyAddCommunication = async () => {
    const comm = await postCommunication(reminder.friendId, {
      date: date,
      type: reminder.lastComm.preference.mode,
    });

    setCardVisible(false);
    hideModal();
  };

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const datePicker = () => {
    return (
      <View>
        <TextInput
          disabled
          label="Date"
          value={date.toDateString()}
          placeholderTextColor="black"
          autoComplete={false}
          style={{ marginTop: 30, marginBottom: 20 }}
        />
        <View>
          <Button onPress={showDatepicker}>Change Date</Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            display="default"
            mode="date"
            onChange={onChange}
          />
        )}
      </View>
    );
  };

  const conditionalDoneRender = () => {
    if (reminder.lastComm.preference.mode === "Meet") {
      return (
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View>
              <Headline style={{ textAlign: "center" }}>Great!</Headline>
              {datePicker()}
              <View style={styles.bottomButtons}>
                <Button
                  mode="contained"
                  style={[styles.bottomButton, { marginRight: 20 }]}
                  onPress={addEventHandle}
                >
                  Add Event
                </Button>
                <Button
                  mode="contained"
                  style={styles.bottomButton}
                  onPress={onlyAddCommunication}
                >
                  Later
                </Button>
              </View>
              <Button
                mode="contained"
                style={[
                  styles.bottomButton,
                  {
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#EC163C",
                  },
                ]}
                onPress={hideModal}
              >
                Cancel
              </Button>
            </View>
          </Modal>
        </Portal>
      );
    } else {
      return (
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View>
              <Headline style={{ textAlign: "center" }}>Great!</Headline>
              {datePicker()}
              <View style={[styles.bottomButtonsOther]}>
                <Button
                  mode="contained"
                  style={styles.bottomButtonOther}
                  onPress={onlyAddCommunication}
                >
                  Add Communication
                </Button>
                <Button
                  mode="contained"
                  style={styles.bottomButtonOther}
                  onPress={hideModal}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      );
    }
  };

  const renderCard = () => {
    return (
      <TouchableOpacity onPress={openMenu}>
        {conditionalDoneRender()}
        <View style={styles.card}>
          {formatMessage(
            lastComm.lastCommunication.type,
            lastComm.preference.mode,
            reminder.firstName
          )}
          <View style={styles.inside}>
            <Avatar.Image
              source={{ uri: reminder.picture, width: 300, height: 300 }}
            />
            <View>
              <Paragraph style={styles.para}>The last time was:</Paragraph>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Manrope_400Regular",
                }}
              >
                {lastComm.lastCommunication.type === "Added"
                  ? " Not since adding"
                  : " " + formatDate()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return reminder && cardVisible ? (
    <View>
      <Menu visible={visible} onDismiss={closeMenu} anchor={renderCard()}>
        <Menu.Item onPress={() => onDone()} title="Done!" />
        <Divider />
        <Menu.Item onPress={goToFriend} title="View Friend" />
        <Divider />
        <Menu.Item onPress={() => console.log("dismiss")} title="Dismiss" />
      </Menu>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 40,
    width: "100%",
    backgroundColor: "rgba(62, 180, 137, 0.85)",
    borderRadius: 10,
    padding: 20,
    minWidth: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Manrope_400Regular",
  },
  inside: {
    marginTop: 10,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    fontFamily: "Manrope_400Regular",
    paddingTop: 5,
  },
  para: {
    color: "white",
    fontFamily: "Manrope_400Regular",
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

const formatMessage = (
  lastCommType: string,
  preferredMode: string,
  firstName: string
) => {
  switch (preferredMode) {
    case "Write":
      return (
        <Headline style={styles.name}>
          <Text style={{ fontSize: 34, fontWeight: "600" }}>Message </Text>
          <Text>{firstName}</Text>
        </Headline>
      );
    case "Meet":
      return (
        <Headline style={styles.name}>
          <Text style={{ fontSize: 34, fontWeight: "600" }}>Meet up with </Text>
          <Text>{firstName}</Text>
        </Headline>
      );
    case "Talk":
      return <Headline style={styles.name}>Give {firstName} a call!</Headline>;
  }
};

export default ReminderCard;
