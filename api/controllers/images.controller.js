const db = require("../models");
const User = db.user;
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
let multer = require('multer');

const Op = db.Sequelize.Op;

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '.')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

let upload = multer({storage: storage}).single('file');

exports.uploadImages = (req, res) => {
    console.log(req.selectedFile);
    upload(req, res, function(err) {
        if (err) {
            return res.status(500).json(err);
        }
        console.log(req.file);
        return res.status(200).send(req.file);
    });
};
