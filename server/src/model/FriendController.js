const res = require('express/lib/response');
const db = require('.');
const friend = require('./friend');

/* 
Priority:
  1. Add Friend [x]
    a) find user
    b) add friend
    c) add Commpreferences
    d) add 'Added' Communication
  2. Get Friends [x]
    Below but more elegant if you will.
  3. Add Friend Notes
  4. Get Friend Notes
  4. Add Meeting
    a) Add meeting
    b) Add meeting notes
  5. Get Meetings
  6. Modify and Delete versions of all of the above.
  
  Birthdays can be a front end routine


      let model = db.friend;
       console.log(Object.keys(model));
        for (let assoc of Object.keys(model.associations)) {
          for (let accessor of Object.keys(model.associations[assoc].accessors)) {
          console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
          }
        } 

        export type CommPreference = {
  mode: 'Write' | 'Talk' | 'Meet' | 'Added'
  timeUnit: 'Days' | 'Weeks' | 'Months' | 'Years';
  amount: number;
}

Model.findAll({
  attributes: { include: ['id'] }
});

Model.findAll({
  attributes: { exclude: ['createdAt'] }
});
*/

/* 
  Add friend
*/

const addFriend = async (req, res) => {
    try {
      const user = await db.user.findOne({ where: {id: req.query.id}});
      const friend = await user.createFriend(req.body.friend);

      const prefs = await addCommPreferences(friend, req.body.preferences);
      const comm = await addCommunication(friend, {type: 'Added', date: new Date(Date.now())});

      const lastComms = prefs.map(pref => {
        return {
          preference: pref,
          lastCommunication: comm
        }
      }
      );

      console.log('before', friend);
      
      friend.lastComms = lastComms;
      console.log('after ', friend);

      const friendForClient = Object.assign({}, friend.dataValues);
      friendForClient.lastComms = lastComms;
      
      res.status(201).send(JSON.stringify(friendForClient));
      
    } catch (e) {
      console.log('error', e);
    }
  }

  const addCommPreferences = async (friend, preferences) => {
    const prefs = [];
    try {
      for (let preference of preferences) {
        const pref = await friend.createCommunicationPreference(preference);
        prefs.push(pref);
      }
      return prefs;
    } catch (e) {
      console.log(e);
    }
  }

const addCommunication = async (friend, communication) => {
  try {
    const comm = await friend.createCommunication(communication);
    return comm;
  } catch (e) {
    return undefined;
  }
}

/* 
  GET FRIENDS
*/

const getFriends = async (req, res) => {
  try {
    const friends = await _getFriends(req.query.id);
    res.status(200).send(JSON.stringify(friends));
  } catch (error) {
    res.status(500).send(error);
  }
}

const _getFriends = async (userId) => {

    try {

      const friendsForAPI = [];
      const friends = await db.friend.findAll({where: {UserId: userId}});
      
      for (let friend of friends) { 
      const friendForAPI = {}
      Object.assign(friendForAPI, friend.dataValues);
      friendForAPI.lastComms = [];
      
      const preferences = await friend.getCommunicationPreferences({
        attributes: { exclude: ['FriendId'] }
      });
      if (preferences.length < 1) {
        friendsForAPI.push(friendForAPI);
        break;
      }
      
      for (let preference of preferences) {
        // get comms
        // friendID, type, then the max of that
        const allCommsByMode = await db.communication.findAll({
          attributes: { exclude: ['FriendId', 'UserId'] },
          $or: [{
            FriendId: friend.id,
            type: preference.mode
          },
          {
            FriendId: friend.id,
            type: 'Added'
          }]
        })

        const mostRecent = allCommsByMode.reduce((prev, curr) => {
          return (prev.date > curr.date) ? prev : curr;
        });
        
        friendForAPI.lastComms.push({
          preference: preference,
          lastCommunication: mostRecent
        });
      }
        const notes = await friend.getFriendNotes();
        friendForAPI.notes = notes;


        friendsForAPI.push(friendForAPI);

    } 
    
    
    
    return friendsForAPI;
  } catch (e) {
    console.log('error', e)
  }
  }


  
  
  // const getFriends = async (req, res) => {
    //   const friendsForAPI = [];
    //   const friends = await db.friend.findAll({where: {userId: req.body}});
  
//   for (let friend of friends) {
//     const friendForAPI = {}
//     Object.assign(friendForAPI, friend);

//     const preferences = await db.preferences.findAll({FriendId: friend.id});

//     for (let preference of preferences) {
//       // get comms
//         // friendID, type, then the max of that
//       const allCommsByMode = await db.communication.findAll({
//         $or: [{
//           friendId: friend.id,
//           mode: preference.mode
//         },
//         {
//           friendId: friend.id,
//           mode: 'Added'
//         }]
//       });

//       const mostRecent = allCommsByMode.reduce((prev, curr) => {
//         return (prev.date > curr.date) ? prev : current;
//       });

//       friendForAPI.lastComms.push({
//         preference: preference,
//         lastCommunication: mostRecent
//       });
//     }
//     friendsForAPI.push(friendForAPI);
//   }
//   return friendsForAPI;
// }

module.exports = {addFriend, addCommPreferences, getFriends}