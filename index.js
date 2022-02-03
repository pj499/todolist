const express= require('express');
const port= 3000;
const db=require('./config/mongoose')
const app= express();
const sassMiddleware=require('node-sass-middleware')
const cookieParser=require('cookie-parser');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
//sass Middleware
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'compressed',
    prefix:'/css'
}))
//encoded data
app.use(express.urlencoded());
app.use(cookieParser());

//assets
app.use(express.static('./assets'));

//set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:"Today-List",
    secret:"milku",
    saveUninitialized:false,
    resave:false,
    rolling:true,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routes
app.use('/', require('./routes/index'));



app.listen(port, function(error){
    if(error){
        console.log(error);
        return;
    }

    console.log(`Server is running on port: ${port}`);
    return;
});