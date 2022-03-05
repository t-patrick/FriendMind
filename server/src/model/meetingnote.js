


module.exports = (sequelize, DataTypes) => {
  const MeetingNote = sequelize.define('MeetingNote', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });

  return MeetingNote;
}