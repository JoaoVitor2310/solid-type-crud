import { User } from "../../models/user";

export interface updateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: updateUserParams): Promise<User>;
}
