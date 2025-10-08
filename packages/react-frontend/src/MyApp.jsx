
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';
import "./main.css";
function MyApp() {
  const [characters, setCharacters] = useState([]);

 function removeOneCharacter(id) {
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        setCharacters(characters.filter((character) => character.id !== id));
      } else if (res.status === 404) {
        console.log("User not found");
      } else {
        console.log("Delete failed, status:", res.status);
      }
    })
    .catch((error) => console.log(error));
}

  
  
function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}
useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );
 function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  
function updateList(person) { 
    postUser(person)
      .then((res) => {
      if (res.status === 201) {
        return res.json(); 
      } else {
        throw new Error("Failed to create user");
      }
    })
    .then((newUser) => {
      setCharacters(prevCharacters => [...prevCharacters, newUser]);
    })
    .catch((error) => console.log(error));
  }


  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;