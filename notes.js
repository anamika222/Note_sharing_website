// Search notes by title
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".note-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".card-title").innerText.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  });

  // Filter buttons
  const buttons = document.querySelectorAll(".filter-buttons .btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const subject = button.textContent.trim().toLowerCase();
      cards.forEach(card => {
        const subjectText = card.getAttribute("data-subject").toLowerCase();
        if (subject === "all" || subjectText === subject) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // sample: only show cards matching clicked subject
document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const subject = button.textContent.trim().toLowerCase();

    document.querySelectorAll('.note-card').forEach(card => {
      const match = card.classList.contains(subject) || subject === "all";
      card.parentElement.style.display = match ? "block" : "none";
    });
  });
});

document.querySelectorAll('.btn-view').forEach(button => {
  button.addEventListener('click', () => {
    const viewCount = button.closest('.note-card').querySelector('.view-number');
    let currentCount = parseInt(viewCount.textContent);
    viewCount.textContent = currentCount + 1;
  });
});

});
