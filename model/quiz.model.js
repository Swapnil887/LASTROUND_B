

const mongoose = require("mongoose")

const quizSchema = mongoose.Schema(
        {
        "creator": String,
        "title": String,
        "description": String,
        "questions": [
            {
                "title": String,
                "answerOptions": [],
                "correctOptions": []
              }
        ],
        "leaderBoard": [{email: {type: String},score: {type: Number}}]
})


const Quizmodel = mongoose.model("quiz",quizSchema)

module.exports = {Quizmodel}