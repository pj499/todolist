const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }],
    verified:{
        type:Boolean,
        required:true
    },
    avatar:{
        type:String
    }
},{timestamps:true});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'_'+Date.now());
    }
});


//static methods
userSchema.statics.uploadAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model('User',userSchema);
module.exports=User;