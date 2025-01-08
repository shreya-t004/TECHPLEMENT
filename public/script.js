let quotes = [];
let currentIndex = 0;

// Fetch quotes from the backend API
async function fetchQuotes() {
  try {
    const response = await fetch("/api/quotes");
    quotes = await response.json();
    if (quotes.length > 0) {
      displayQuote(currentIndex);
    } else {
      document.getElementById("quote").textContent = "No quotes available.";
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
    document.getElementById("quote").textContent = "Error loading quotes.";
  }
}

// Display the current quote
function displayQuote(index) {
  const quote = quotes[index];
  document.getElementById("quote").textContent = `"${quote.text}"`;
  document.getElementById("author").textContent = `- ${
    quote.author || "Unknown"
  }`;
  updateButtons();
}

// Update the state of navigation buttons
function updateButtons() {
  document.getElementById("prev-btn").disabled = currentIndex === 0;
  document.getElementById("next-btn").disabled =
    currentIndex === quotes.length - 1;
}

// Show the previous quote
function showPreviousQuote() {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuote(currentIndex);
  }
}

// Show the next quote
function showNextQuote() {
  if (currentIndex < quotes.length - 1) {
    currentIndex++;
    displayQuote(currentIndex);
  }
}

// Initialize the app
document
  .getElementById("prev-btn")
  .addEventListener("click", showPreviousQuote);
document.getElementById("next-btn").addEventListener("click", showNextQuote);
fetchQuotes();
