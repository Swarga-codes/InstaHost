const jwt=require('jsonwebtoken');
const{Secret_key}=require('../keys')
const mongoose=require('mongoose');
const USER=mongoose.model('USER');
module.exports = (req,res,next)=>{
    const{authorization}=req.headers;
    if(!authorization){
        res.status(401).json({error:'you must have logged in!'});
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,Secret_key,(err,payload)=>{
        if(err){
        return res.status(401).json({error:'you must have logged in!'});
        }
        const{_id}=payload;
        USER.findById(_id).then(userData=>{
            req.user=userData;
            // console.log(userData);
            next();
        })
    })
    
}