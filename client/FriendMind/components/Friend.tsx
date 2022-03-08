import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Headline,
  List,
  Modal,
  Paragraph,
  Portal,
  TextInput,
  RadioButton,
  Dialog,
} from "react-native-paper";
import {
  addFriendNote,
  deleteFriend,
  getEvents,
  getFriend,
  postCommunication,
  postEvent,
} from "../api/FriendAPI";
import { FriendContext } from "../App";
import {
  Communication,
  Friend as FriendType,
  FriendProps,
  FullEvent,
  LastComm,
} from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";

let count = 1;

type CommType = "Meet" | "Write" | "Talk" | "Added";

function Friend({ navigation, route }: FriendProps) {
  const data = useContext(FriendContext);

  const [events, setEvents] = useState<Array<FullEvent>>([]);
  const [friendData, setFriendData] = useState<FriendType>();
  const [currentModal, setCurrentModal] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commValue, setCommValue] = useState<
    "Meet" | "Write" | "Talk" | "Added"
  >("Meet");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [currentEvent, setCurrentEvent] = useState<FullEvent>();

  useEffect(() => {
    setFriendData(route.params.friend);
    updateEvents();
  }, []);

  useEffect(() => {
    setDate(new Date(Date.now()));
  }, []);

  const updateEvents = async () => {
    const evs = await getEvents(route.params.friend.id);
    evs.sort(
      (a, b) =>
        new Date(b.communication.date).getTime() -
        new Date(a.communication.date).getTime()
    );
    setEvents(evs);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  const [noteValue, setNoteValue] = useState<string>("note");

  const getColor = () => {
    count++;
    return count % 2 === 0 ? "#B6FA9E" : "#FCF9F9";
  };

  const handleAddNote = async () => {
    // Make API call, post note
    // Update state, adding the returned note.

    const note = await addFriendNote(friendData!.id, { text: noteValue });

    const update: Array<FriendType> = [...data.allFriends];
    const fr = update.find(
      (friend) => friend.id === friendData!.id
    ) as FriendType;
    if (!fr.notes) fr.notes = [];
    fr.notes.push(note);

    data.setAllFriends(update);

    hideModal();
  };

  function dayWithOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const updateFriends = async () => {
    const friend: FriendType = await getFriend(friendData?.id as number);
    const friendsCopy = [...data.allFriends];
    const index = friendsCopy.findIndex(
      (friend) => friend.id === friendData?.id
    );
    friendsCopy[index] = friend;
    data.setAllFriends(friendsCopy);
  };

  const updateRenderEvents = (ev: FullEvent) => {
    const newEvents = [...events, ev];
    newEvents.sort(
      (a, b) =>
        new Date(a.communication.date).getTime() -
        new Date(b.communication.date).getTime()
    );
    setEvents(newEvents);
  };

  const addCommunication = async () => {
    const comm = await postComm();

    comm.type === "Meet" &&
      updateRenderEvents({ communication: comm, event: null });

    updateFriends();
    hideModal();
    // Need to trigger a refetch. Or fetch one friend as update state.
  };

  const postComm = async (isMeet?: boolean): Promise<Communication> => {
    const comm = await postCommunication(friendData?.id as number, {
      date: date,
      type: isMeet ? "Meet" : commValue,
    });

    return comm;
  };

  const addEvent = async () => {
    setCommValue("Meet");

    try {
      const comm = await postComm(true);
      const id = comm.id as number;

      const event = await postEvent(id, {
        location: location,
        title: title,
      });

      updateRenderEvents({ communication: comm, event: event });
      const lastComms = friendData?.lastComms as LastComm[];
      const index = lastComms.findIndex(
        (c) => c.preference.mode === comm.type
      ) as number;

      if (
        lastComms[index] &&
        lastComms[index].lastCommunication.date < comm.date
      ) {
        const newFriendData: FriendType = {} as FriendType;
        Object.assign(newFriendData, friendData);
        newFriendData.lastComms[index].lastCommunication = comm;
        setFriendData(newFriendData);
      }
      updateLastComms(comm);
      updateFriends();
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    } finally {
      hideModal();
    }
  };

  const updateLastComms = (comm: Communication) => {
    const lastComms = friendData?.lastComms as LastComm[];
    const index = friendData?.lastComms.findIndex(
      (c) => c.preference.mode === comm.type
    ) as number;

    if (lastComms[index].lastCommunication.date < comm.date) {
      const newFriendData: FriendType = {} as FriendType;
      Object.assign(newFriendData, friendData);
      newFriendData.lastComms[index].lastCommunication = comm;
      setFriendData(newFriendData);
    }
  };

  const postUpdateEvent = async () => {
    const comm = currentEvent?.communication as Communication;
    const id = comm.id as number;

    const event = await postEvent(id, {
      location: location,
      title: title,
    });

    hideModal();
    setTitle("");
    setLocation("");
    setDate(new Date());
    updateEvents();
  };

  /* 
  /// DATEPICKER
  */

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const changeCommValue = (value: string) => {
    const val = value as CommType;
    setCommValue(val);
  };

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

  const renderDatePicker = (ev?: FullEvent) => {
    const dateForPicker =
      ev !== undefined ? new Date(ev.communication.date) : (date as Date);

    return (
      <View>
        <View>
          <Button onPress={showDatepicker}>Add Date</Button>
        </View>
        <TextInput
          disabled
          label="Date"
          value={dateForPicker.toDateString()}
          placeholderTextColor="black"
          autoComplete={false}
          style={{ marginTop: 10, marginBottom: 20 }}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateForPicker}
            display="default"
            mode="date"
            onChange={onChange}
          />
        )}
      </View>
    );
  };

  const renderModal = () => {
    if (currentModal === "note") {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <Headline>Add note for {friendData!.firstName}</Headline>
          <TextInput
            mode="outlined"
            label="Note"
            onChangeText={(value) => setNoteValue(value)}
            autoComplete={false}
            style={{ marginTop: 10 }}
          />
          <View style={styles.bottomButtons}>
            <Button
              mode="contained"
              style={[styles.bottomButton, { marginRight: 20 }]}
              onPress={handleAddNote}
            >
              Add Note
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
      );
    }

    if (currentModal === "comm") {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Headline style={{ marginBottom: 30 }}>Add Communication</Headline>
          <View>
            <RadioButton.Group
              onValueChange={(newValue) => changeCommValue(newValue)}
              value={commValue}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <RadioButton value="Meet" />
                  <Text>Meet</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <RadioButton value="Talk" />
                  <Text>Talk</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <RadioButton value="Write" />
                  <Text>Write</Text>
                </View>
              </View>
            </RadioButton.Group>
            {renderDatePicker()}
            <View style={styles.bottomButtons}>
              <Button
                mode="contained"
                style={styles.bottomButton}
                onPress={addCommunication}
              >
                Add
              </Button>
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
          </View>
        </Modal>
      );
    }
    if (currentModal === "event" || currentModal === "updateEvent") {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Headline>Add Event</Headline>
          {currentModal === "updateEvent"
            ? renderDatePicker(currentEvent)
            : renderDatePicker()}
          <TextInput
            label="Title"
            autoComplete={false}
            style={[styles.input, { marginTop: 30 }]}
            selectionColor="black"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
          <TextInput
            label="Location"
            placeholderTextColor="black"
            autoComplete={false}
            style={styles.input}
            value={location}
            onChangeText={(value) => setLocation(value)}
          />

          <View style={styles.bottomButtons}>
            {currentModal === "event" ? (
              <Button
                mode="contained"
                style={[styles.bottomButton, { marginRight: 20 }]}
                onPress={addEvent}
              >
                Add
              </Button>
            ) : (
              <Button
                mode="contained"
                style={[styles.bottomButton, { marginRight: 20 }]}
                onPress={postUpdateEvent}
              >
                Add
              </Button>
            )}
            <Button
              mode="contained"
              style={styles.bottomButton}
              onPress={hideModal}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      );
    }
  };

  const setModal = (type: string) => {
    setCurrentModal(type);
    showModal();
  };

  const updateEvent = (ev: FullEvent) => {
    setCurrentEvent(ev);
    setCurrentModal("updateEvent");
    showModal();
  };

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const showDialog = () => {
    setDialogVisible(true);
  };
  const hideDialog = () => setDialogVisible(false);

  const deleteDialog = () => {
    return (
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteFriend}>Delete</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  const handleDeleteFriend = async () => {
    try {
      const fid = friendData?.id as number;
      await deleteFriend(fid);
      const newFriends = [...data.allFriends];
      newFriends.splice(
        newFriends.findIndex((fr) => fr.id === fid),
        1
      );
      data.setAllFriends(newFriends);
      navigation.navigate("Friends");
    } catch (e) {
      console.log(e);
    }
  };

  const renderEvent = (ev: FullEvent, index: number) => {
    return ev.event ? (
      <TouchableOpacity key={index}>
        <View style={styles.card}>
          <Paragraph style={styles.para}>
            You saw {friendData?.firstName} on{" "}
            {new Date(ev.communication.date).toDateString()}
          </Paragraph>
          <Text style={styles.name}>"{ev.event.title}"</Text>
          <Paragraph style={styles.para}>at {ev.event.location}</Paragraph>
        </View>
      </TouchableOpacity>
    ) : (
      <View key={index} style={[styles.card, { backgroundColor: "#1685EC" }]}>
        <Text style={styles.para}>
          You met on {new Date(ev.communication.date).toDateString()}
        </Text>
        <Text style={styles.para}>You haven't added details yet</Text>
        <Button onPress={() => updateEvent(ev)}>Add Details</Button>
      </View>
    );
  };

  if (friendData) {
    return (
      <ScrollView style={styles.container}>
        <Portal>{renderModal()}</Portal>
        <View style={styles.mainBox}>
          <Avatar.Image
            source={{
              uri: friendData.profilePictureUrl || "http://10.0.2.2:3000/image",
            }}
            size={160}
            style={styles.image}
          />
          <Text style={styles.title}>
            {friendData.firstName} {friendData.lastName}
          </Text>
          <View style={styles.lastComms}>
            {friendData.lastComms.map((comm, index) => (
              <Text key={index} style={{ color: "white" }}>
                Last {comm.preference.mode}:{" "}
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {comm.lastCommunication.type === "Added"
                    ? "Not Since Adding"
                    : new Date(comm.lastCommunication.date).toDateString()}
                </Text>
              </Text>
            ))}
          </View>
          <View style={styles.noteBox}>
            <List.Accordion title="Don't forget:">
              <Text
                style={{
                  width: 300,
                  backgroundColor: getColor(),
                  padding: 10,
                  fontSize: 18,
                }}
              >
                Birthday: {dayWithOrdinal(friendData.birthDay)}{" "}
                {friendData.birthMonth}
              </Text>
              {friendData.notes?.map((note, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      width: 300,
                      backgroundColor: getColor(),
                      padding: 10,
                      fontSize: 18,
                    }}
                  >
                    {note.text}
                  </Text>
                );
              })}
              <Text
                style={{
                  width: 300,
                  backgroundColor: getColor(),
                  padding: 10,
                  fontSize: 18,
                }}
              >
                <Button icon="plus" onPress={() => setModal("note")}>
                  New
                </Button>
              </Text>
            </List.Accordion>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
            }}
          >
            <Button onPress={() => setModal("comm")}>Add Communication</Button>
            <Button onPress={() => setModal("event")}>Add Event</Button>
          </View>
        </View>
        <Headline
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          Past Meets:
        </Headline>
        <View>
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              width: "80%",
            }}
          >
            {events &&
              events
                .filter((ev) => ev.communication.type === "Meet")
                .map((ev, index) => renderEvent(ev, index))}
          </View>
        </View>
        <View
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 30 }}
        >
          {deleteDialog()}
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              height: 40,
              width: 200,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={showDialog}
          >
            <Headline style={{ color: "white" }}>Delete Friend</Headline>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  mainBox: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: 30,
    alignItems: "center",
  },
  container: {},
  title: {
    marginTop: 15,
    fontSize: 60,
    fontWeight: "700",
  },
  image: {},
  lastComms: {
    marginTop: 20,
    backgroundColor: "#3EB489",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    width: "80%",
  },
  noteBox: {
    marginTop: 30,
    width: 300,
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  bottomButton: {
    width: 150,
    backgroundColor: "#1685EC",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
  },
  card: {
    marginBottom: 40,
    width: "100%",
    backgroundColor: "rgba(62, 180, 137, 0.8)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  para: {
    color: "white",
    flexShrink: 1,
    marginTop: 10,
    fontSize: 18,
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
    color: "black",
  },
  input: {
    marginBottom: 20,
  },
});

export default Friend;
