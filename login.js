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


// === Backend hookup ===
document.getElementById("loginForm").addEventListener("submit", async function(e){
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  try{
    const res = await fetch("api/login.php", {method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email, password})});
    const data = await res.json();
    if(data.ok){
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "index.html";
    }else{
      const err = document.getElementById("loginError");
      if(err){ err.textContent = data.error || "Login failed"; err.style.display="block"; }
      else alert(data.error || "Login failed");
    }
  }catch(err){ alert("Network error"); }
});
