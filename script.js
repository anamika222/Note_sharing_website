document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('menu-toggle');
  const viewNotesBtn = document.getElementById('viewNotesBtn');
  const quizBtn = document.getElementById('quizBtn');
  const viewNotesSection = document.getElementById('viewNotesSection');
  const quizSection = document.getElementById('quizSection');

  function hideAllSections() {
    viewNotesSection.style.display = 'none';
    quizSection.style.display = 'none';
  }

  function setActive(button) {
    [viewNotesBtn, quizBtn].forEach(btn => btn.classList.remove('active-link'));
    button.classList.add('active-link');
  }

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  viewNotesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    viewNotesSection.style.display = 'block';
    sidebar.classList.remove('active');
    setActive(viewNotesBtn);
  });

  

  // Optional password toggle (for signup.html)
  const togglePassword = document.getElementById('togglePassword');
  if (togglePassword) {
    togglePassword.addEventListener('click', function () {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
      } else {
        alert('✅ Signup successful!');
      }
    });
  }

  // Initial: Show only content section or hide all if you're navigating
  hideAllSections();
});
