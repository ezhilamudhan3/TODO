// Local storage keys
const USER_KEY = "user";
const TODO_KEY = "todos";

// Show Signup page
function showSignupPage() {
  document.getElementById("signupPage").style.display = "block";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("todoPage").style.display = "none";
}

// Show Login page
function showLoginPage() {
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("todoPage").style.display = "none";
}

// Show Todo page
function showTodoPage() {
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("todoPage").style.display = "block";
  loadTodos();
}

// Validate Signup Form
function validateSignup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    document.getElementById("signupError").innerText = "Passwords do not match";
    return false;
  }

  const user = { username, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  showLoginPage();
  return false;
}

// Validate Login Form
function validateLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem(USER_KEY));

  if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
    document.getElementById("loginError").innerText = "Invalid username or password";
    return false;
  }

  showTodoPage();
  return false;
}

// Add Todo Item
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value;
  const todos = JSON.parse(localStorage.getItem(TODO_KEY)) || [];

  todos.push(todoText);
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  todoInput.value = "";
  loadTodos();
  return false;
}

// Load Todos
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo;
    listItem.addEventListener("click", () => removeTodo(index));
    todoList.appendChild(listItem);
  });
}

// Remove Todo Item
function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem(TODO_KEY));
  todos.splice(index, 1);
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  loadTodos();
}

// Logout
function logout() {
  showLoginPage();
}
