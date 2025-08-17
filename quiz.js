document.addEventListener("DOMContentLoaded", () => {
  const startButtons = document.querySelectorAll(".start-quiz-btn");
  const quizLanding = document.getElementById("quizLanding");
  const quizInterface = document.getElementById("quizInterface");
  const quizResult = document.getElementById("quizResult");
  const submitBtn = document.getElementById("submitQuizBtn");
  const quizTimer = document.getElementById("quizTimer");

  // Start Quiz
  startButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      quizLanding.style.display = "none";
      quizInterface.style.display = "block";
      quizResult.style.display = "none";
      // startTimer(5 * 60); // Optional: Start 5 min timer
    });
  });

  // Submit Quiz
  submitBtn.addEventListener("click", () => {
    let score = 0;
    const total = 2;

    // Question 1 - Answer: #
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "#") {
      score++;
    }

     const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value === "int") {
      score++;
    }

    quizInterface.style.display = "none";
    quizResult.style.display = "block";
    quizResult.innerHTML = `
      <h3 class="mb-3">🎉 Quiz Results</h3>
      <p>You scored <strong>${score}/${total}</strong></p>
      <button class="btn btn-secondary mt-3" onclick="location.href='index.html'">Go to Homepage</button>
    `;
  });

  // Optional Timer Function
  function startTimer(duration) {
    let time = duration;
    const interval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      quizTimer.textContent = `⏱️ Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      time--;

      if (time < 0) {
        clearInterval(interval);
        alert("⏰ Time's up! Submitting quiz...");
        submitBtn.click(); // Auto-submit
      }
    }, 1000);
  }

  const leaderboardData = [
  { name: "Shuvo", score: 5 },
  { name: "Mim", score: 4 },
  { name: "Tanvir", score: 4 },
];

function renderLeaderboard() {
  const container = document.getElementById("quizLeaderboard");
  const list = container.querySelector(".leaderboard-list");

  list.innerHTML = "";

  leaderboardData.forEach((entry, index) => {
    const rankIcon = ["🥇", "🥈", "🥉"][index] || "🎖️";
    const li = document.createElement("li");
    li.innerHTML = `<span class="rank">${rankIcon}</span> ${entry.name} - <strong>${entry.score}/5</strong>`;
    list.appendChild(li);
  });
}

// Call this after quiz submission or when needed
renderLeaderboard();

});
