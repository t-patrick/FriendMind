const db = require('.');

const addCommunication = async (req, res) => {
  try {
    const comm = req.body;
    Object.assign(comm, {FriendId: req.query.id})
    const newComm = await db.communication.create(comm, { attributes: {
      exclude: ['UserId', 'id']
    }});

    res.status(201).send(JSON.stringify(newComm));
  } catch (e) {
    res.status(500).send(e.toString());
  }
}

const getCommunication = async (req, res) => {
  try {
    const comm = await db.communication.findOne({where: {id: req.query.id}});
    res.status(200).send(JSON.stringify(comm));
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

const postMeeting = async (req, res) => {
  try {
    const comm = await db.communication.findOne({where: {id: req.query.id}});
    const meeting = await comm.createMeeting(req.body);

    res.status(201).send(JSON.stringify(meeting));
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = [];
    const friend = await db.friend.findOne({where: {id: req.query.id}}); 
    const meetingComms = await friend.getCommunications({where: {type: 'Meet'}});
    console.log('all meeting comms', meetingComms)
    for (let comm of meetingComms) {
      const meet = await db.meeting.findOne({where: {CommunicationId: comm.id}});
      meetings.push({
        communication: comm,
        event: meet || null
      });
    }
    res.send(JSON.stringify(meetings));
  } catch (e) {
    res.send(e.toString())
  }
};

module.exports = { addCommunication, getCommunication, getMeetings, postMeeting }