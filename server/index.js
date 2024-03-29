const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const bodyParser = require('body-parser');

const responseFormat = {
  success: true,
  data: null,
  error: null
}

const getParsedDb = () => {
  const db = fs.readFileSync('./db.json');
  return JSON.parse(db);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  const dbParsed = getParsedDb();
  const dbNotes = dbParsed.notes || {};

  res.send({
    ...responseFormat,
    data: dbNotes
  });
});

app.post('/note/add', (req, res) => {
  const dbParsed = getParsedDb();
  const { title, text } = req.body;

  if (typeof title !== 'string' || !title || typeof text !== 'string' || !text) {
    res.status(500).send({
      ...responseFormat,
      success: false,
      error: 'Data error',
    });
  }

  const newItemId = `${Math.floor(Math.random() * 999999)}`;

  dbParsed.notes[newItemId] = {
    id: newItemId,
    title,
    text,
  };

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({
    ...responseFormat,
    data: { id: newItemId }
  });
});

app.post('/note/update', (req, res) => {
  const dbParsed = getParsedDb();

  const { title, text, id } = req.body;

  if (typeof title !== 'string' || !title || typeof text !== 'string' || !text) {
    res.status(500).send({
      ...responseFormat,
      success: false,
      error: 'Data error',
    });
  }

  dbParsed.notes[id] = {
    ...dbParsed.notes[id],
    title,
    text,
  };

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({ success: true });
});

app.post('/note/delete', (req, res) => {
  const dbParsed = getParsedDb();

  const targetId = req.body.id;

  if (typeof targetId === 'undefined' || typeof dbParsed.notes[targetId] === 'undefined') {
    res.status(500).send({
      ...responseFormat,
      success: false,
      error: 'Element doesn`t exist',
    });
  }

  delete dbParsed.notes[targetId];

  fs.writeFileSync('./db.json', JSON.stringify(dbParsed));

  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
