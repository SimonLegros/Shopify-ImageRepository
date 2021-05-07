const db = require("../models");
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const makeDir = require('make-dir');
const fs = require("fs");
const path = require("path");
const authController = require('./auth.controller');

const Op = db.Sequelize.Op;

const UPLOAD_BASE_PATH = "./uploads";

exports.uploadImages = catchAsync(async (req, res, next) => {
    if (!req.files) {
        return res.status(500).send("No File uploaded");
    }
    if(req.body.token == null) {
        return res.status(401).send("Unauthorized");
    }
    const user = await authController.getCurrentUser(req.body.token);
    if(!user){
        return res.status(401).send("Unauthorized");
    }

    let imagesFiles = req.files['files[]'];
    if (!Array.isArray(imagesFiles)) {
        imagesFiles = [imagesFiles];
    }
    let privacy = req.body.privacy === "false" ? "public" : "private";
    let newPath = `${UPLOAD_BASE_PATH}/${privacy}/${user.username}`;
    let error = null;
    makeDir(newPath).then(path => {
        imagesFiles.forEach((file) => {
            let reformatedImageName = file.name.replace(/ /g, "_");
            file.mv(`${newPath}/${reformatedImageName}`, (err) => {
                if (err) {
                    console.log(err);
                    error = err;
                }
            });
        });
        if (error) return res.status(500).send(error);
        else res.status(200).json({ message: "Image(s) uploaded succesfully!" });
    });
});

exports.getPublicImages = catchAsync(async (req, res, next) => {
    const result = getAllFiles("./uploads/public");
    res.status(200).send({ images: result })
});

exports.getAllMyImages = catchAsync(async (req, res, next) => {
    if(!req.cookies || !req.cookies.jwt){
        return res.status(401).send("Unauthorized");
    }
    let user = await authController.getCurrentUser(req.cookies.jwt);
    if (!user) {
        return res.status(401).send("Unauthorized");
    }

    const publicPath = `./uploads/public/${user.username}`;
    const privatePath = `./uploads/private/${user.username}`;
    const publicImages = getAllFiles(publicPath);
    const privateImages = getAllFiles(privatePath);

    let files = [];
    if(publicImages){
        publicImages.forEach(imagePath => {
            const data = fs.readFileSync(`${publicPath}${imagePath}`, { encoding: 'base64' });
            files.push({
                filename: imagePath,
                private: "False",
                data: `data:image/png;base64,${data}`
            });
        });
    }
    if(privateImages) {
        privateImages.forEach(imagePath => {
            const data = fs.readFileSync(`${privatePath}${imagePath}`, { encoding: 'base64' });
            files.push({
                filename: imagePath,
                private: "True",
                data: `data:image/png;base64,${data}`
            });
        });
    }
    return res.json({ images: files });
});

const getAllFiles = function (dirPath, subdirs, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) {
        return null;
    }

    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []
    subdirs = subdirs || "";

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            subdirs = path.join(subdirs, "/", file);
            arrayOfFiles = getAllFiles(dirPath + "/" + file, subdirs, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(subdirs, "/", file))
        }
    })

    return arrayOfFiles
};
