let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//basic form validation function assigned to modal
let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML= "Task cannot be blank";
    } else {
        console.log("success");
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
          })();
    }};
//even listener that is invoked during the submit event, e.preventDefault stops empty tasks from being submitted
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    formValidation();
});
 let data = [];

 //function accepts user input and pushes them to empty array variable and stores user data in LocalStorage and invokes createTasks
 let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

    createTasks();
 }


 //function that creates task an injects this div with bootstrap elements, assigns deleteTask,EditTask and and createTask to icons
 //
 let createTasks = () => {
  tasks.innerHTML += `
      <div id=${data}>
            <span class="fw-bold">${data.text}</span>
            <span class="small text-secondary">${data.date}</span>
            <p>${data.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `;
    };
  
    resetForm();
  

//function resets input values and clears form for user to type in new data
  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};
//function that removes parent element or "task" from app
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };

  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };
  
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
  })();