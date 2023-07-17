const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    "username":String,
    "email":String
})

const Usermodel = mongoose.model("user",userSchema)

module.exports = {Usermodel}
