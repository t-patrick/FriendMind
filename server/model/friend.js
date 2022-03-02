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
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { timestamps: false });

  return Friend;

}