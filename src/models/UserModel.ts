import { Role, Todo, User } from "@/helpers/types";
import Model from "./Model";
import { DateTime } from "luxon";

interface IUser extends User, Model {}

class UserModel extends Model implements IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  createdAt: string;
  todos: Todo[];

  constructor(payload: User) {
    super(payload);
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.id = payload.id;
    this.roles = payload.roles;
    this.createdAt = payload.createdAt;
    this.todos = payload.todos || [];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get joinedAt() {
    return DateTime.fromISO(this.createdAt).toFormat("f");
  }
}

export default UserModel;
