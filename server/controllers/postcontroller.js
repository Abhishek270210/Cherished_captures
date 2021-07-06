import PostMessage from '../models/postmodel.js';
import mongoose from 'mongoose';

export const getData=async(req,res)=>{
    const {page}=req.query;
    try {
        const limit=9;
        const startind=(page-1)*limit;
        const totalposts=await PostMessage.countDocuments();
        const totalpages=Math.ceil(totalposts/limit);
        const allposts=await PostMessage.find().sort({_id:-1}).limit(9).skip(startind);
        res.send({allposts,totalpages,currentpage:Number(page)});
    } catch (error) {
        // console.log("error in getting data ")
        console.log(error); 
    }
}

export const getParticularData=async(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    try {
        const currentPost=await PostMessage.findById(id);
        res.send(currentPost);
    } catch (error) {
        res.send(error);
    }
}

export const getSearchData=async(req,res)=>{
     const {title,tags}=req.query;
    //  console.log(req.query);
    try {
         const searchtitle = new RegExp(title, 'i');
        const posts=await PostMessage.find({ $or:[{title:searchtitle},{tags:{$in:tags.split(',')} }] });
        // console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUserPosts=async(req,res)=>{
    try {
        const currentUserPosts=await PostMessage.find({creator:req.userId});
        res.send(currentUserPosts);
    } catch (error) {
        res.send(error);
    }
}

export const postData=async(req,res)=>{
    const newpost=req.body;
    // console.log(newpost);
    const newPost= new PostMessage({...newpost,creator:req.userId,time:new Date().toISOString()});
    try {
      await newPost.save();
       res.send(newPost);
        // console.log("saving the new post !!");
    } catch (error) {
        // console.log("error in posting data ");
        console.log(error);
    }
}


export const deleteData=async(req,res)=>{
    const id=req.body.delete_id
    
    try {
       const deletedPost=await PostMessage.findByIdAndDelete(id);
       res.send(deletedPost);
        // console.log("deleting the post !!");  
    } catch (error) {
        // console.log("error while deleting !!");
        console.log(error);
    }
}

export const likeData=async(req,res)=>{
    const id=req.body.user_id;
    // console.log(id);
    try {
        const post=await PostMessage.findById(id);
        const ifalreadyliked=post.likes.findIndex((id) => id ===String(req.userId));
        if(ifalreadyliked==-1)
        {
            // liking..
            post.likes.push(req.userId);
        }
        else
        {
            // disliking...
          post.likes=post.likes.filter(id=>id!==String(req.userId));
        }
        const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
        res.send(updatedPost);
    } catch (error) {
        console.log(error);
    }
}

export const updateData=async(req,res)=>{
//    console.log("updating...");
    const updatedPost=req.body.updatedPost;
    // console.log(updatedPost);
    try {
         
      await PostMessage.findOneAndReplace({_id:updatedPost._id},updatedPost);
       res.send(updatedPost);
    //   console.log("replacement successfull !!!");


    } catch (error) {
        // console.log("error while updating the data !!");
        console.log(error);
    }
}

export const PostComment=async(req,res)=>{
    const comment=req.body.comment;
    const {id}=req.params;
    // console.log(comment);
    // console.log(id);
    try {
        const post=await PostMessage.findById(id);
        post.comments.push(comment);
        const post_after_comment=await PostMessage.findByIdAndUpdate({_id:id},post,{new:true});
        res.send(post_after_comment);
    } catch (error) {
        console.log(error);
        res.json({status:500,message:error});
    }
}