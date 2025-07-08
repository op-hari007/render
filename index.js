const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - IP: ${ip}\n`;

  fs.appendFileSync(path.join(__dirname, 'ip-log.txt'), log);
  console.log(log);

  res.send(<h1>Hello 👋</h1><p>Your IP has been logged. (${ip})</p>);
});

app.get('/view', (req, res) => {
  const filePath = path.join(__dirname, 'ip-log.txt');
  if (fs.existsSync(filePath)) {
    const logs = fs.readFileSync(filePath, 'utf-8');
    res.type('text').send(logs);
  } else {
    res.status(404).send('No logs yet.');
  }
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
