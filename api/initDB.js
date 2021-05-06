let initDB = () => {
    const config = require("./config/auth.config");
    const bcrypt = require('bcryptjs');
    const db = require("./models");
    const Role = db.role;
    const User = db.user;

    db.sequelize.sync({force: true}).then(() => {
        console.log("Sync DB");
        initData();
    });

    function initData() {
        User.create({
            uid: 1,
            username: config.defaultUser.username,
            password: bcrypt.hashSync(config.defaultUser.password, bcrypt.genSaltSync(10))
        });
    }

};

module.exports = initDB;