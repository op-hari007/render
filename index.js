const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  const log = ${timestamp} - IP: ${ip}\n;

  // Append to a text file
  fs.appendFileSync(path.join(__dirname, 'ip-log.txt'), log);

  // Also log in terminal
  console.log(log);

  res.send(<h1>Hello 👋</h1><p>Your IP has been logged.</p>);
});

app.get('/view', (req, res) => {
  const logs = fs.readFileSync(path.join(__dirname, 'ip-log.txt'), 'utf-8');
  res.type('text').send(logs);
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
