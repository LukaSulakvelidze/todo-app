const main_container = document.querySelector(".main_container");
const form = document.getElementById("form");
const todo_input = document.querySelector(".create_input");
const add_checkbox = document.getElementById("add_checkbox");

let todo_tasks = [];

let alert_span = document.querySelector(".validation_span");
let task_container = document.querySelector(".tasks_container");
let quantity_counter = document.getElementById("quantity_span")

let id_counter = 0
function add_task() {
    form.style.border = "none";
    alert_span.style.display = "none";
    todo_tasks.push(todo_input.value);
    let item_from_storage = localStorage.getItem("todo");
    const task = document.createElement("div")
    id_counter++
    task_container.appendChild(task)
    task.classList = "task"
    if (counter % 2 === 0) {
      task.classList = "task_dark"
      task.classList.toggle("task");
    }
    task.innerHTML = `
    <div class="text_cont">
      <div class="checkbox_cont">
        <input class="checkbox_input" type="checkbox" id="check ${id_counter}"/>
        <label for="check ${id_counter}" class = "label" id="label"></label>
      </div>
      <span class = "task_item" id ="task_item">${item_from_storage}</span>
    </div>
    <i id="ragaca" class="delete_icon fa-sharp fa-solid fa-x"></i>
    `;
  todo_input.value = "";
  quantity_counter.textContent = `${todo_tasks.length} items left`

  let check_input = task.querySelector(".checkbox_input")
  let task_item = task.querySelector(".task_item")
  check_input.addEventListener("click", () => {
    if(check_input.checked) {
      task_item.style.textDecoration = "line-through"
      task_item.style.opacity = "0.5"
    } else {
      task_item.style.textDecoration = "none"
    }
  })
}

add_checkbox.addEventListener("click", () => {
  localStorage.setItem("todo", todo_input.value);
  if (todo_input.value == "") {
    form.style.border = "1px solid red";
    alert_span.style.display = "block";
    add_checkbox.style.border = "1px solid #e3e4f1"
    add_checkbox.style.background = "transparent"
  } else {
    add_checkbox.style.border = "none"
    add_checkbox.style.background = "url(./Assets/Icons/Checked.svg) no-repeat"
    add_task()
  } 
setTimeout(() => {
  add_checkbox.style.background = "transparent"
  add_checkbox.style.border = "1px solid #e3e4f1"
}, 1000);
});

todo_input.addEventListener("keydown", (keyboard) => {
  localStorage.setItem("todo", todo_input.value);
  if (keyboard.key === 'Enter') {
    keyboard.preventDefault();
    if (todo_input.value == "") {
      form.style.border = "1px solid red";
      alert_span.style.display = "block";
    } else {
      add_task()
    }
  }
})

task_container.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete_icon")) {
    const taskToRemove = event.target.closest(".task");
    const taskText = taskToRemove.querySelector("span").textContent;
    const taskIndex = todo_tasks.indexOf(taskText)
   

    if (taskIndex !== -1) {
      todo_tasks.splice(taskIndex, 1);
      localStorage.removeItem("todo");
      taskToRemove.remove();
      quantity_counter.textContent = `${todo_tasks.length} items left`;
    }
  }

});

const dark_mode = document.querySelector(".dark_mode_cont");
let moonIcon = true;
let counter = 1
dark_mode.addEventListener("click", () => {
  document.body.classList.toggle("body_dark");
  const header = document.getElementsByTagName("header")[0];
  const label = document.querySelectorAll(".label");
  const create_input = document.querySelector(".create_input");
  const tasks_container = document.querySelector(".tasks_container")
  let task = document.querySelectorAll(".task")
  let statistic_container = document.querySelector(".statistic_container");
  let filter_container = document.querySelector(".filter_cont_mobile")

  header.classList.toggle("header_dark");
  form.classList.toggle("form_dark");
  label.forEach((label_item) => {
    label_item.classList.toggle("label_dark");
  });
  create_input.classList.toggle("create_input_dark");
  tasks_container.classList.toggle("tasks_container_dark")
  task.forEach((task_item) => {
    task_item.classList.toggle("task_dark");
  });

  statistic_container.classList.toggle("statistic_container_dark")
  filter_container.classList.toggle("filter_cont_dark")
  const moon_icon = document.querySelector(".moon_icon");
  const sun_icon = document.querySelector(".sun_icon");

  if (moonIcon === true) {
    moon_icon.style.display = "none";
    sun_icon.style.display = "block";
  } else {
    sun_icon.style.display = "none";
    moon_icon.style.display = "block";
  }

  moonIcon = !moonIcon;
  counter ++
});