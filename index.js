const getIdUl = document.getElementById("task-list");
const getIdInput = document.getElementById("user-task");
const getIdBtn = document.getElementById("add-btn");
const taskCount = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-all");

// 1. THE LOGIC: Update the task counter
const updateCounter = () => {
    const total = getIdUl.querySelectorAll("li").length;
    const completed = getIdUl.querySelectorAll("li.completed").length;
    const remaining = total - completed;
    taskCount.innerText = `${remaining} task${remaining === 1 ? '' : 's'} left`;
};

// 2. THE ACTION: Adding a task
const addTask = (taskFromStorage) => { 
    const text = taskFromStorage || getIdInput.value;
    if (text === "") return; 

    const elementMaker = document.createElement("li");
    // We use a span so the text and button stay separated by the CSS 'justify-content'
    elementMaker.innerHTML = `<span>${text}</span>`;
    
    const delBtn = document.createElement("button");
    delBtn.innerText = "✕"; 
    delBtn.classList.add("delete-style");
    
    // Delete Logic
    delBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        elementMaker.remove();
        saveTasks();
        updateCounter();
    });

    // Toggle Completed Logic
    elementMaker.addEventListener("click" , () => {
        elementMaker.classList.toggle("completed");
        saveTasks();
        updateCounter();
    });

    elementMaker.appendChild(delBtn);
    getIdUl.appendChild(elementMaker);

    // Clear input ONLY if it came from the user typing
    if (!taskFromStorage){
        getIdInput.value = ""; 
    }
    
    saveTasks();
    updateCounter();
};

// 3. THE TRIGGERS: Putting the listeners back in!
getIdBtn.addEventListener("click", () => addTask());

getIdInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

clearBtn.addEventListener("click", () => {
    getIdUl.innerHTML = "";
    saveTasks();
    updateCounter();
});

// 4. DATA PERSISTENCE: Save and Load
const saveTasks = () => {
    const allTasks = [];
    // We grab text specifically from the span so we don't get the '✕' character
    document.querySelectorAll("#task-list li span").forEach((span) => {
        allTasks.push(span.innerText);
    });
    localStorage.setItem("myTasks", JSON.stringify(allTasks));
};

const loadTasks = () => {
    const saved = localStorage.getItem("myTasks");
    if (saved) {
        const taskArray = JSON.parse(saved);
        taskArray.forEach(taskText => addTask(taskText));
    }
};
//Adding a comment for the repo just to mess around.
// 5. STARTUP
loadTasks();
updateCounter();