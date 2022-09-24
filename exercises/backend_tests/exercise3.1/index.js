const express = require("express");

const app = express();
app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (req, res) => {
  res.sendStatus(200).json(phonebook);
  res.end();
});

app.get("/info", (req, res) => {
  res.send(
    `<h3>Phonebook has info for ${
      phonebook.length
    } people</h3> \n <p>${new Date(Date.now())}</p>`
  );
  res.end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phonebook.find((person) => {
    return String(person.id) === id;
  });
  if (!contact) {
    return res.status(404).send("<P>There's no contact without that id</P>");
  }
  res.json(contact);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((person) => person.id === id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
    date: new Date(),
  };

  phonebook = phonebook.concat(contact);
  res.json(contact);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
