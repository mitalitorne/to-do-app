const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const progressText = document.getElementById("progressText");
const taskList = document.getElementById("taskList");
const toggleInputBtn = document.getElementById("toggleInputBtn");
const inputSection = document.getElementById("input-section");
const progressFill = document.querySelector(".progress-fill");

inputSection.classList.add('hidden');


toggleInputBtn.addEventListener("click", () => {
    inputSection.classList.toggle("hidden");

    if(!inputSection.classList.contains('hidden')){
        taskInput.focus();
    }
});

const createTasks = (taskValue, isCompleted = false) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = taskValue;

    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.classList.add("complete-btn");

    if(isCompleted){
        span.classList.add("completed");
        completeBtn.classList.add("active");
    }

    completeBtn.addEventListener("click", () => {
        span.classList.toggle("completed");
        completeBtn.classList.toggle("active");
        updateProgress();
        saveTasks();
    });

    //DELETE FUNCTIONALITY
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class= "fa-solid fa-x "></i>';
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateProgress();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.prepend(li);

    taskInput.focus();

};

addBtn.addEventListener("click", ()=>{
    let taskValue = taskInput.value.trim();

    if(taskValue === ""){
        errorMsg.textContent = "Please enter a task";
        return;
    }

    errorMsg.textContent = "";
    createTasks(taskValue);
    updateProgress();
    saveTasks();
    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        addBtn.click();
    }
});

//UPDATE PROGRESS FUNCTIONALITY

const updateProgress = () => {
    let totalTasks = document.querySelectorAll('#taskList li').length;
    let completedTasks = document.querySelectorAll('#taskList .completed').length;

    progressText.textContent = completedTasks + " of " + totalTasks + " tasks completed";

    let percentage = 0;

    if(totalTasks > 0){
        percentage = (completedTasks / totalTasks) * 100;
    }
    
    progressFill.style.width = percentage + "%";
};

//SAVE ALL TASKS 

const saveTasks = () =>{
    let tasks = [];
    let allTasks = document.querySelectorAll("#taskList li");
    allTasks.forEach((taskItem) => {
        let taskText = taskItem.querySelector("span").textContent;
        let isCompleted = taskItem.querySelector("span").classList.contains("completed");
        tasks.push({
            text: taskText,
            completed: isCompleted
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
    let savedTasks = localStorage.getItem("tasks");
    let tasks = savedTasks ? JSON.parse(savedTasks):[];

    tasks.forEach((task)=>{
        createTasks(task.text, task.completed);
    });
    updateProgress();
};

loadTasks();