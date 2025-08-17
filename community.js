const OPENAI_API_KEY = "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"; 


function openChat() {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.style.display = "block";
  chatContainer.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div class="user-msg"><strong>You:</strong> ${userInput}</div>`;
  document.getElementById("userInput").value = "";

  // Call ChatGPT API using fetch (requires actual OpenAI API key and backend)
  try {
    const response = await fetch("https://platform.openai.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your real API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an academic assistant." },
          { role: "user", content: userInput }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    chatBox.innerHTML += `<div class="bot-msg"><strong>GPT:</strong> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div class="bot-msg"><strong>GPT:</strong> Sorry, I couldn’t connect to ChatGPT.</div>`;
  }
});
