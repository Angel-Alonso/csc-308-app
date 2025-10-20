import express from "express";
import cors from "cors";
import userServices from "./Database/user-services.js";

const app = express();
const port = 8000;
app.use(cors()); 
app.use(express.json());



app.get("/users",async (req, res) => {
  try{
    const user = await userServices.getUsers(req.query.name,req.query.job);
    res.json({user_list: user});

  }catch(erro){
    res.status(500).json({error: erro.messsge});
  }

  
});


app.get("/users/:id",async (req, res) => {
  try{
    const user = await userServices.findUserById(req.params.id)
    if(!user)
      return res.status(404).json({error: "User not found"});
    res.json(user);

  }catch(erro){
    res.status(500).json({error: erro.message});
  }
});


app.delete("/users/:id", async(req, res) => {
  try{
    const deleted = await userServices.deleteUserById(req.params.id);
    if(!deleted)
      return res.status(404).json({error: "User not found"});
    res.status(204).send();
  }catch(erro){
    res.status(500).json({error: erro.message})
  }
});

app.post("/users", async(req, res) => {
  try{
    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser); 

  }catch(erro){
    res.status(400).json({ error: erro.message})
  }
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});