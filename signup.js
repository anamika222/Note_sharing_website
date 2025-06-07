function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  }
  
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorDiv = document.getElementById("error");
  
    if (name === "" || email === "" || password === "") {
      errorDiv.textContent = "All fields marked * are required.";
      errorDiv.style.display = "block";
      return;
    }
  
    if (!email.includes("@") || !email.includes(".")) {
      errorDiv.textContent = "Please enter a valid email address.";
      errorDiv.style.display = "block";
      return;
    }
  
    if (password.length < 6) {
      errorDiv.textContent = "Password must be at least 6 characters.";
      errorDiv.style.display = "block";
      return;
    }
  
    errorDiv.style.display = "none";
    alert("Sign-up successful!");
    // You can redirect or save to server here
  });
  