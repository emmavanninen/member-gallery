var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');



/* GET home page. */
router.get('/', controllers.getMainPageMembers);



module.exports = router;
