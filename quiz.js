document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start-quiz-btn');
  const quizLanding = document.getElementById('quizLanding');
  const quizInterface = document.getElementById('quizInterface');
  const quizResult = document.getElementById('quizResult');
  const submitQuizBtn = document.getElementById('submitQuizBtn');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      quizLanding.style.display = 'none';
      quizInterface.style.display = 'block';
    });
  }

  if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', () => {
      quizInterface.style.display = 'none';
      quizResult.style.display = 'block';
    });
  }
});
