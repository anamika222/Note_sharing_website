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


// === Backend hookup: fetch and render notes ===
async function loadNotes(query="", topic=""){
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (topic && topic!=="all") params.set("topic", topic);
  const res = await fetch("api/notes_list.php?" + params.toString());
  const data = await res.json();
  const container = document.getElementById("notesContainer");
  if (!container) return;
  container.innerHTML = "";
  if (data.ok && data.notes.length){
    data.notes.forEach(n=>{
      const div = document.createElement("div");
      div.className = "col-md-4";
      div.innerHTML = `
        <div class="card note-card">
          <div class="card-body">
            <h5 class="card-title">${n.title}</h5>
            <p class="card-text"><strong>Subject:</strong> ${n.topic}</p>
            <p class="card-text"><small>By ${n.author}</small></p>
            <div class="d-flex gap-2">
              ${n.file_path ? `<a href="${n.file_path}" target="_blank" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i> View File</a>`:""}
              <a href="quiz.html?note_id=${n.id}" class="btn btn-sm btn-outline-primary">Take Quiz</a>
            </div>
          </div>
        </div>`;
      container.appendChild(div);
    });
  }else{
    container.innerHTML = "<p class='text-muted'>No notes found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  loadNotes();
  const search = document.getElementById("searchInput");
  if (search){
    search.addEventListener("input", ()=> loadNotes(search.value));
  }
  document.querySelectorAll(".filter-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> loadNotes("", btn.dataset.subject));
  });
});
