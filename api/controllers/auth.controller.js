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
        console.log("User Found: ", user);
        let valid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!valid){
            console.log("INVALID PASSWORD");
            return res.status(401).send({
                token: null,
                msg: "Invalid Password" 
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        });
        return res.status(200).send({
            token: token,
            msg: "Authentified"
        })
    })
    .catch(err => {
        res.status(500).send({ msg: err.message });
    });

};