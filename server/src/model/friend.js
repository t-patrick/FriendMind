/* 
  Structure of this is interesting
*/

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    birthMonth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { timestamps: false });

  return Friend;

}