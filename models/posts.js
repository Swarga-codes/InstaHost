const mongoose=require('mongoose');
const USER=mongoose.model('USER');
const {ObjectId}=mongoose.Schema.Types;
const postsSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
      require:true
    },
    likes:[{
        type:ObjectId,
        ref:"USER"
    }],
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId,ref:"USER"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"USER"
    }
})
mongoose.model('POSTS',postsSchema);