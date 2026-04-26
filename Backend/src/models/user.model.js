const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username is mustbe unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is must be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;