const Task = require("../models/task");
const User = require("../models/user");

module.exports.addTask = async function (req, res) {
  try {
    // console.log("Request from addtask", req.body);

    const d = new Date().toLocaleString("en-US", {
      timeZone: req.body.timezone,
    });

    console.log("date", d);
    let current_date = new Date().toISOString().split("T")[0];

    let date = req.body.due_date;
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let date_day = date.substring(8, 10);
    let ampm = "AM";
    let time = req.body.due_time;
    let hour = time.substring(0, 2);
    let min = time.substring(3, 5);

    if (current_date === date) {
    }

    let dateMap = new Map([
      ["01", "Jan"],
      ["02", "Feb"],
      ["03", "Mar"],
      ["04", "Apr"],
      ["05", "May"],
      ["06", "Jun"],
      ["07", "Jul"],
      ["08", "Aug"],
      ["09", "Sept"],
      ["10", "Oct"],
      ["11", "Nov"],
      ["12", "Dec"],
    ]);

    month = dateMap.get(month);
    date = date_day + " " + month + " " + year;
    req.body.due_date = date;

    if (hour > 12) {
      ampm = "PM";
      hour = hour - 12;
    }
    time = hour + ":" + min + " " + ampm;
    req.body.due_time = time;

    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    console.log("Task", task);
    const user = await User.findById(req.user._id);
    user.tasks.push(task);
    user.save();
    // console.log("User task: ", user.tasks);
    if (req.xhr) {
      req.flash("success", "Task Created Successfully!");
      return res.status(200).json({
        data: {
          task: task,
        },
        message: "Task Created!",
      });
    }
  } catch (e) {
    req.flash("error", e);
    return res.redirect("back");
  }
};
