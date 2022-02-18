module.exports.home =function(req, res){

    var err_msg= req.query.err_msg;
    
console.log(err_msg);

    if(req.isAuthenticated()){
        return res.redirect('/user/task');
    }
    return res.render('home', {err_msg: err_msg});
}