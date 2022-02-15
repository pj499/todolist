const mongoose=require('mongoose')
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
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;