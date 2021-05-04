let router = require('express').Router();
const controller = require("../controllers/images.controller");
let multer = require('multer');
let upload = multer({dest: '.'});

/* GET images listing. */
router.get('/', function(req, res, next) {
  res.json({"images": "text"})
});

router.post('/upload', controller.uploadImages);

module.exports = router;
