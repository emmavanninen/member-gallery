// TODO: check for full name (includes ' '?)

const memberValidation = (req, res, next) => {
    req.checkBody('name', 'Full name is required').notEmpty()
    req.checkBody('email', 'Proper email is required').isEmail()
    req.flash('errorValidate', req.validationErrors())

    next()
}

module.exports = memberValidation