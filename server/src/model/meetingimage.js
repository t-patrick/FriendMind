


module.exports = (sequelize, DataTypes) => {
  const MeetingImage = sequelize.define('MeetingImage', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });

  return MeetingImage;
}