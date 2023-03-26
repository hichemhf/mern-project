import { UserType } from "../App";

type CardPropsType = {
  user: UserType;
};

export const Card = ({ user }: CardPropsType) => {
  return (
    <div className="card">
      <ul>
        <li>Name:{user.name}</li>
        <li>Age: {user.age}</li>
        <li>Email: {user.email}</li>
      </ul>
    </div>
  );
};
