const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    followers:[{type:ObjectId,ref:"USER"}],
    following:[{type:ObjectId,ref:"USER"}]
})
mongoose.model("USER",userSchema);