import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/services/api/modules/users";

function User() {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(+id!);

  return <div>User {data?.firstName}</div>;
}

export default memo(User);
