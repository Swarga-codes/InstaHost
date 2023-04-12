const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const CheckLogin = require('../middlewares/CheckLogin');
const POSTS=mongoose.model('POSTS');
router.get('/posts',CheckLogin,(req,res)=>{
    POSTS.find()
    .sort({_id:-1})
    .populate("postedBy","_id name userName photo")
    .populate("comments.postedBy","_id name userName")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err));
})
router.get('/profilepage',CheckLogin,(req,res)=>{
    POSTS.find({postedBy:req.user._id})
    .populate('postedBy','_id userName')
    .populate('comments.postedBy','_id name userName')
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err));
})
router.post('/createPosts',CheckLogin,(req,res)=>{
    const{body,pics}=req.body
    if(!body || !pics){
        return res.status(422).json({error:'Please include all the fields'});
    }
console.log(req.user)
const posts=new POSTS({
    body,
    photo:pics,
    postedBy:req.user
})
posts.save().then((data)=>{
   return res.json({posts:data})
}).catch(err=>console.log(err));
})
router.put('/likes',CheckLogin,(req,res)=>{
    POSTS.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate('postedBy','_id name userName photo')
    .then(result=>{res.json(result);}) 
    .catch(err=>res.status(422).json({error:err}))
});
router.put('/unlikes',CheckLogin,(req,res)=>{
    POSTS.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate('postedBy','_id name userName photo')
    .then(result=>{res.json(result)})
    .catch(err=>res.status(422).json({error:err}))
});
router.put('/comments',CheckLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    };
    POSTS.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment},
    },{
        new:true
    })
    .populate('postedBy','_id name userName')
    .populate("comments.postedBy","_id name userName photo")
    .then(result=>res.json(result))
    .catch(err=>res.status(422).json({error:err}))
})
router.delete('/delposts/:postId',CheckLogin,(req,res)=>{
    POSTS.findOne({_id:req.params.postId})
    .populate('postedBy','_id')
  .then(data=>{
    if(!data){
        return res.status(422).json({error:data});
    }
    if(req.user._id.toString()==data.postedBy._id.toString()){
      data.deleteOne({_id:req.params.postId})
        return res.json({message:'Post Deleted successfully'})
        
    }
  }).catch(err=>res.status(422).json({error:err}))
    
})
 router.get('/followingpostsonly',CheckLogin,(req,res)=>{
    POSTS.find({postedBy:{$in:req.user.following}})
    .sort({_id:-1})
    .populate('postedBy','_id name userName photo')
    .populate('comments.postedBy','_id name userName')
    .then(results=>res.json(results))
    .catch(err=>res.staus(422).json({error:err}))
 })
module.exports=router