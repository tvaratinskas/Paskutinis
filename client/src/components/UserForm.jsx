import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Vartotojas sukurtas:", data))
      .catch((error) => console.error("Klaida:", error));
  };

  return (
    <div>
      <h2>Vartotojo registracija</h2>
      <form onSubmit={handleSubmit}>
        <label>Vardas:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br />
        <label>Pavardė:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br />
        <label>El. paštas:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label>Amžius:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />
        <button>Registruoti</button>
      </form>
    </div>
  );
};

export default UserForm;
