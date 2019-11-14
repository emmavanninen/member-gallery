let mongoose = require('mongoose')

let ResumeSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    bio: {
        name: { type: String, required: true },
        title: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: Number, required: false },
        web: { type: String, required: false },
        gender: { type: String, required: false },
        height: { type: Number, required: false },
        weight: { type: Number, required: false },
        hair: { type: String, required: false },
        eyes: { type: String, required: false },
        vocal: { type: String, required: false },
    },
    skills:
        {
        education: { type: String, required: false },
        training: { type: String, required: false },
        skills: { type: String, required: false }
        },
    image: { type: String, default: '' },
    work: [
        {
            production: { type: String, required: false },
            role: { type: String, required: false },
            other: { type: String, required: false }
        },
        {
            production: { type: String, required: false },
            role: { type: String, required: false },
            other: { type: String, required: false }
        },
        {
            production: { type: String, required: false },
            role: { type: String, required: false },
            other: { type: String, required: false }
        },
    ]
})

module.exports = mongoose.model('Resume', ResumeSchema)
