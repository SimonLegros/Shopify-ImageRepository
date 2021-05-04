const fs = require('fs');

const userImagesBasePath = "./image_store";

let initDB = () => {
    const db = require("./models");
    const Role = db.role;
    const User = db.user;

    db.sequelize.sync({force: true}).then(() => {
        console.log("Sync DB");
        initData();
    });

    function initData() {
        Role.create({
            id: 1,
            name: "user"
        });
        User.create({
            uid: 1,
            username: "shopify",
            password: "$2y$10$lAXngkaTJBQvdRDw7ZNTIOZLEhU4BqsgzmhpyxYUYI.NqPuj5TJ6e"
        });
    }

    if(!fs.existsSync(userImagesBasePath)){
        fs.mkdirSync(userImagesBasePath);
    }
    if(!fs.existsSync(userImagesBasePath + "/shopify")){
        fs.mkdirSync(userImagesBasePath + "/shopify");
    }

};

module.exports = initDB;