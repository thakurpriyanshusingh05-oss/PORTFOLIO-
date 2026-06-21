/* =========================================================
   Priyanshu Singh — Portfolio AI Assistant
   Drop this file in your project folder and add:
       <script src="chatbot.js"></script>
   right before </body> on every page. That's it — no
   backend, no API key, works on GitHub Pages as-is.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. What the assistant knows about Priyanshu ---------- */
  const profile = {
    name: "Priyanshu Singh",
    age: "18",
    birthday: "10th August 2007",
    city: "Ghaziabad",
    degree: "B.Tech in Computer Science Engineering",
    phone: "+91 7678639005",
    email: "thakurpriyanshusingh05@gmail.com",
    instagram: "https://www.instagram.com/priyanshu5836singh/",
    linkedin:
      "https://www.linkedin.com/in/priyanshu-singh-586712363",
  };

  /* ---------- 2. Intent knowledge base ---------- */
  // Each entry: keywords that trigger it + the reply to send.
  // First match by highest keyword overlap wins.
  const knowledgeBase = [
    {
      keywords: ["hi", "hello", "hey", "yo", "hii", "helo", "sup"],
      reply:
        "Hey there! 👋 I'm Priyanshu's AI assistant. Ask me about his skills, education, background, or how to get in touch.",
    },
    {
      keywords: [
        "who are you", "your name", "about you", "who is priyanshu",
        "tell me about him", "introduce", "about him", "about priyanshu",
      ],
      reply: `I'm ${profile.name} — a ${profile.degree} student based in ${profile.city}, India. He's passionate about technology and innovation, currently diving deep into Data Structures & Algorithms with C++ and building his frontend web development skills.`,
    },
    {
      keywords: ["age", "old", "how old"],
      reply: `Priyanshu is ${profile.age} years old.`,
    },
    {
      keywords: ["birthday", "born", "dob", "birth date"],
      reply: `His birthday is ${profile.birthday}.`,
    },
    {
      keywords: [
        "education", "degree", "study", "college", "studying",
        "course", "qualification", "b.tech", "btech",
      ],
      reply: `He's pursuing a ${profile.degree}. He's currently focused on Data Structures & Algorithms (DSA) using C++ alongside web development.`,
    },
    {
      keywords: ["city", "location", "live", "where", "based", "address"],
      reply: `He's based in ${profile.city}, Uttar Pradesh, India.`,
    },
    {
      keywords: [
        "skill", "skills", "frontend", "html", "css", "javascript",
        "js", "tech stack", "stack", "good at",
      ],
      reply:
        "Priyanshu's core skill is Frontend Development — he's proficient in HTML, CSS and JavaScript, and enjoys crafting responsive, user-centric web interfaces. He's also a strong problem solver.",
    },
    {
      keywords: [
        "dsa", "problem solving", "problem-solving", "algorithm",
        "algorithms", "data structure", "c++", "coding", "leetcode",
      ],
      reply:
        "He's a strong analytical thinker with hands-on DSA practice in C++ — solving a wide range of problems to sharpen logical reasoning, debugging, and writing efficient algorithms.",
    },
    {
      keywords: [
        "data science", "interest", "interests", "hobby", "hobbies",
        "passion", "passionate", "explore",
      ],
      reply:
        "Beyond frontend dev, he's passionate about exploring data science, and he enjoys sharing insights and knowledge with others.",
    },
    {
      keywords: ["project", "projects", "work", "portfolio", "built", "made"],
      reply:
        "This portfolio site itself — built from scratch with HTML, CSS and JavaScript — is one of his projects! He's actively building more as he grows his DSA and web dev skills.",
    },
    {
      keywords: ["contact", "reach", "connect", "hire", "talk to him", "get in touch"],
      reply: `You can reach Priyanshu at:\n📞 ${profile.phone}\n📧 ${profile.email}\nor check the Contact page for Instagram & LinkedIn links.`,
    },
    {
      keywords: ["phone", "number", "call", "mobile", "whatsapp"],
      reply: `His phone number is ${profile.phone}.`,
    },
    {
      keywords: ["email", "mail", "e-mail"],
      reply: `His email is ${profile.email}.`,
    },
    {
      keywords: ["instagram", "insta", "ig"],
      reply: `Here's his Instagram: ${profile.instagram}`,
    },
    {
      keywords: ["linkedin"],
      reply: `Here's his LinkedIn: ${profile.linkedin}`,
    },
    {
      keywords: ["thank", "thanks", "thank you", "thx"],
      reply: "You're welcome! Let me know if you'd like to know anything else about Priyanshu. 😊",
    },
    {
      keywords: ["bye", "goodbye", "see you", "later"],
      reply: "Thanks for stopping by! Feel free to reach out to Priyanshu directly anytime. 👋",
    },
  ];

  const fallbackReply =
    "I'm not totally sure about that one — but I can tell you about Priyanshu's skills, education, background, or how to contact him. Try one of the buttons below!";

  const quickReplies = ["Skills", "Education", "About him", "Contact"];

  /* ---------- 3. Simple keyword-matching engine ---------- */
  function getReply(userText) {
    const text = userText.toLowerCase().trim();
    if (!text) return fallbackReply;

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (text.includes(kw)) score += kw.split(" ").length; // longer phrase = stronger signal
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    return bestMatch ? bestMatch.reply : fallbackReply;
  }

  /* ---------- 4. Inject styles (scoped, matches site theme) ---------- */
  const style = document.createElement("style");
  style.textContent = `
    #pa-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: red;
      color: white;
      border: none;
      font-size: 26px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(255,0,0,0.45);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }
    #pa-toggle:hover { transform: scale(1.08); }

    #pa-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 340px;
      max-width: calc(100vw - 32px);
      height: 460px;
      max-height: calc(100vh - 140px);
      background: #1c1a1a;
      border: 1px solid red;
      border-radius: 14px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: Arial, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }
    #pa-window.pa-open { display: flex; }

    #pa-header {
      background: rgb(61,59,59);
      color: white;
      padding: 14px 16px;
      font-family: cursive;
      font-style: oblique;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    #pa-header span.pa-dot {
      display: inline-block;
      width: 9px;
      height: 9px;
      background: #3ddc55;
      border-radius: 50%;
      margin-right: 8px;
    }
    #pa-close {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
    }
    #pa-close:hover { color: red; }

    #pa-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: black;
    }
    .pa-msg {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      white-space: pre-line;
    }
    .pa-msg.bot {
      background: rgb(61,59,59);
      color: white;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
    }
    .pa-msg.user {
      background: red;
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }

    #pa-quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 14px 10px;
      background: black;
    }
    .pa-chip {
      background: transparent;
      border: 1px solid red;
      color: red;
      padding: 5px 10px;
      border-radius: 14px;
      font-size: 12px;
      cursor: pointer;
    }
    .pa-chip:hover { background: red; color: white; }

    #pa-inputbar {
      display: flex;
      border-top: 1px solid rgb(61,59,59);
      background: #1c1a1a;
    }
    #pa-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: white;
      padding: 12px;
      font-size: 14px;
    }
    #pa-send {
      background: none;
      border: none;
      color: red;
      font-size: 18px;
      padding: 0 16px;
      cursor: pointer;
    }
    #pa-send:hover { color: white; }

    @media (max-width: 480px) {
      #pa-window { right: 12px; left: 12px; width: auto; bottom: 88px; }
      #pa-toggle { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- 5. Build the widget DOM ---------- */
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "pa-toggle";
  toggleBtn.setAttribute("aria-label", "Open AI assistant");
  toggleBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';

  const win = document.createElement("div");
  win.id = "pa-window";
  win.innerHTML = `
    <div id="pa-header">
      <div><span class="pa-dot"></span>Priyanshu's Assistant</div>
      <button id="pa-close" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="pa-messages"></div>
    <div id="pa-quick"></div>
    <div id="pa-inputbar">
      <input id="pa-input" type="text" placeholder="Ask me about Priyanshu..." autocomplete="off" />
      <button id="pa-send" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(win);

  const messagesEl = win.querySelector("#pa-messages");
  const quickEl = win.querySelector("#pa-quick");
  const inputEl = win.querySelector("#pa-input");
  const sendBtn = win.querySelector("#pa-send");
  const closeBtn = win.querySelector("#pa-close");

  /* ---------- 6. Helpers ---------- */
  function addMessage(text, who) {
    const bubble = document.createElement("div");
    bubble.className = "pa-msg " + who;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botRespond(userText) {
    const reply = getReply(userText);
    // tiny delay so it feels like the bot is "thinking"
    setTimeout(() => addMessage(reply, "bot"), 350);
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage(text, "user");
    inputEl.value = "";
    botRespond(text);
  }

  function renderQuickReplies() {
    quickEl.innerHTML = "";
    quickReplies.forEach((label) => {
      const chip = document.createElement("button");
      chip.className = "pa-chip";
      chip.textContent = label;
      chip.addEventListener("click", () => {
        addMessage(label, "user");
        botRespond(label);
      });
      quickEl.appendChild(chip);
    });
  }

  /* ---------- 7. Events ---------- */
  let opened = false;
  toggleBtn.addEventListener("click", () => {
    win.classList.toggle("pa-open");
    if (!opened) {
      opened = true;
      addMessage(
        `Hi! I'm ${profile.name}'s AI assistant. 👋 Ask me anything about him, or tap a topic below.`,
        "bot"
      );
      renderQuickReplies();
    }
  });
  closeBtn.addEventListener("click", () => win.classList.remove("pa-open"));
  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
})();
