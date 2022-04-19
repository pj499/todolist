const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({
    user_id:{
        type: String,
        unique: true
    },
    otp:{
        type:String
    },
    createdAt:{
        type: Date
    },
    expiresAt:{
        type: Date
    }
})

const Otp=mongoose.model("Otp",otpSchema);
module.exports=Otp;