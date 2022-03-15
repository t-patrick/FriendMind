const db = require(".");
const moment = require("moment");

const addCommunication = async (req, res) => {
  try {
    const comm = req.body;
    Object.assign(comm, { FriendId: req.query.friendId, UserId: req.query.id });
    const newComm = await db.communication.create(comm);

    res.status(201).send(JSON.stringify(newComm));
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

const getCommunication = async (req, res) => {
  try {
    const comm = await db.communication.findOne({
      where: { id: req.query.id },
    });
    res.status(200).send(JSON.stringify(comm));
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

const postMeeting = async (req, res) => {
  try {
    const comm = await db.communication.findOne({
      where: { id: req.query.id },
    });
    const meeting = await comm.createMeeting(req.body);

    res.status(201).send(JSON.stringify(meeting));
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = [];
    const friend = await db.friend.findOne({ where: { id: req.query.id } });
    const meetingComms = await friend.getCommunications({
      where: { type: "Meet" },
    });
    for (let comm of meetingComms) {
      const meet = await db.meeting.findOne({
        where: { CommunicationId: comm.id },
      });
      meetings.push({
        communication: comm,
        event: meet || null,
      });
    }
    res.send(JSON.stringify(meetings));
  } catch (e) {
    res.send(e.toString());
  }
};

const populateReminisce = async (req, res) => {
  // Get all events
  // filter through the ones that match the criteria.

  try {
    const user = await db.user.findOne({ where: { id: req.query.id } });

    const comms = await user.getCommunications({ where: { type: "Meet" } });
    const keep = comms.filter((event) => relevantDate(event.date));
    const events = [];
    for (let comm of keep) {
      if (!(await comm.getMeeting())) break;
      console.log("comm", comm);
      const event = await db.meeting.findOne({
        where: { CommunicationId: comm.dataValues.id },
      });
      if (!event) return;

      const friend = await db.friend.findOne({ where: { id: comm.FriendId } });

      events.push({
        communication: comm,
        event,
        friend,
      });
    }

    res.status(200).send(JSON.stringify(events));
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

/* 
3 days
7 days
21 days
60 days
150 days
365 days
*/

const relevantDate = (date) => {
  const arr = [-3, -7, -21, -60, -150, -365];
  const d = moment(date);
  console.log(d.diff(new Date(), "days"));
  const diff = d.diff(new Date(), "days");

  if (arr.includes(diff) || (Math.abs(diff) % -2 === 0 && diff !== 0))
    return true;
  return false;
};

/* 
  
*/

module.exports = {
  addCommunication,
  getCommunication,
  getMeetings,
  postMeeting,
  populateReminisce,
};
