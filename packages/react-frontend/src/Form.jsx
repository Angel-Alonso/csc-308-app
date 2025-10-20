import React, { useState } from "react";

function Form({handleSubmit}) {
  const [person, setPerson] = useState({ name: "", job: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault(); 
    if (!person.name || !person.job) return;
    handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  return (
     <form onSubmit={submitForm}>
      <label>Name</label>
      <input type="text" name="name" value={person.name} onChange={handleChange} />
      <label>Job</label>
      <input type="text" name="job" value={person.job} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
