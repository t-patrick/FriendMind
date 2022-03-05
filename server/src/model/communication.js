module.exports = (sequelize, DataTypes) => {
  const Communication = sequelize.define('Communication', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { timestamps: false });

  return Communication;
}