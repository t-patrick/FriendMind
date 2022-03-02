/* 
  The communication log. 
  This is how the app will know when the last time was
  obviously has friend.
*/

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