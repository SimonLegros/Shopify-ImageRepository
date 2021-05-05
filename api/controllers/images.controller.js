const db = require("../models");
const User = db.user;
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const makeDir = require('make-dir');
const fs = require("fs");
const path = require("path");

const Op = db.Sequelize.Op;

const UPLOAD_BASE_PATH = "./uploads";

exports.uploadImages = catchAsync(async(req, res, next) => {
    if(!req.files){
        return res.status(500).send("No File uploaded");
    }
    let imagesFile = req.files.file;
    let username = req.body.username;
    let privacy = req.body.privacy? "private": "public";
    let newPath = `${UPLOAD_BASE_PATH}/${privacy}/${username}`;
    makeDir(newPath).then(path => {
        let reformatedImageName = imagesFile.name.replace(/ /g, "_");
        imagesFile.mv(`${newPath}/${reformatedImageName}`, (err) => {
            if(err) {
                console.log(err);
                return res.status(500).send(err);
            }
            // res.status(200).json({file: imagesFile});
            res.status(200).sendFile(`${newPath}/${reformatedImageName}`, {root: '.'});
        });
    });
});

exports.getPublicImages = catchAsync(async(req, res, next) => {
    const result = getAllFiles("./uploads/public");
    res.status(200).send({images: result })
});

exports.getPrivateImages = catchAsync(async(req, res, next) => {
    console.log(req.cookies);
});

const getAllFiles = function(dirPath, subdirs, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  subdirs = subdirs || "";

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      subdirs = path.join(subdirs, "/", file);
      arrayOfFiles = getAllFiles(dirPath + "/" + file, subdirs, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(subdirs, "/", file))
    }
  })

  return arrayOfFiles
};
