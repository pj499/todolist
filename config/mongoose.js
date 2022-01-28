const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/todaylist_dev');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to mongoose!"));
db.once('open',function(){
    console.log("Connected to database::Mongodb!");
});
module.exports=db;
