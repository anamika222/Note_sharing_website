document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const agree = document.getElementById("agree").checked;
  const errorDiv = document.getElementById("error");

  // Reset error
  errorDiv.style.display = "none";
  errorDiv.textContent = "";

  // Basic empty check
  if (!name || !email || !password || !confirmPassword) {
    errorDiv.textContent = "All fields marked * are required.";
    errorDiv.style.display = "block";
    return;
  }

  // Email format check
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    errorDiv.style.display = "block";
    return;
  }

  // Password strength check
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordPattern.test(password)) {
    errorDiv.textContent = "Password must be at least 8 characters, include 1 capital letter and 1 special character.";
    errorDiv.style.display = "block";
    return;
  }

  // Confirm password match check
  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match.";
    errorDiv.style.display = "block";
    return;
  }

  // Terms agreement check
  if (!agree) {
    errorDiv.textContent = "You must agree to the terms and conditions.";
    errorDiv.style.display = "block";
    return;
  }

  // Success
  alert("Signup successful! Redirecting to homepage...");
  window.location.href = "index.html";
});

  