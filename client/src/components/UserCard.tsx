import { UserType } from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, ListGroup } from "react-bootstrap";
type CardPropsType = {
  user: UserType;
};

export const UserCard = ({ user }: CardPropsType) => {
  return (
    <ListGroup>
      <ListGroup.Item
        variant="dark"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{user.name}</div>
          {user.email}
        </div>
        <Badge bg="success" pill>
          {user.age}
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
};
