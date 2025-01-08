const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Serve static files
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Root route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to get all quotes
app.get("/api/quotes", (req, res) => {
  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error loading quotes" });
    } else {
      const quotes = JSON.parse(data);
      res.json(quotes);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
