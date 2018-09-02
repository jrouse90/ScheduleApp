const fs = require("fs");
const date = require("./date");

d = new Date();
const fileToReadWrite = `../data/${date.dateToFileName(d.getDate()+1, date.monthToString(d.getMonth()), d.getFullYear(), "json")}`;
fs.writeFileSync("../data/currentActiveTaskListDir.txt", fileToReadWrite);

var fetchTask = () =>{
    try{
        var tasksString = fs.readFileSync(fileToReadWrite);
        return JSON.parse(tasksString);
    }catch (e){
        console.log("Error Fetching data");
        return [];
    }

};

var saveTask = (tasks) => {
    fs.writeFileSync(fileToReadWrite, JSON.stringify(tasks));
};

var addTask = (title, start, end, notes) => {
    var task = {title, start, end, notes};
    var tasks = fetchTask()
    var dupTask = tasks.filter((task) => task.title === title && task.start === start);

    if (dupTask.length === 0){
        tasks.push(task);
        saveTask(tasks);
        return task;
    }
};

var getAll = () => {
    return fetchTask();
};

var getTask = (title) => {
    return fetchTask().filter((task) => task.title === title);
};

var removeTask = (title, start) => {
    // saveTask(fetchTask().filter((task) => task.title !== title));
    var tasks = fetchTask();
    var filteredTask = tasks.filter((task) => task.title !== title && task.start !== start);
    saveTask(filteredTask);
        
    return tasks.length !== filteredTask.length

};

var removeAllTasks = () => {
    fs.writeFile(fileToReadWrite, "", () => {console.log("All tasks removed")});
}

var logTask = (task) => {
    console.log("\t--");
    console.log(`${task.start} - ${task.end} : ${task.title}`);
    if (task.notes !== "") {
        console.log(`Notes: ${task.notes}`);
    } else {
        console.log(`No Notes for this task`);
    }
    
};

module.exports = {
    addTask,
    getAll,
    getTask,
    removeTask,
    removeAllTasks,
    logTask,
};