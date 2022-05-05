// function disablePrev() {
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//         window.history.go(0);
//     }
// }
// disablePrev();

let createTask=function(){
    let newTaskForm=$('#new-task-form');
    newTaskForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/user/addTask',
            data:newTaskForm.serialize(),
            success:function(data){
                console.log(data);
            },
            error:function(error){
                console.log(error);
            }
        });
    });
}

createTask();
