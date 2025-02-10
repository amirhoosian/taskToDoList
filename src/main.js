//open modal
const newTaskInput = document.getElementById("AddNewTask");
const list = document.getElementById("list");
document.getElementById("add_task").addEventListener("click", () => {
  document.getElementById("modal").style.display = "flex";
});
//close modal
document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

//add new task

document.getElementById("add").addEventListener("click", () => {
  addTask();
});

//add task

function addTask() {
  const taskValue = newTaskInput.value.trim();
  if (taskValue === "") {
    alert("Please enter a task.");
    return;
  }

  // Create a new task object
  const newTask = {
    id: Date.now(),
    text: taskValue,
    completed: false,
  };
  // Get existing tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(newTask);
  // Save updated tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Add the task to the screen
  renderTask(newTask);

  // Clear the input field and close the modal
  newTaskInput.value = "";
  modal.style.display = "none";
}

function renderTask(task) {
  // Step 1: Create the main container for the task
  const taskContainer = document.createElement("div");
  taskContainer.classList.add(
    "flex",
    "w-full",
    "justify-between",
    "item-center"
  );

  // Step 2: Create the label with checkbox and task text
  const label = document.createElement("label");
  label.classList.add("custom-checkbox", "text-cyan-50");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed; // Set the checkbox state based on task completion
  checkbox.addEventListener("change", () => toggleTaskCompletion(task.id)); // Add event listener for checkbox change

  const checkmark = document.createElement("span");
  checkmark.classList.add("checkmark");

  const taskText = document.createElement("span");
  taskText.id = "taskText";
  taskText.textContent = task.text; // Set the task text from the input

  label.append(checkbox, checkmark, taskText); // Add checkbox, checkmark, and text to the label

  // Step 3: Create the actions container (edit and delete buttons)
  const actions = document.createElement("div");
  actions.classList.add("flex", "gap-1.5", "items-center");

  const editButton = document.createElement("img");
  editButton.src = "./public/edit.svg";
  editButton.alt = "edit";
  editButton.classList.add("cursor-pointer");
  editButton.addEventListener("click", () => editTask(task.id)); // Add event listener for edit

  const deleteButton = document.createElement("img");
  deleteButton.src = "./public/trash.svg";
  deleteButton.alt = "trash";

  deleteButton.classList.add("cursor-pointer");
  deleteButton.addEventListener("click", () => deleteTask(task.id)); // Add event listener for delete

  actions.append(editButton, deleteButton); // Add buttons to the actions container

  // Step 4: Add label and actions to the task container
  taskContainer.append(label, actions);

  // Step 5: Add the task to the todo list
  const todoList = document.getElementById("container");
  todoList.appendChild(taskContainer);
  const divider = document.createElement("hr");
  divider.classList.add("border-t-2", "border-blue-500", "my-6");

  todoList.appendChild(divider);
  taskContainer.setAttribute("data-id", task.id);
  divider.setAttribute("data-id", task.id);
}

function toggleTaskCompletion(taskId) {
  // Step 1: Get tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Step 2: Find the task with the matching ID
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed; // Toggle the completion status
    }
    return task;
  });

  // Step 3: Save the updated tasks back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Step 4: Reload the tasks on the screen (optional)
  location.reload(); // Refresh the page to reflect changes
}

for (const task of JSON.parse(localStorage.getItem("tasks")) || []) {
  renderTask(task);
}

//delete task
function deleteTask(taskId) {
  // Step 1: Get tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Step 2: Find the task with the matching ID
  tasks = tasks.filter((task) => task.id !== taskId);

  // Step 3: Save the updated tasks back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Step 4: Remove the task from the screen
  const taskContainer = document.querySelector(`[data-id="${taskId}"]`);
  taskContainer.remove();
  divider.remove();
}

//edit task
function editTask(taskId) {
  const taskContainer = document.querySelector(`[data-id="${taskId}"]`);

  const tasksText = taskContainer.querySelector("#taskText");
  const newTaskText = prompt("Enter the new task text:");
  if (newTaskText) {
    tasksText.textContent = newTaskText;
  }
  updateTaskInLocalStorage(taskId, newTaskText);
}

function updateTaskInLocalStorage(taskId, newTaskText) {
  // Step 1: Get tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Step 2: Find the task with the matching ID
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.text = newTaskText; // Update the task text
    }
    return task;
  });

  // Step 3: Save the updated tasks back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Step 4: Reload the tasks on the screen (optional)
  location.reload(); // Refresh the page to reflect changes
}
