// Select necessary DOM elements
let notesList = document.querySelector(".notesList");
let newNoteBtn = document.querySelector("#newNote");

// Background Note Create
let background = document.querySelector("#background");
let noteViewBg = document.querySelector("#noteViewBg");

// Foreground Note Create
let foregroundNc = document.querySelector("#foreground");
let titleValue = document.querySelector("#createNoteTitle");
let contentValue = document.querySelector("#createNoteContent");
let clearNoteButton = document.querySelector("#clearNoteButton");
let createNoteButton = document.querySelector("#createNoteButton");

// Note view
let noteView = document.querySelector(".noteView");
let nvBg = document.querySelector(".nvBg");

// Tasks
let tasks = document.querySelector(".tasks");
let addTask = document.querySelector("#addTask");
let createTask = document.querySelector(".createTask");

// Initialize notes array and load from localStorage if available
let notes = [];
if (localStorage.getItem("Notes")) {
  notes = JSON.parse(localStorage.getItem("Notes"));
}

// Display the background view if no notes are available
let startView = () => {
  background.style.display = "block";
  noteViewBg.style.display = "none";
  noteView.style.display = "none";
  foregroundNc.style.display = "none";
  tasks.style.display = "none";
};

// Display the notes list view if any notes are available
let notesAvailView = () => {
  background.style.display = "none";
  noteViewBg.style.display = "block";
  noteView.style.display = "none";
  foregroundNc.style.display = "none";
  tasks.style.display = "none";
};

// Toggle between startView and notesAvailView based on the notes array
let viewToggler = () => {
  if (notes.length > 0) {
    notesAvailView();
  } else {
    startView();
  }
};

viewToggler();

// Event listener for creating a new note: show foreground note creation view
newNoteBtn.addEventListener("click", () => {
  background.style.display = "none";
  noteViewBg.style.display = "none";
  noteView.style.display = "none";
  foregroundNc.style.display = "block";
  tasks.style.display = "none";
  titleValue.focus();
});

// Event listener for creating a new note
createNoteButton.addEventListener("click", () => {
  if (titleValue.value !== "" && contentValue.value !== "") {
    let note = {
      title: titleValue.value,
      content: contentValue.value,
      tasks: [],
    };

    notes.push(note);
    addToLocalStorage();
    renderNoteToList(note, notes.length - 1);
    viewToggler();
    clearValues();
  } else {
    alert("Note Title and Note Content are required.");
  }
});

// Event listener for clearing note content
clearNoteButton.addEventListener("click", () => {
  clearValues();
});

// Clear input values and focus on the title input
let clearValues = () => {
  titleValue.value = "";
  contentValue.value = "";
  titleValue.focus();
};

// Render note to the list
let renderNoteToList = (note, index) => {
  let noteDiv = document.createElement("div");
  noteDiv.className = "note";

  let title = document.createElement("h2");
  title.className = "sbarNlistTitle";
  title.textContent = note.title;

  let content = document.createElement("p");
  content.className = "sbarNlistContent";
  content.textContent = note.content;

  noteDiv.append(title, content);
  notesList.append(noteDiv);

  // Event listener for viewing the note details
  noteDiv.addEventListener("click", () => {
    background.style.display = "none";
    noteViewBg.style.display = "none";
    noteView.style.display = "block";
    nvBg.style.display = "none";
    foregroundNc.style.display = "none";
    tasks.style.display = "none";

    let noteViewHeading = document.querySelector(".noteViewHeading");
    let noteViewContent = document.querySelector(".noteViewContent");

    // Stops the duplicates of note data in note viewer
    if (noteViewHeading === null && noteViewContent === null) {
      noteViewer(note, index);
    } else {
      noteViewHeading.remove();
      noteViewContent.remove();
      noteViewer(note, index);
    }
  });
};

// View note details
let noteViewer = (note, index) => {
  // Top bar heading in Viewer panel
  let viewerTopBar = document.createElement("div");
  viewerTopBar.className = "noteViewHeading";

  let viewerHeading = document.createElement("h2");
  viewerHeading.textContent = note.title;

  let btnsGroup = document.createElement("div");
  btnsGroup.className = "btnsGroup";

  let newTaskBtn = document.createElement("button");
  newTaskBtn.className = "newTask";
  newTaskBtn.textContent = "New Task";

  let deleteNoteBtn = document.createElement("button");
  deleteNoteBtn.className = "deleteNote";
  deleteNoteBtn.textContent = "Delete Note";

  btnsGroup.append(newTaskBtn, deleteNoteBtn);
  viewerTopBar.append(viewerHeading, btnsGroup);

  // Content in Viewer panel
  let viewerContent = document.createElement("div");
  viewerContent.className = "noteViewContent";

  let contentDesc = document.createElement("p");
  contentDesc.textContent = note.content;
  contentDesc.className = "contentDesc";

  viewerContent.append(contentDesc);

  // Root div for tasks
  let rootTaskList = document.createElement("div");
  rootTaskList.className = "rootTaskList";

  // Task list heading
  let tasksListHeading = document.createElement("p");
  tasksListHeading.textContent = "List of Tasks";
  tasksListHeading.className = "taskListTitle";

  let activeTlHeading = document.createElement("p");
  activeTlHeading.textContent = "Pending Tasks";
  activeTlHeading.style.textDecoration = "underline";

  // Div that contains the Pending Tasks tasks
  let activeTasks = document.createElement("div");
  activeTasks.className = "activeTasks";

  // HR TAG separating the Pending Tasks and completed tasks
  // let hrSeparator = document.createElement("hr");
  // hrSeparator.className = "hrSeparator";

  let completedTaskListHeading = document.createElement("p");
  completedTaskListHeading.textContent = "Completed Tasks";
  completedTaskListHeading.style.textDecoration = "underline";
  completedTaskListHeading.style.paddingTop = "1rem";
  completedTaskListHeading.style.paddingLeft = "1rem";

  // DIV that contains the completed tasks
  let completedTask = document.createElement("div");
  completedTask.className = "completedTask";

  rootTaskList.append(
    tasksListHeading,
    activeTlHeading,
    activeTasks,
    // hrSeparator,
    completedTaskListHeading,
    completedTask,
  );

  viewerContent.append(rootTaskList);
  noteView.append(viewerTopBar, viewerContent);

  // Event listener for creating a new task
  newTaskBtn.addEventListener("click", () => {
    noteView.style.display = "flex";
    noteView.style.zIndex = "1";

    nvBg.style.display = "flex";
    nvBg.style.opacity = "1";

    tasks.style.display = "flex";
    addTask.focus();
  });

  // Event listener for deleting a note
  deleteNoteBtn.addEventListener("click", () => {
    notes.splice(index, 1);
    addToLocalStorage();
    let localNotes = JSON.parse(localStorage.getItem("Notes"));
    localNotes.splice(index, 1);
    notesList.innerHTML = "";
    renderNotesFromLS();
    viewToggler();
  });

  // Event listener for creating a task
  createTask.onclick = function () {
    if (addTask.value !== "") {
      let task = {
        taskName: addTask.value,
        completed: false,
      };

      notes[index].tasks.push(task);
      addToLocalStorage();
      addTask.value = "";
      tasksManager(task, activeTasks, completedTask);
      nvBg.style.display = "none";
      tasks.style.display = "none";
    }
  };

  // Render each task on the screen
  note.tasks.forEach((task) => {
    tasksManager(task, activeTasks, completedTask);
  });
};

// Event listener for hiding the new task creation view
nvBg.addEventListener("click", () => {
  nvBg.style.display = "none";
  tasks.style.display = "none";
});

// Manage tasks display and behavior
function tasksManager(task, activeTasks, completedTasks) {
  function createCurrentTask() {
    let currentTask = document.createElement("div");
    currentTask.className = "currentTask";

    let checkBoxInput = document.createElement("input");
    checkBoxInput.type = "checkbox";
    checkBoxInput.className = "checkBox";

    let label = document.createElement("label");
    label.textContent = task.taskName;

    currentTask.append(checkBoxInput, label);

    // Event listener for marking a task as completed
    checkBoxInput.addEventListener("click", () => {
      if (checkBoxInput.checked) {
        createFinishedTask();
        task.completed = true;
        addToLocalStorage();
        currentTask.remove();
      }
    });

    activeTasks.append(currentTask);
  }

  function createFinishedTask() {
    let finishedTaskDiv = document.createElement("div");
    finishedTaskDiv.className = "finishTask";

    let spanElement = document.createElement("span");
    spanElement.className = "spanEle";

    let finishedTaskLabel = document.createElement("p");
    finishedTaskLabel.textContent = task.taskName;

    finishedTaskDiv.append(spanElement, finishedTaskLabel);
    completedTasks.append(finishedTaskDiv);
  }

  // Determine task display based on its completion status
  if (!task.completed) {
    createCurrentTask();
  } else {
    createFinishedTask();
  }
}

// Save notes array to localStorage
function addToLocalStorage() {
  localStorage.setItem("Notes", JSON.stringify(notes));
}

// Render notes from localStorage upon initial load
function renderNotesFromLS() {
  let localNotes = JSON.parse(localStorage.getItem("Notes"));
  if (localNotes) {
    notes = localNotes;
    localNotes.forEach((note, index) => {
      renderNoteToList(note, index);
    });
  }
}

// Load notes from localStorage when the page is loaded
renderNotesFromLS();
