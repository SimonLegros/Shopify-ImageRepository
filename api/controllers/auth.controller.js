const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

const Op = db.Sequelize.Op;

const createBareToken = id => {
    return jwt.sign({ id }, config.secret, {
           expiresIn: config.expiresIn
    });
}

const createUserToken = async(user, code, req, res) => {
    const token = createBareToken(user.uid);

    let d = new Date();
    d.setDate(d.getDate() + 30);
    res.cookie('jwt', token, {
       expires: d,
       httpOnly: true,
       secure: false,
       sameSite: 'strict'
    });
    user.password = undefined;
    res.status(code).json({
       status: 'success',
       token,
       data: {
          user
        }
      });
}

exports.loginUser = catchAsync(async(req, res, next) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return next(new AppError('Please provide a username and password!', 400));
    }
    
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user && validatePassword(user, password)) {
        await createUserToken(user, 200, req, res);
    } else {
        return next(new AppError('Incorrect username or password', 401));
    }
});

validatePassword = (user, password) => {
    return bcrypt.compareSync(
        password,
        user.password
    );
};

exports.registerUser = async(req, res, next) => {
    try {
        if(req.body.password !== req.body.passwordConfirm) {
            throw new Error("Both passwords does not match");
        }
        const newUser = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        });
        await createUserToken(newUser, 201, req, res);
    } catch(err) {
        next(err);
    }
};

exports.checkUser = catchAsync(async(req, res, next) => {
    if(!req.cookies || !req.cookies.jwt){
        return res.status(401).send("Unauthorized");
    }
    let currentUser = await this.getCurrentUser(req.cookies.jwt);
    if(currentUser == null){
        return res.status(401).send("Unauthorized");
    }
   return res.status(200).send({ currentUser });
});

exports.getCurrentUser = async(token) => {
    if (token) {
        const decoded = await promisify(jwt.verify)(token, config.secret);
        let user = await User.findOne({
            where: {
                uid: decoded.id
            }
        });
        return user;
    }
    return null;
};

exports.logoutUser = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });    
    res.status(200).send('user is logged out');
});

