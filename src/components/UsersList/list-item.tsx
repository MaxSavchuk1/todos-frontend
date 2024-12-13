import { memo } from "react";
import { User } from "@/helpers/types";

type Props = {
  user: User;
};

function ListItem({ user }: Props) {
  return (
    <li className="flex gap-3 p-3 border rounded">
      <span>{user.firstName}</span>
      <span>{user.lastName}</span>
    </li>
  );
}

export default memo(ListItem);
