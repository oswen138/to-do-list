function TaskList() {
  this.tasks = [];
  this.currentId = 0;
}

TaskList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

TaskList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TaskList.prototype.findTask = function(id) {
  for (let i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        return this.tasks [i];
      }
    }
  };
  return false;
}

TaskList.prototype.deleteTask = function(id) {
  for (let i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

function Task(task) {
  this.task = task;
}

let taskList = new TaskList();
let completeTaskList = new TaskList();

function displayTaskList(taskListToDisplay) {
  let taskList = $("ul#tasks");
  let htmlForTaskInfo = "";
  taskListToDisplay.tasks.forEach(function(task) {
    htmlForTaskInfo += "<li id=" + task.id + ">" + task.task + "</li>";
  });
  taskList.html(htmlForTaskInfo);
}

function displayCompletedTaskList(taskCompleteListToDisplay) {
  let taskList = $("ul#complete-tasks");
  let htmlForTaskInfo = "";
  taskCompleteListToDisplay.tasks.forEach(function(task) {
    htmlForTaskInfo += "<li id=" + task.id + ">" + task.task + "</li>";
  });
  taskList.html(htmlForTaskInfo);
}

function showTaskComplete(taskId) {
  const task = taskList.findTask(taskId);
  $("#show-task").show();
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + task.id + ">Delete</button>");
  buttons.append("<button class='completeButton' id=" + + task.id + ">Completed</button>");
}

function attachTaskListeners() {
  $("ul#tasks").on("click", "li", function() {
    showTaskComplete(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    taskList.deleteTask(this.id);
    $("#show-task").hide();
    displayTaskList(taskList);
  });
  $("#buttons").on("click", ".completeButton", function() {
    let plzwork = taskList.findTask(this.id); 
    completeTaskList.addTask(plzwork);
    displayCompletedTaskList(completeTaskList);
    
    taskList.deleteTask(this.id);
    $("#show-task").hide();
    displayTaskList(taskList);   
  });
}

$(document).ready(function() {
  attachTaskListeners();
  $("form#new-task").submit(function(event) {
    event.preventDefault();
    const inputTask = $("input#new-task1").val();

    $("input#new-task").val("");
    
    let newTask = new Task(inputTask);
    taskList.addTask(newTask);
    displayTaskList(taskList);
  });
});