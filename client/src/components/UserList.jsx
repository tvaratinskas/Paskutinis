import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Klaida:", error));
  }, []);

  return (
    <div>
      <h2 className="primary-color">Vartotojų sąrašas</h2>
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El. paštas</th>
            <th>Amžius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button className="success-color">Redaguoti</button>
                <button className="danger-color">Trinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
