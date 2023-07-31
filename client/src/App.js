import React from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./styles.css";

const App = () => {
  return (
    <div className="container">
      <h1 className="primary-color">Renginių organizavimo įmonė</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
