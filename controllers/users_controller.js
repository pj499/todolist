const User = require('../models/user');
const Otp= require('../models/otp');
const bcrypt= require('bcrypt');
const otpMailer= require('../mailers/otp_mailer');

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
            
            return res.render('otp',{user:userr});
        }


        return res.redirect('/?err_msg=' + 'User already exist');
        // return res.render('home',  {err_msg: 'User already exist!!!!!!!!!!!!!'});

    }catch(e){
        console.log("Error",e);
        return res.redirect('back');
    }
}



module.exports.createSession=function(req,res){
    return res.redirect('/user/task');
}

module.exports.destroySession= function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.tasks=function(req,res){
    return res.render('task');
}

module.exports.verifyEmail=async function(req,res){
    try{
        console.log("Throught string params", req.params);
        var user_id=req.params.id;
        var otp=await Otp.findOne({user_id});
        console.log("Otp ",otp);
        console.log("Request Body: ",req.body);
        return;
    }catch(e){
        return;
    }
}