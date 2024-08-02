const passportLocalMongoose = require("passport-local-mongoose")
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:String,
    email :{
        type: String,
        required : true,
        unique : true
    }
})

userSchema.plugin(passportLocalMongoose)
module.exports =  mongoose.model("User", userSchema)