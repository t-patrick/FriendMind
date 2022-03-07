const db = require('.');

const addFriendNote = async (req, res) => {

  try {
    
    const friend = await db.friend.findOne({where: {id: req.query.id}})
    const note = await friend.createFriendNote(req.body, {
      attributes: {
        exclude: ['id', 'FriendId']
      }
    });

    res.status(201).send(JSON.stringify(note));

  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }

}

const getFriendNotes = async (req, res) => {

  try {
    
    const friend = await db.friend.findOne({where: {id: req.body.friendId, UserId: req.body.userId}})
    const notes = await friend.getFriendNotes({});

    res.status(201).send(JSON.stringify(notes.map(note => note.text)));

  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString());
  }

}




module.exports = { addFriendNote, getFriendNotes }