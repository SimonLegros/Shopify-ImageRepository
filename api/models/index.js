const dbConfig = require("../config/db.config");
const authConfig = require("../config/auth.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig);
const bcrypt = require('bcryptjs');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

(async() => {
    await db.sequelize.sync({force: true});
    db.user.create({
            uid: 1,
            username: authConfig.defaultUser.username,
            password: bcrypt.hashSync(authConfig.defaultUser.password, bcrypt.genSaltSync(10))
    });
})();

module.exports = db;