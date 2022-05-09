const Task = require('../models/task');
const User = require('../models/user')

module.exports.addTask = async function (req, res) {
    try {
        console.log("Inside add task");
       
        const task = await Task.create({
            ...req.body,
            user: req.user._id
        });
        console.log("Task", task);
        const user = await User.findById(req.user._id);
        user.tasks.push(task);
        user.save();
        console.log("User task: ", user.tasks);
        if (req.xhr) {
            req.flash('success', 'Task Created Successfully!');
            return res.status(200).json({
                data: {
                    task: task
                },
                message: 'Task Created!'
            });
        }
    } catch (e) {
        req.flash('error',e);
        return res.redirect('back');
    }
}