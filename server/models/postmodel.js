import mongoose from 'mongoose'

const postSchema=new mongoose.Schema({
    creator:String,
    title:String,
    name:String,
    message:String,
    selectedFile:String,
    tags:[String],
    comments:[String],
    time:{
        type:Date,
        default:new Date(),
    },
    likes:{
        type:[String],
        default:[],
    }
});

const PostMessage=mongoose.model("Post",postSchema);

export default PostMessage;