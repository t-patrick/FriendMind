module.exports = (sequelize, DataTypes) => {
  const FriendNote = sequelize.define('FriendNote', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });

  return FriendNote;
}