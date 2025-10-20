
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';
import "./main.css";
function MyApp() {
  const [characters, setCharacters] = useState([]);


   useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        setCharacters(data.users_list || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);
  async function removeOneCharacter(id) {
    try {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        setCharacters((prev) => prev.filter((c) => c._id !== id));
      } else {
        console.log("Delete failed, status:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  
async function updateList(person) {
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
      });
      if (res.status === 201) {
        const newUser = await res.json();
        setCharacters((prev) => [...prev, newUser]);
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;