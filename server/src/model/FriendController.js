
const db = require('.');
const friend = require('./friend');

/* 
  let model = db.friend;
    console.log(Object.keys(model));
    for (let assoc of Object.keys(model.associations)) {
      for (let accessor of Object.keys(model.associations[assoc].accessors)) {
      console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
      }
    } 

*/

const addFriend = async (req, res) => {
    try {
      const user = await db.user.findOne({ where: {id: req.query.id}});
      const friend = await user.createFriend(req.body.friend);

      const prefs = await addCommPreferences(friend, req.body.preferences);
      const comm = await addCommunication(friend, {type: 'Added', date: new Date(Date.now()), UserId: req.query.id});

      const lastComms = prefs.map(pref => {
        return {
          preference: pref,
          lastCommunication: comm
        }
      }
      );
      
      friend.lastComms = lastComms;

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


/* 
  TODO: Make these not horribly un-DRY!
*/
const getFriend = async (req, res) => {
  try {
    const friend = await db.friend.findOne({where: {id: req.query.friendId}});
    const friendForAPI = {}

    Object.assign(friendForAPI, friend.dataValues);
    friendForAPI.lastComms = [];
    const notes = await friend.getFriendNotes();
    friendForAPI.notes = notes || [];

    
    const preferences = await friend.getCommunicationPreferences();
    if (preferences.length < 1) {
      req.status(200).send(JSON.stringify(friendForAPI));
      return;
    }
    
    for (let preference of preferences) {
      
      const allCommsByMode = await db.communication.findAll({ where: {
        FriendId: friend.id,
        type: preference.mode
      }});
      
      let mostRecent;
      if (allCommsByMode.length < 1) {
        mostRecent = await db.communication.findOne({where: {FriendId: friend.id, type: 'Added'}});
      } else {
        mostRecent = allCommsByMode.reduce((prev, curr) => {
          return (prev.date > curr.date) ? prev : curr
        });
      }
      
      //  await db.communication.findOne({where: {FriendId: friend.id, type: 'Added'}})
      friendForAPI.lastComms.push({
        preference: preference.dataValues,
        lastCommunication: mostRecent.dataValues
      });
    }
    res.status(200).send(JSON.stringify(friendForAPI));
  } catch (error) {
    res.status(500).send(error);
  }
}

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

        const allCommsByMode = await db.communication.findAll({
          attributes: { exclude: ['FriendId', 'UserId'] }, where: {
            FriendId: friend.id,
            type: preference.mode
          }});



        const mostRecent = allCommsByMode.length > 0 ? allCommsByMode.reduce((prev, curr) => {
          return (prev.date > curr.date) ? prev : curr;
        }) : await db.communication.findOne({where: {FriendId: friend.id, type: 'Added'}});
        
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

module.exports = {addFriend, addCommPreferences, getFriends, getFriend}