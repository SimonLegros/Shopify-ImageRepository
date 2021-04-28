const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            msg: "No token provided"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                msg: "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJWT = {
    verifyToken: this.verifyToken
};
module.exports = authJWT;