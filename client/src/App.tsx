import axios, { AxiosError } from "axios";
import { UserCard } from "./components/UserCard";
import { UserForm } from "./components/UserForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Spinner } from "react-bootstrap";
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
        {error ? (
          <Card
            bg={"danger"}
            text={"white"}
            style={{ padding: "0.8rem" }}
            className="mb-2"
          >
            <Card.Header>Error</Card.Header>
            <Card.Body>
              <Card.Text>{error} </Card.Text>
            </Card.Body>
          </Card>
        ) : isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })
        )}
      </div>
    </Container>
  );
}

export default App;
