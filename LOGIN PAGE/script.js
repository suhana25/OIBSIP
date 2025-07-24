function showLogin() {
  document.getElementById("login-page").style.display = "block";
  document.getElementById("register-page").style.display = "none";
  document.getElementById("dashboard-page").style.display = "none";
}

function showRegister() {
  document.getElementById("register-page").style.display = "block";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("dashboard-page").style.display = "none";
}

function showDashboard(username) {
  document.getElementById("dashboard-page").style.display = "block";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("register-page").style.display = "none";
  document.getElementById("user-name").textContent = username;
}

function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const message = document.getElementById("register-message");

  if (!username || !password) {
    message.textContent = "Please enter both username and password.";
    return;
  }

  if (localStorage.getItem(username)) {
    message.textContent = "Username already exists.";
    return;
  }

  localStorage.setItem(username, password);  // Storing plain password (insecure)
  message.textContent = "Registered successfully! You can now log in.";
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("login-message");

  const storedPassword = localStorage.getItem(username);

  if (!storedPassword) {
    message.textContent = "User does not exist.";
    return;
  }

  if (storedPassword === password) {
    sessionStorage.setItem("loggedInUser", username);
    showDashboard(username);
  } else {
    message.textContent = "Incorrect password.";
  }
}

function logout() {
  sessionStorage.removeItem("loggedInUser");
  showLogin();
}

// Auto login if session exists
window.onload = () => {
  const user = sessionStorage.getItem("loggedInUser");
  if (user) {
    showDashboard(user);
  } else {
    showLogin();
  }
};
