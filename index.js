const express= require('express');
const port= 3000;

const app= express();
const sassMiddleware=require('node-sass-middleware')
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

//assets
app.use(express.static('./assets'));

//set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

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