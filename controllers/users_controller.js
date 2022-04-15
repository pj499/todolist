const User = require('../models/user');
const Otp= require('../models/otp');
const bcrypt= require('bcrypt');
const otpMailer= require('../mailers/otp_mailer');
const url = require('url'); // built-in utility

module.exports.create = async function (req, res) {
    try {
        if (req.password != req.confirm_password) {
            console.log("Password and confirm password not same");
            return res.redirect('back'); 
        }

        
        const hashedPassword= await bcrypt.hash(req.body.password, 10);
        req.body.password= hashedPassword;

        var user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.body.verified= false;
            const userr=await User.create(req.body);
            console.log("User data: ",userr);

            otpMailer.sendOTPVerificationEmail(req,userr);
            let user_id= userr._id;
            return res.redirect('/user/verifyOTP/'+user_id);
        }


        return res.redirect('/?err_msg=' + 'User already exist');
        // return res.render('home',  {err_msg: 'User already exist!!!!!!!!!!!!!'});

    }catch(e){
        console.log("Error",e);
        return res.redirect('back');
    }
}

module.exports.createSession=function(req,res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/user/task');
}

module.exports.destroySession= function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.tasks=function(req,res){
    return res.render('task');
}

module.exports.verifyEmailPath=async function(req,res){
    try{
        console.log('Inside verifyEMail');

        var user_id=req.params['id'];
        const otp=await Otp.findOne({user_id:user_id});
        console.log("Otp: ",otp);
        var reqBody=req.body;
        let user_otp=reqBody.otp_digit1+reqBody.otp_digit2+reqBody.otp_digit3+reqBody.otp_digit4+reqBody.otp_digit5+reqBody.otp_digit6;
        let user =await User.findById(user_id);
        if(! await bcrypt.compare(user_otp, otp.otp)){
            console.log('OTP Compare');
            req.flash('error', 'Invalid OTP!');
            return res.redirect('/user/verifyOTP/'+user_id); //NOT WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

        }else if(Date.now()> otp.expiresAt){

            await Otp.findByIdAndDelete(otp._id);
            console.log('OTP Expired');

            req.flash('error', 'OTP Time Expired!');
            return res.redirect('back');
        }

        console.log('OTP Valid');

        user= await User.findByIdAndUpdate(user_id, {verified: true});
        // user.verified= true;
        // user.save();
        await Otp.findByIdAndDelete(otp._id);

        

        req.flash('success', 'Signed Up successfully! Please Login to Continue');

        return res.redirect('/');

    }catch(e){
        console.log("Error: ",e);
        return;
    }
}

module.exports.renderOTP= function(req, res){
    let user= req.params;
    console.log("USer from rendeROTP", user);
    return res.render('otp', {user: user});
}