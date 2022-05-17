const Task = require("../models/task");
const User = require("../models/user");

module.exports.addTask = async function (req, res) {
  console.log("Inside addtask");
  // console.log("Request from addtask", req.body);

  const d = new Date().toLocaleString("en-US", {
    timeZone: req.body.timezone,
  });

  let dueDate = req.body.due_date;
  let dueYear = dueDate.substring(0, 4);
  let dueMonth = dueDate.substring(5, 7);
  let dueDateDay = dueDate.substring(8, 10);
  let ampm = "AM";
  let dueTime = req.body.due_time;
  let dueHour = dueTime.substring(0, 2);
  let dueMin = dueTime.substring(3, 5);

  let currentYear = d.split("/")[2].split(",")[0];
  let currentMonth = d.split("/")[0];
  let currentDateDay = d.split("/")[1];

  if (currentMonth.length === 1) {
    currentMonth = "0" + currentMonth;
  }

  let currentHour = d.split(",")[1].split(":")[0].replace(" ", "");
  let currentMin = d.split(",")[1].split(":")[1];
  let currentTime = currentHour + ":" + currentMin + " " + d.split(" ")[2];

  let dueDateMap = new Map([
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

  let currentDate =
    currentDateDay + " " + dueDateMap.get(currentMonth) + " " + currentYear;

  dueMonth = dueDateMap.get(dueMonth);
  dueDate = dueDateDay + " " + dueMonth + " " + dueYear;
  req.body.due_date = dueDate;

  if (dueHour > 12) {
    ampm = "PM";
    dueHour = dueHour - 12;
  }
  if (dueHour < 10) {
    dueHour = "0" + dueHour;
  }

  dueTime = dueHour + ":" + dueMin + " " + ampm;
  req.body.due_time = dueTime;

  console.log("Current Date", currentDate);
  console.log("Current Time", currentTime);
  console.log("Due Date", dueDate);
  console.log("Due TIme", dueTime);

  let dueTimeLength = dueTime.length;
  let currentTimeLength = currentTime.length;
  if (
    currentDate == dueDate &&
    (dueTime < currentTime ||
      dueTime[dueTimeLength - 2] < currentTime[currentTimeLength - 2]) &&
    req.xhr
  ) {
    console.log("inside check");
    return res.status(400).redirect("back");
  }

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
    return res.status(200).json({
      data: {
        task: task,
      },
      message: "Task Created!",
    });
  }
};
