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

let createTask = function () {
  let newTaskForm = $("#new-task-form");
  newTaskForm.submit(function (e) {
    e.preventDefault();
    // $("input").val("");
    $.ajax({
      type: "post",
      url: "/user/addTask",
      data: newTaskForm.serialize(),
      success: function (data) {
        console.log("AJAX add task", data);
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
