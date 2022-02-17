const User = require('../models/user');
const bcrypt= require('bcrypt');

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
            await User.create(req.body);
            console.log(req.body);
            return res.redirect('back');
        }

        return res.redirect('/?err_msg=' + 'User exist');
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