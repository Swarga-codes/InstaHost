const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const data=require('../data');
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const { Secret_key } = require('../keys');
const CheckLogin = require('../middlewares/CheckLogin');
router.use(cors())
// router.get('/',(req,res)=>{
//     res.json(data);
// })
router.get('/about',(req,res)=>{
    res.json("I am about")
})
router.get('/createPosts',CheckLogin,(req,res)=>{
console.log('hello auth..');
})
//signup user
router.post('/signup',(req,res)=>{
    const {email,name,userName,password}=req.body;
    if(!email || !name || !userName || !password){
        return res.status(422).json({error:'Please fill out the required fields'});
    }
    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
if(savedUser){
    return res.status(422).json({error:'User already exists'});
}
   bcrypt.hash(password,12).then((hashedPassword)=> {
const user=new USER({
    email,
    name,
    userName,
    password:hashedPassword
});
user.save()
.then(user=>{res.json({message:'new user added...'})})
.catch((err)=>{console.log(err)});
})
})
})
//sign in user
router.post("/signin",(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
    return res.status(422).json({error:'The fields cannot be empty'});
   }
   USER.findOne({email:email}).then((savedUser)=>{
    if(!savedUser){
        return res.status(404).json({error:'User not found!!'});
    }
   bcrypt.compare(password,savedUser.password).then((match)=>{
    if(match){
    //    return res.status(200).json({message:'User authenticated successfully'});
    const token=jwt.sign({_id:savedUser.id},Secret_key);
    const {_id,email,userName,name}=savedUser
    res.status(200).json({token,user:{_id,userName,email,name}});
    console.log({token,user:{_id,userName,email,name}});
    }else{
    return res.status(422).json({error:'Incorrect password'});
    }
   }).catch(err=> console.log(err));
   })
})
module.exports=router