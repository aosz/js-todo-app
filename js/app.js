// Accessing DOM elements by id
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-button");
const saveTaskButton = document.getElementById("save-task-button");
const listBox = document.getElementById("listBox");
const saveIndex = document.getElementById("saveIndex");
const taskCount = document.getElementById("task-count");

// TODO: Add loading state
window.addEventListener("load", (event) => {
    displayTasks();
});

// Initialize an array to store tasks
let todoArray = [];

// Add new task
addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();

    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }

    todoArray.push([text.value, new Date().toDateString()]);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTasks();

    UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Task added",
        status: "success",
        pos: "top-right",
        timeout: 1000,
    });
});

// Display tasks
function displayTasks() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }

    taskCount.innerHTML = todoArray.length;

    let htmlCode = "";
    todoArray.forEach((list, index) => {
        taskDate = list[1];
        // console.log(taskDate);

        htmlCode += `<div class='uk-card uk-card-body uk-card-default uk-card-small uk-card-hover uk-margin uk-sortable-handle'>
            <p class='uk-card-title uk-margin-remove-bottom'>${list[0]}</p>
            <p class='uk-text-meta uk-margin-remove-top'>${taskDate}</p>
            <button onclick='editTask(${index})' class='uk-button uk-button-small uk-button-primary'>Edit</button>
            <button onclick='deleteTask(${index})' class='uk-button uk-button-small uk-button-danger'>Delete</button>
        </div>`;
    });
    listBox.innerHTML = htmlCode;
}

// Delete task
function deleteTask(index) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(index, 1);

    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTasks();

    UIkit.notification({
        message: "<span uk-icon='icon: trash'></span> Task deleted",
        status: "danger",
        pos: "top-center",
        timeout: 1000,
    });
}

// Edit task
function editTask(index) {
    saveIndex.value = index;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);

    text.value = todoArray[index][0];
    // console.log(todoArray[index][1]);

    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
}

// Save task when edited
saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);

    let id = saveIndex.value;
    todoArray[id][0] = text.value;

    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";

    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));

    displayTasks();

    UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Task saved",
        status: "success",
        pos: "top-center",
        timeout: 1000,
    });
});