let mongoose = require('mongoose')

let MemberSchema = new mongoose.Schema({
    //required: true -> will not create new user without required fields
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        name: { type: String, required: true },
        picture: { type: String, default: '' },
        memberSince: { type: Number, required: true },
        activeEnsemble: { type: Boolean, required: true },
    },
    resume:
        {
         type: mongoose.Schema.Types.ObjectId, ref: 'Resume'
        }
})

module.exports = mongoose.model('Member', MemberSchema)
