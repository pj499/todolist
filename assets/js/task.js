// function disablePrev() {
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//         window.history.go(0);
//     }
// }
// disablePrev();

let newTaskDom = function (task) {
  console.log("newtaskdom", task);
  return $(`<li>
    <div class="task">
        <div class="task-left">
            <div class="task-left-info">
                <input type="checkbox" name="task" value=""
                    style="width: 20px; height: 20px; margin: 0 20px 0 0; border:none;">
                <label for="task">
                    <h4> ${task.description}</h4>
                </label>
            </div>
            <div class="task-left-date">
                <img src="https://cdn-icons-png.flaticon.com/128/833/833593.png"
                    style="width: 18px; height:18px; margin-right: 10px;">
                 ${task.due_date} &nbsp &nbsp  ${task.due_time}
            </div>
        </div>
        <div class="task-right">
            <div> ${task.category} </div>
        </div>
    </div>
</li>`);
};

let createTask = async function () {
  var timedata = await $.getJSON("https://ipapi.co/json/");
  const timezone = timedata.timezone;
  console.log("Data of ip: ", timezone);

  let newTaskForm = $("#new-task-form");

  newTaskForm.submit(function (e) {
    e.preventDefault();
    // $("input").val("");

    var data = newTaskForm.serialize();
    data = data + "&timezone=" + `${timezone}`;

    $.ajax({
      type: "post",
      url: "/user/addTask",
      data: data,

      success: function (data) {
        if (typeof data.data == "undefined") {
          console.log("inside success if");

          new Noty({
            theme: "metroui",
            text: "Due Time should not be less than current time. Kindly check again!",
            type: "error",
            layout: "topRight",
            timeout: 5000,
          }).show();

          return;
        }

        new Noty({
          theme: "metroui",
          text: "Task Created Successfully!",
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();

        let newTask = newTaskDom(data.data.task);
        $("#tasks-list>ul").prepend(newTask);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
};

createTask();
