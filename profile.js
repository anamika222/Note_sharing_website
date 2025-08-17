document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    loadUploadedNotes();
});

function loadUserProfile() {
    document.getElementById("username").textContent = "John Doe";
    document.getElementById("email").textContent = "johndoe@example.com";
    document.getElementById("bio").textContent = "📚 Passionate learner and note sharer.";
    document.getElementById("join-date").textContent = "January 2025";
}

function loadUploadedNotes() {
    const notesList = document.getElementById("notes-list");
    const notes = [
        { title: "Math Notes", file: "math.pdf" },
        { title: "Science Notes", file: "science.pdf" },
        { title: "History Notes", file: "history.pdf" }
    ];

    notes.forEach(note => {
        const card = document.createElement("div");
        card.classList.add("note-card");

        card.innerHTML = `
            <h3>${note.title}</h3>
            <button onclick="showNote('${note.file}')">Show</button>
            <button class="delete" onclick="deleteNote('${note.title}')">Delete</button>
        `;

        notesList.appendChild(card);
    });
}

function showNote(file) {
    window.open(file, "_blank");
}

function deleteNote(title) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        alert(`"${title}" has been deleted.`);
    }
}

function changeProfilePic() {
    document.getElementById("file-input").click();
}

document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// === Backend hookup: my notes + delete ===
async function loadMyNotes(){
  const res = await fetch("api/notes_list.php?mine=1");
  const data = await res.json();
  const container = document.getElementById("uploadedNotes");
  if (!container) return;
  container.innerHTML = "";
  if (data.ok && data.notes.length){
    data.notes.forEach(n=>{
      const div = document.createElement("div");
      div.className = "note-item";
      div.innerHTML = `
        <div>
          <h3>${n.title}</h3>
          <p>Subject: ${n.topic}</p>
          ${n.file_path ? `<button onclick="viewPDF('${n.file_path}')" class="btn-view">View</button>`:""}
          <button class="btn-delete" data-id="${n.id}">Delete</button>
        </div>`;
      container.appendChild(div);
    });
    container.querySelectorAll(".btn-delete").forEach(b=>{
      b.addEventListener("click", async ()=>{
        const id = b.dataset.id;
        if (!confirm("Delete this note and its quizzes?")) return;
        const res = await fetch("api/note_delete.php", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({note_id:id})});
        const data = await res.json();
        if (data.ok) loadMyNotes();
        else alert(data.error || "Delete failed");
      });
    });
  }else{
    container.innerHTML = "<p class='text-muted'>No uploaded notes yet.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadMyNotes);
