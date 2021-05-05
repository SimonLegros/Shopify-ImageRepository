let router = require('express').Router();
const controller = require("../controllers/images.controller");
let multer = require('multer');
let upload = multer({dest: '.'});

router.post('/upload', controller.uploadImages);

module.exports = router;
