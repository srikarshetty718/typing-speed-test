const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are a great way to improve speed.",
  "Practice makes perfect when coding every day.",
  "JavaScript is fun once you understand it well.",
];

let quote = "";
let timer = 0;
let timerInterval;
let started = false;

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function renderNewQuote() {
  quote = getRandomQuote();
  document.getElementById("quoteDisplay").innerText = quote;
  document.getElementById("quoteInput").value = "";
  document.getElementById("timer").innerText = 0;
  document.getElementById("wpm").innerText = 0;
  document.getElementById("accuracy").innerText = 100;
  timer = 0;
  started = false;
  clearInterval(timerInterval);
}

function startTyping() {
  const input = document.getElementById("quoteInput").value;

  if (!started) {
    started = true;
    timerInterval = setInterval(() => {
      timer++;
      document.getElementById("timer").innerText = timer;
    }, 1000);
  }

  if (input === quote) {
    clearInterval(timerInterval);
    alert("✅ Typing Complete!");
  }

  calculateStats(input);
}

function calculateStats(input) {
  const words = input.trim().split(" ").length;
  const wpm = timer > 0 ? Math.round((words / timer) * 60) : 0;
  document.getElementById("wpm").innerText = wpm;

  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === quote[i]) correct++;
  }

  const accuracy = quote.length > 0 ? Math.round((correct / quote.length) * 100) : 100;
  document.getElementById("accuracy").innerText = accuracy;
}

function resetTest() {
  renderNewQuote();
}

window.onload = renderNewQuote;
