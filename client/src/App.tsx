import axios, { AxiosError } from "axios";
import { Card } from "./components/Card";
import { UserForm } from "./components/UserForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export type UserType = {
  id: number;
  name: string;
  age: number;
  email: string;
};

function App() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  // const users = [
  //   { id: 1, name: "hichem", age: 22, email: "hichem@live.com" },
  //   { id: 2, name: "anas", age: 25, email: "anas@live.com" },
  //   { id: 3, name: "zaki", age: 20, email: "zaki@live.com" },
  // ];

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const url = "http://localhost:3001/users";

    const fetchUsers = async (url: string) => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, {
          cancelToken: source.token,
        });

        if (isMounted) {
          setUsers(res.data);
          setError(null);
        }
      } catch (err) {
        const error = err as Error | AxiosError;
        if (isMounted) {
          setError(error.message);
          setUsers([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchUsers(url);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, []);

  return (
    <Container>
      <UserForm />
      <div className="users-list">
        {isLoading
          ? "Loading..."
          : users.map((user) => {
              return <Card key={user.id} user={user} />;
            })}
      </div>
    </Container>
  );
}

export default App;
