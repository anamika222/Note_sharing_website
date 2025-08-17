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
