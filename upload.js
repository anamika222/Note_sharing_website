// ✅ upload.js

// Show new course field when "Add More Courses" is selected
document.getElementById("subject").addEventListener("change", function () {
  const newCourseField = document.getElementById("newCourseField");
  newCourseField.classList.toggle("d-none", this.value !== "add-course");
});

// Add new course dynamically
document.getElementById("addNewCourse").addEventListener("click", function () {
  const input = document.getElementById("newCourseInput");
  const subject = document.getElementById("subject");

  const newOption = document.createElement("option");
  newOption.value = input.value;
  newOption.textContent = input.value;
  newOption.selected = true;
  subject.appendChild(newOption);

  input.value = "";
  document.getElementById("newCourseField").classList.add("d-none");
});

// Save form data before going to quiz page
document.getElementById("makeQuizBtn").addEventListener("click", function () {
  const subject = document.getElementById("subject").value;
  const title = document.getElementById("title").value;
  const fileInput = document.getElementById("file");
  const fileName = fileInput.files[0] ? fileInput.files[0].name : "";

  localStorage.setItem("uploadForm", JSON.stringify({
    subject,
    title,
    fileName
  }));

  window.location.href = "quiz.html";
});

// Handle final note + quiz submission
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const quizData = JSON.parse(localStorage.getItem("quizData")) || [];

  if (quizData.length === 0) {
    alert("❗ Please create your quiz first.");
    return;
  }

  const formData = {
    subject: document.getElementById("subject").value,
    title: document.getElementById("title").value,
    file: document.getElementById("file").files[0]?.name,
    quiz: quizData
  };

  console.log("✅ Final Form Data:", formData);

  alert("✅ Notes & Quiz submitted successfully!");
  localStorage.removeItem("quizData");
  localStorage.removeItem("uploadForm");
  this.reset();
});

// Restore saved form data if exists
window.addEventListener("DOMContentLoaded", function () {
  const saved = JSON.parse(localStorage.getItem("uploadForm"));
  if (!saved) return;

  // Restore subject
  const subjectSelect = document.getElementById("subject");
  const subjectOption = Array.from(subjectSelect.options).find(
    opt => opt.value === saved.subject
  );

  if (subjectOption) {
    subjectOption.selected = true;
  } else if (saved.subject) {
    const newOption = document.createElement("option");
    newOption.value = saved.subject;
    newOption.textContent = saved.subject;
    newOption.selected = true;
    subjectSelect.appendChild(newOption);
  }

  // Restore title
  document.getElementById("title").value = saved.title || "";

  // Show filename (we can't restore the File object, just its name)
  if (saved.fileName) {
    const fileLabel = document.createElement("div");
    fileLabel.className = "text-muted small mt-1";
    fileLabel.textContent = `Previously selected file: ${saved.fileName}`;
    document.getElementById("file").insertAdjacentElement("afterend", fileLabel);
  }
});

// === Backend hookup for upload ===
document.getElementById("uploadForm").addEventListener("submit", async function(e){
  e.preventDefault();
  const subjectSel = document.getElementById("subject");
  let topic_name = null, topic_id = null;
  if (subjectSel.value === "add-course") {
    topic_name = document.getElementById("newCourseInput").value.trim();
  } else {
    topic_name = subjectSel.value;
  }
  const title = document.getElementById("title").value.trim();
  const file = document.getElementById("file").files[0] || null;
  const savedQuiz = localStorage.getItem("quizData");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("topic_name", topic_name);
  if (file) formData.append("file", file);
  if (savedQuiz) formData.append("quiz_json", savedQuiz);
  try{
    const res = await fetch("api/note_create.php", {method:"POST", body: formData});
    const data = await res.json();
    if(data.ok){
      alert("✅ Notes & Quiz submitted successfully!");
      localStorage.removeItem("quizData");
      localStorage.removeItem("uploadDraft");
      window.location.href = "profile.html";
    }else{
      alert(data.error || "Upload failed");
    }
  }catch(err){ alert("Network error"); }
});
