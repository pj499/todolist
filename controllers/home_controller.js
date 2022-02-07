module.exports.home =function(req, res){
    
    if(req.isAuthenticated()){
        return res.redirect('/user/task');
    }
    return res.render('home');
}