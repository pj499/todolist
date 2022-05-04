const mongoose=require('mongoose');
const taskSchema= new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    due_date:{
        type: String,
        required: true
    },
    due_time:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
});

const Task= mongoose.model('Task', taskSchema);
module.exports= Task;