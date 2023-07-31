import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", formData);
      setEvents([...events, response.data]);
      setFormData({ name: "", email: "", age: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}`, formData);
      setEvents(
        events.map((event) => (event._id === id ? response.data : event))
      );
      setFormData({ name: "", email: "", age: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z]+"
            title="Įveskite tik raides"
            required
          />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
      <h2>Registered Attendees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.email}</td>
              <td>{event.age}</td>
              <td>
                <button onClick={() => handleUpdate(event._id)}>Update</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Event;
