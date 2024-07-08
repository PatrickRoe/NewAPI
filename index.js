import express from "express";
import deleteUser from "./middleware/deleteUserEmailPw.js";
const app = express();
const PORT = 3000;

app.use(express.json());

// User die ich selber erstellt hab.
const users = [
  {
    id: 1,
    name: "Oli",
    alter: 25,
    email: "oli@hotmail.de",
    password: "1234",
  },
  {
    id: 2,
    name: "Klaus",
    alter: 45,
    email: "klaus@hotmail.de",
    password: "4321",
  },
  {
    id: 3,
    name: "Peter",
    alter: 55,
    email: "peter@hotmail.de",
    password: "2222",
  },
];
// neue user werden erstellt.

app.post("/user", (req, res) => {
  const { name, alter, email, password } = req.body;

  const id = {
    id: users.length + 1,
    name,
    alter,
    email,
    password,
  };
  users.push(id);
  res.json(id);
});

//user anfrage, email und passwort wird weg gelassen.

app.get("/user", (req, res) => {
    const userInfo = users.map((user) => {
    const { email, password, ...userInfo } = user;
    return userInfo;
  });
  res.json(userInfo);
});

//user aktualisieren.

app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, alter } = req.body;
  const userUpdate = users.find((user) => user.id === userId);

  if (userUpdate) {
    userUpdate.name = name;
    userUpdate.alter = alter;
    res.json(userUpdate);
  } else {
    res
      .status(404)
      .json({ message: `User mit der ID ${userId} nicht vorhanden` });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
