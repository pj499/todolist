// function disablePrev() {
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//         window.history.go(0);
//     }
// }
// disablePrev();

let newTaskDom = function (task) {
    console.log("newtaskdom", task);
    return $(`<li id="task-${task._id}">
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
            <a class="delete-task" href="/user/deleteTask/${task._id}">X</a>
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
        console.log("Event: ", e.currentTarget[0]);

        // $("input").val("");
        var data = newTaskForm.serialize();
        data = data + "&timezone=" + `${timezone}`;
        // newTaskForm.reset();
        $.ajax({
            type: "post",
            url: "/user/addTask",
            data: data,
            success: function (data) {
                if (typeof data.data == "undefined") {

                    new Noty({
                        theme: "metroui",
                        text: "Due Time should not be less than current time. Kindly check again!",
                        type: "error",
                        layout: "topRight",
                        timeout: 5000,
                    }).show();
                    e.currentTarget[3].value = '';
                    return;
                }

                

                let newTask = newTaskDom(data.data.task);
                $("#tasks-list>ul").prepend(newTask);
                deleteTask($(' .delete-task',newTask));
                // window.location.reload();
                new Noty({
                    theme: "metroui",
                    text: "Task Created Successfully!",
                    type: "success",
                    layout: "topRight",
                    timeout: 2000,
                }).show();
                e.currentTarget[0].value = '';
                e.currentTarget[1].value = '';
                e.currentTarget[2].value = '';
                e.currentTarget[3].value = '';
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
};

let deleteTask=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop("href"),
            success:function(data){
                console.log("Data for deleting post", data.data);
                $(`#task-${data.data.taskId}`).remove();
                new Noty({
                    theme: "metroui",
                    text: "Task Deleted Successfully!",
                    type: "success",
                    layout: "topRight",
                    timeout: 2000,
                }).show();
            },
            error:function(error){
                console.log("error in delete post: ",error);
            }
        });
    });
}
createTask();
