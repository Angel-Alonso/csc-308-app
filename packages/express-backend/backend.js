import express from "express";

const app = express();
const port = 8000;

app.use(express.json());
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user.name === name && user.job === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);}
    else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }

  
});
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
const deleteUserById = (id) => {
  const userIndex = users["users_list"].findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users["users_list"].splice(userIndex, 1); 
    return true;
  }
  return false;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);
  if (deleted) {
    res.status(200).send({ message: `User with id ${id} deleted.` });
  } else {
    res.status(404).send({ error: "User not found." });
  }
});
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});