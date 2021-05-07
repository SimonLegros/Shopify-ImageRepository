const bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};