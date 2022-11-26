const express = require('express');
const db = require('./config/connection');
const api = require('./controllers/api');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(api);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });
});
