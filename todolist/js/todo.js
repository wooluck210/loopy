const todoForm = document.querySelector('.wrapper');
const todoInput = todoForm.querySelector('input');
const todoList = todoForm.querySelector('.todo-list');
const TODOS_KEY = "todos";

let todos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function printToDo(inputed) {
  const li = document.createElement("li");
  li.id = inputed.id;
  const check = document.createElement("input");
  check.type = "checkbox";
  // check.classList.add("text-hide")
  const span = document.createElement("label");
  span.innerText = inputed.text;
  span.setAttribute('label', inputed.id)
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  // li.prepend(check);
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(check)
  todoList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const newToDo = todoInput.value;
  todoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  todos.push(newToDoObj);
  printToDo(newToDoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {// savedToDos !== null
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(printToDo);
}