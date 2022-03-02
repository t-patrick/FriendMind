const db = require('.');

async function addUser () {
  try {
    const tim = await db.user.create({ 
      email: 'haha2@gmail.com',
      firstName: 'Tim2',
      lastName: 'Patrick2',
      password: 'notreallytho2'
    }); 
  } catch (e) {
    console.log(e);
  }

}

async function addFriend (id) {
  try {
    const user = await db.user.findOne({ where: {id: id}});
    await user.createFriend({
      firstName: 'Friendooo'
    });

  } catch (e) {
    console.log(e);
  }
}

async function addMeetingData (meeting) {
  try {
    let a = await db.meeting.findOne({id: 1});
    console.log(a);
    console.log(Object.keys(a));
  } catch (e) {
    console.log(e);
  }
}
addMeetingData();
async function addMeeting (userId, friendId, data) {
  /* 
    1. Get Friend
    2. Create Communication
    3. Create Meeting
    4. Set Communication
    5. Check for meeting notes
      a) If there is, create meeting notes from meeting
      b) If not continue

  */
  try {
    const friend = await db.friend.findOne({ where: {UserId: userId, id: friendId}});

    const comm = await friend.createCommunication({
      UserId: userId,
      type: 'meeting',
      date: data.date
    });

    const meeting = await db.meeting.create(data.meeting);

    await meeting.setCommunication(comm);

  } catch (e) {
    console.log(e);
  }
}



const meetingData = {
  userId: 1,
  friendId: 1,
  date: new Date(Date.now()),
  location: 'somewhere',
  meetingNotes: [
    'It was fun',
    'Learned about cool band- The Beatles'
  ]
}
