let mongoose = require('mongoose')

let MemberSchema = new mongoose.Schema({
    //required: true -> will not create new user without required fields
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        name: { type: String, required: true },
        picture: { type: String, default: '' },
    },
    resume: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'resume' },
            memberSince: { type: Number, default: '' }
        }
    ]
})

module.exports = mongoose.model('Member', MemberSchema)
