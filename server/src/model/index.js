const { fn } = require("sequelize");
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
  User has many friends, friends only have one user
*/
db.user.hasMany(db.friend);
db.friend.belongsTo(db.user);

/* 
  Friends have multiple categories and vice versa
*/
// db.category.belongsToMany(db.friend, { through: 'FriendCategories', { onDelete: 'cascade' }});
// db.friend.belongsToMany(db.category, { through: 'FriendCategories'});

/* 
  Friend has many notes, notes only have one friend.
  You want to query by getting friends.getNotes
*/

db.friendnote.belongsTo(db.friend);
db.friend.hasMany(db.friendnote, { onDelete: 'cascade' });

/* 
  Communication
  Belongs to both user and friend.
*/

db.user.hasMany(db.communication, { onDelete: 'cascade' });
db.friend.hasMany(db.communication, { onDelete: 'cascade' });
db.communication.belongsTo(db.user, { onDelete: 'cascade' });
db.communication.belongsTo(db.friend, { onDelete: 'cascade' });



db.commpreference.belongsTo(db.friend, { onDelete: 'cascade' });
db.friend.hasMany(db.commpreference, { onDelete: 'cascade' }); 

/* 
Meeting associations
has a communication, to find the date.
has many meeting notes and images.
*/
db.meeting.belongsTo(db.communication, { onDelete: 'cascade' } );
db.communication.hasOne(db.meeting, { onDelete: 'cascade' });

db.meeting.hasMany(db.meetingnote, { onDelete: 'cascade' });
db.meetingnote.belongsTo(db.meeting, { onDelete: 'cascade' });

db.meeting.hasMany(db.meetingimage, { onDelete: 'cascade' });
db.meetingimage.belongsTo(db.meeting, { onDelete: 'cascade' }); 

(async () => {
  try {

    // await sequelize.sync({force: true});
    await sequelize.sync();

    // await db.user.create({
    //   email: 'email',
    //   firstName: 'Tim',
    //   lastName: 'Patrick',
    //   password: 'password'
    // })
    
  } catch (e) {
    console.log(e);
  }
})();

module.exports = db;
