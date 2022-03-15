/* 
  Testing file for database models. Will reuse logic in controllers.
*/


/*    
Very useful trick to figure out association mixins.

let model = db.meeting;
    console.log(Object.keys(model));
    for (let assoc of Object.keys(model.associations)) {
      for (let accessor of Object.keys(model.associations[assoc].accessors)) {
        console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
      }
    } 
    
*/

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
      firstName: 'Friendooo',
      profilePictureUrl: 'user1img.jpg'
    });
    
  } catch (e) {
    console.log(e);
  }
}


async function getFriend(friendId) {
  const friend = await db.friend.findOne({where: {id: friendId}})
  return friend;
}

async function addMeetingData (notes, meeting) {
  try {
    let a = await db.meeting.findOne({id: 5});
 

    notes.forEach(async note => {
      let newNote = await db.meetingnote.create({text: note});
      await a.addMeetingNote(newNote);
    })

  } catch (e) {
    console.log(e);
  }
}
// addMeetingData(['It was so damn fun', 'he is a funny guy']);
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
    const friend = await db.meeting.findOne({ where: {UserId: userId, id: friendId}});

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

module.exports = { getFriend }
