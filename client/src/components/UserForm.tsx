import { MouseEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const checkEmail = (email: string) => {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

const checkValidity = (name: string, age: number, email: string) => {
  return !!name && !!age && checkEmail(email);
};

//return false for "2e3" and "-23"
function isNumber(value: any): boolean {
  return /^\d{1,3}$/.test(value);
  // return /^\d+$/.test(value);
}

// //return true for "2e3" and "-23"
// function isNumber(value?: string | number): boolean {
//   return value != null && value !== "" && !isNaN(Number(value.toString()));
// }

export const UserForm = ({
  setRefresh: setRefresh,
}: {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  const createUser = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const url = "http://localhost:3001/createUser";
    if (isValid) {
      await axios
        .post(url, {
          name,
          age,
          email,
        })
        .then((res) => res.data);
      setRefresh((prec) => !prec);
      setName("");
      setAge(0);
      setEmail("");
    }
  };

  const handleAgeChange = (ageInputValue: string) => {
    isNumber(ageInputValue)
      ? setAge(Number(ageInputValue))
      : ageInputValue === ""
      ? setAge(0)
      : age;
  };

  const isValid = checkValidity(name, age, email);

  return (
    <Form className="form">
      <Form.Control
        value={name}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Form.Control
        value={age}
        type="number"
        placeholder="Age"
        onChange={(e) => handleAgeChange(e.currentTarget.value)}
      />
      <Form.Control
        value={email}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <Button
        type="submit"
        variant="success"
        onClick={createUser}
        disabled={!isValid}
      >
        Create User
      </Button>
    </Form>
  );
};
