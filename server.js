const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Data file (where the notebooks are stored)
const dataFilePath = path.join(__dirname, 'notebooks.json');

// Helper function to read data from file
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data to file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Get all notebooks
app.get('/notebooks', (req, res) => {
  const notebooks = readData();
  res.json(notebooks);
});

// Get a specific notebook by ID
app.get('/notebooks/:id', (req, res) => {
  const notebooks = readData();
  const notebook = notebooks.find(n => n.id === req.params.id);

  if (notebook) {
    res.json(notebook);
  } else {
    res.status(404).send('Notebook not found');
  }
});

// Create a new notebook
app.post('/notebooks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send('Title is required');
  }

  const notebooks = readData();
  const newNotebook = { id: Date.now().toString(), title };
  notebooks.push(newNotebook);

  writeData(notebooks);
  res.status(201).json(newNotebook);
});

// Update a notebook
app.put('/notebooks/:id', (req, res) => {
  const { title } = req.body;
  const notebooks = readData();
  const notebookIndex = notebooks.findIndex(n => n.id === req.params.id);

  if (notebookIndex === -1) {
    return res.status(404).send('Notebook not found');
  }

  notebooks[notebookIndex].title = title;
  writeData(notebooks);
  res.json(notebooks[notebookIndex]);
});

// Delete a notebook
app.delete('/notebooks/:id', (req, res) => {
  const notebooks = readData();
  const notebookIndex = notebooks.findIndex(n => n.id === req.params.id);

  if (notebookIndex === -1) {
    return res.status(404).send('Notebook not found');
  }

  notebooks.splice(notebookIndex, 1);
  writeData(notebooks);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
