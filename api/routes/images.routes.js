let router = require('express').Router();
const controller = require("../controllers/images.controller");

router.get('/', controller.getPublicImages);

router.get('/private', controller.getAllMyImages);

router.post('/upload', controller.uploadImages);

module.exports = router;
