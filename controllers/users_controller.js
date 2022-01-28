const User = require('../models/user');
module.exports.create = async function (req, res) {
    try {
        if (req.password != req.confirm_password) {
            console.log("Password and confirm password not same");
            return res.redirect('back'); 
        }
        var user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/user/task');
        }
        return res.redirect('back');
    }catch(e){
        console.log("Error",e);
        return res.redirect('back');
    }
}

module.exports.createSession=function(req,res){
    return res.redirect('/user/task');
}

module.exports.tasks=function(req,res){
    return res.render('task');
}