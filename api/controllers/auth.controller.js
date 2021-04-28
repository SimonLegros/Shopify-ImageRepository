const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

exports.signin = (req, res) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({ msg: "User not found"});
        }
        let valid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!valid){
            return res.status(401).send({
                token: null,
                msg: "Invalid Password" 
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        });
    })
    .catch(err => {
        res.status(500).send({ msg: err.message });
    });

};