'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('bot_users', {
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    course: DataTypes.STRING,
    time: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};