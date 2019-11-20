const express = require('express');
const router = express.Router();
const registerValidation = require('./utils/registerValidation')
const controllers = require('../controllers/controllers');
const Member = require('./models/Member')


router.get('/register-new-member', (req, res) => {
    res.render('admin/register-user')
})

router.post('/register-new-member', registerValidation, controllers.registerNewMember)


module.exports = router;