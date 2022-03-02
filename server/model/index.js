require('dotenv').config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.category = require("./category.js")(sequelize, Sequelize.DataTypes);
db.friend = require("./friend.js")(sequelize, Sequelize.DataTypes);
db.friendnote = require("./friendnotes.js")(sequelize, Sequelize.DataTypes);
db.user = require("./user.js")(sequelize, Sequelize.DataTypes);
db.meeting = require("./meeting.js")(sequelize, Sequelize.DataTypes);
db.meetingnote = require("./meetingnote.js")(sequelize, Sequelize.DataTypes);
db.meetingimage = require("./meetingimage.js")(sequelize, Sequelize.DataTypes);
db.communication = require("./communication.js")(sequelize, Sequelize.DataTypes);
db.commpreference = require('./communcationpreference.js')(sequelize, Sequelize.DataTypes);


/* 
  User has many friends, friends only have one user, this isn't facebook after all.
*/
db.user.hasMany(db.friend);
db.friend.belongsTo(db.user);

/* 
  Friends have multiple categories and vice versa
*/
db.category.belongsToMany(db.friend, { through: 'FriendCategories'});
db.friend.belongsToMany(db.category, { through: 'FriendCategories'});

/* 
  Friend has many notes, notes only have one friend.
  You want to query by getting friends.getNotes
*/

db.friendnote.belongsTo(db.friend);
db.friend.hasMany(db.friendnote);

/* 
  Communication
  Belongs to both user and friend.
*/

db.user.hasMany(db.communication);
db.friend.hasMany(db.communication);
db.communication.belongsTo(db.user);
db.communication.belongsTo(db.friend);



db.commpreference.belongsTo(db.friend);
db.friend.hasMany(db.commpreference); 

/* 
Meeting associations
has a communication, to find the date.
has many meeting notes and images.
*/
db.meeting.belongsTo(db.communication);


db.meeting.hasMany(db.meetingnote);
db.meetingnote.belongsTo(db.meeting);

db.meeting.hasMany(db.meetingimage);
db.meetingimage.belongsTo(db.meeting); 

(async () => {
  await sequelize.sync();
})();

module.exports = db;
