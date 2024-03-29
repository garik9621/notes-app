const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  const db = fs.readFileSync('./db.json');

  res.send(JSON.parse(db));
});

app.post('/note/add', (req, res) => {
  const db = fs.readFileSync('./db.json');
  const dbParsed = JSON.parse(db);
  const requestData = req.body.data;

  if (typeof requestData.title !== 'string' || !requestData.title) {
    // send error
  }

  if (typeof requestData.text !== 'string' || !requestData.text) {
    // send error
  }

  const id = '1';

  const newItem = {
    id,
    ...req.body.data,
  };

  dbParsed.notes[id] = newItem;

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({ id });
});

app.post('/note/update', (req, res) => {
  const db = fs.readFileSync('./db.json');
  const dbParsed = JSON.parse(db);
  const requestData = req.body.data;

  const targetId = req.body.data.id;

  if (typeof requestData.title !== 'string' || !requestData.title) {
    // send error
  }

  if (typeof requestData.text !== 'string' || !requestData.text) {
    // send error
  }

  dbParsed.notes[targetId] = requestData;

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({ id });
});

app.delete('/note/delete', (req, res) => {
  const db = fs.readFileSync('./db.json');
  const dbParsed = JSON.parse(db);

  const targetId = req.body.id;

  if (typeof dbParsed.notes[targetId] === 'undefined') {
    // send error
  }

  delete dbParsed.notes[targetId];

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
