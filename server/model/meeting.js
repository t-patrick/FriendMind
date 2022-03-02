


module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { timestamps: false });

  return Meeting;
}