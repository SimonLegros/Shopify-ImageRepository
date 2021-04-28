var express = require('express');
var router = express.Router();
const controller = require("../controllers/auth.controller");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("signin", controller.signin);

module.exports = router;
