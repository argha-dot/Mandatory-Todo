// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");
const clock = document.querySelector(".clock")


// Event Listeners
createDiv()
update()
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Functions
function numToDay(num) {
    let day;
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                 "Thursday", "Friday", "Saturday",]
    if (num < 0 && num > 6) {
        return -1;
    } else {
        day = names[num];
    }

    return day;
}

function numToMonth(num) {
    let mon;
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    if (num < 0 && num > 11) {
        return -1;
    } else {
        mon = months[num];
    }

    return mon;
}

function createDiv() {
    const clockTime = document.createElement("div");
    clockTime.classList.add("time");

    const clockDate = document.createElement("div");
    clockDate.classList.add("date");

    clock.appendChild(clockTime)
    clock.appendChild(clockDate)
}

function currentTime() {
    let dateItem = new Date();
    
    let h = dateItem.getHours();
    let m = dateItem.getMinutes();
    let s = dateItem.getSeconds();

    let day = dateItem.getDay();
    day = numToDay(day);
    let month = dateItem.getDate();
    month = numToMonth(month);
    let date = dateItem.getMonth();


    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let timeString = h + ":" + m + ":" + s
    
    return [timeString, `${day}, ${month} ${date}`]
}

function update() {
    const clockTime = document.querySelector(".time");
    const clockDate = document.querySelector(".date");

    const string = currentTime();

    clockTime.innerHTML = string[0];
    clockDate.innerHTML = string[1];

    setTimeout(update, 1000);

}

function addTodo(event) {
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    saveLocalTodo(todoInput.value)

    // check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("complete-btn");

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(checkButton);
    todoDiv.appendChild(trashButton);

    // adding todoDiv to todolist
    todoList.appendChild(todoDiv);

    //clearing the input
    todoInput.value = "";
}

function deleteCheck(event) {
    // event.preventDefault();
    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        
        todo.classList.add("fall");
        removeLocalTodos(todo)

        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    if (item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
    
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "None"
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "None"
                } else {
                    todo.style.display = "flex"
                }
                break;
            default:
                break;
        }
    });
}

function saveLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");

        // check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = "<i class='fas fa-check'></i>";
        checkButton.classList.add("complete-btn");

        // trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(checkButton);
        todoDiv.appendChild(trashButton);

        // adding todoDiv to todolist
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.splice(todos.indexOf(todo.children[0].innerText), 1) 
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));

}