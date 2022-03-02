


module.exports = (sequelize, DataTypes) => {
  const CommunicationPreference = sequelize.define('CommunicationPreference', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeunit: {
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