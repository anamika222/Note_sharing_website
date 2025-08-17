let questionCount = 0;

document.getElementById("addQuestionBtn").addEventListener("click", () => {
  questionCount++;

  const container = document.getElementById("quizQuestions");

  const questionBox = document.createElement("div");
  questionBox.className = "mb-4 p-3 border rounded position-relative bg-light";

  questionBox.innerHTML = `
    <h6 class="fw-bold mb-3">Question ${questionCount}</h6>

    <label>Question:</label>
    <input type="text" class="form-control mb-3 question-text" placeholder="Enter your question" required>

    <div class="row g-3">
      ${["A", "B", "C", "D"].map((opt) => `
        <div class="col-12 col-md-6">
          <div class="input-group">
            <div class="input-group-text">
              <input type="radio" name="correct${questionCount}" value="${opt}" required>
            </div>
            <input type="text" class="form-control option-input" placeholder="Option ${opt}" required>
          </div>
        </div>
      `).join("")}
    </div>

    <button type="button" class="btn btn-outline-danger btn-sm mt-3 remove-question">🗑️ Remove</button>
  `;

  // Remove button
  questionBox.querySelector(".remove-question").addEventListener("click", () => {
    questionBox.remove();
    updateNumbers();
  });

  container.appendChild(questionBox);
});

function updateNumbers() {
  const all = document.querySelectorAll("#quizQuestions > div");
  all.forEach((q, i) => {
    q.querySelector("h6").textContent = `Question ${i + 1}`;
  });
}

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const questions = document.querySelectorAll("#quizQuestions > div");
  const quizData = [];

  questions.forEach((q, index) => {
    const questionText = q.querySelector(".question-text").value.trim();
    const options = q.querySelectorAll(".option-input");
    const correct = q.querySelector("input[type='radio']:checked");

    if (!questionText || options.length < 4 || !correct) {
      alert(`⚠️ Complete Question ${index + 1}`);
      return;
    }

    const optionValues = Array.from(options).map(i => i.value.trim());
    quizData.push({
      question: questionText,
      options: {
        A: optionValues[0],
        B: optionValues[1],
        C: optionValues[2],
        D: optionValues[3],
      },
      correct: correct.value
    });
  });

  localStorage.setItem("quizData", JSON.stringify(quizData));
  window.location.href = "upload.html"; // back to upload
});
