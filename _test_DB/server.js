const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 4000;

// Connect to the SQLite database
const db = new sqlite3.Database('./ladies_oracle.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable CORS
app.use(cors());

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM Questions', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).send(err.message);
    } else {
      console.log('Data fetched:', rows);
      res.json(rows);
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint available at https://redesigned-funicular-7x7vwpx9wr9hw66w-4000.app.github.dev/api/data`);
});

