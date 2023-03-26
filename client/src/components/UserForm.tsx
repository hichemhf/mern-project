import { MouseEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const UserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  const createUser = (event: MouseEvent<HTMLButtonElement>) => {
    const url = "http://localhost:3001/createUser";
    if (name && age && email) {
      axios
        .post(url, {
          name,
          age,
          email,
        })
        .then((res) => res.data);
    }
  };
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(Number(e.currentTarget.value))}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <button onClick={createUser}>Create User</button>
    </div>
  );
};