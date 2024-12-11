export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type TodoStatus = "new" | "in process" | "testing" | "done";

export type FormValues = {
  title: string;
  body: string;
  status: TodoStatus;
};

export type Todo = {
  id: number;
  title: string;
  body: string | null;
  status: TodoStatus;
  children: Todo[] | number[];
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = LoginRequest & {
  lastName: string;
  firstName: string;
};

export type TokensResponse = {
  access_token: string;
  refresh_token: string;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};