$(function(){

    // allows the user to get the last end time they entered to be the new start time for the next task
    var oldEnd = "";

    $( "form" ).submit(function( event ) {
        var taskFormData = $('form').serializeArray();

        var command = taskFormData[0].value;
        var title = taskFormData[1].value;
        var start = taskFormData[2].value;
        var end = taskFormData[3].value;
        var task_note = taskFormData[4].value;

        if (command === "add" || command === "remove" || command === "find") {
            if (!title && !start){
                // alert("A title is required and start is required!");
            } else {
                oldEnd = end;
                processingFunc(command, title, start, end, task_note);

                $("#task-title").val("");
                $("#task-start").val(oldEnd);
                $("#task-end").val("");
                $("#task-notes").val("");                
            }
        }
        else {
            processingFunc(command);
        }
        event.preventDefault();
    });
 
 });

function displayTasks(task) {
    return `<h3>${task.start} - ${task.end} : ${task.title}</h3> <p>Notes: ${task.notes}</p>`
}

function listTasks(tasksToPrint, container, numTaskscontainer, clearContainer) {
    container.html("");      
    
    for (var i = 0 ; i < tasksToPrint.length ; i++) {
        container.append(displayTasks(tasksToPrint[i]));
    }

    if (numTaskscontainer !== false) {
        numTaskscontainer.html("");
        numTaskscontainer.append(`You have ${tasksToPrint.length} task(s)`);
    } 

    if (clearContainer !== false) {
        clearContainer.html("");
    }
}

function processingFunc(command, title, start, end, task_note) {
    // console.log("Command: ", command);
    // console.log("Title: ", title);
    // console.log("Start: ", start);
    // console.log("End: ", end);
    // console.log("Notes: ", task_note);

    const taskOps = require("./taskOperations.js");

    if (command === "add"){
        var task = taskOps.addTask(title, start, end, task_note);
        if (task){
            listTasks(taskOps.getAll(), $("#task-list"), $("#num-tasks"), $("#task-find"));
        } else {
            alert("Task title and start time slot taken");
        }
    } else if (command === "remove"){
        taskOps.removeTask(title, start);
        listTasks(taskOps.getAll(), $("#task-list"), $("#num-tasks"), $("#task-find"));
    } else if (command === "remove-all"){
        taskOps.removeAllTasks();
        listTasks(taskOps.getAll(), $("#task-list"), $("#num-tasks"), $("#task-find"));
    } else if (command === "find"){
        var task = taskOps.getTask(title);
        if (task){
            listTasks(task, $("#task-find"), false, false);
        } else {
            alert("Task not found");
        }
    } else if (command === "list"){
        listTasks(taskOps.getAll(), $("#task-list"), $("#num-tasks"), false);        
    }
}