const db = require("../models");
const User = db.user;
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const makeDir = require('make-dir');

const Op = db.Sequelize.Op;

const UPLOAD_BASE_PATH = "./uploads";

exports.uploadImages = (req, res, next) => {
    if(!req.files){
        return res.status(500).send("No File uploaded");
    }
    let imagesFile = req.files.file;
    let username = "bo";
    let visibility = "public";
    let newPath = `${UPLOAD_BASE_PATH}/${username}/${visibility}`;
    makeDir(newPath).then(path => {
        imagesFile.mv(`${newPath}/${imagesFile.name}`, (err) => {
            if(err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(200).json({file: imagesFile});
        });
    });
};
