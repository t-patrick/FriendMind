
module.exports = (sequelize, DataTypes) => {
  const CommunicationPreference = sequelize.define('CommunicationPreference', {
    mode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeUnit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false });

  return CommunicationPreference;
}