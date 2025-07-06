document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("loginError");

  // Simple validation
  if (email === "" || password === "") {
    errorDiv.textContent = "Please fill in all fields.";
    errorDiv.style.display = "block";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    errorDiv.textContent = "Invalid email format.";
    errorDiv.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters.";
    errorDiv.style.display = "block";
    return;
  }

  errorDiv.style.display = "none";

  // Simulate login success
  alert("Login successful! Redirecting to homepage...");
  window.location.href = "index.html"; // go back to home
});
