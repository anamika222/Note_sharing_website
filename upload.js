document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const subject = document.getElementById('subject').value;
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const file = document.getElementById('file').files[0];

  if (!subject || !title || !description || !file) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate upload success (replace with backend logic later)
  document.getElementById('uploadMessage').textContent = "✅ Note uploaded successfully!";

   // Clear form fields
  document.getElementById('uploadForm').reset();

  // 🔁 Redirect to homepage after 3 seconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});

