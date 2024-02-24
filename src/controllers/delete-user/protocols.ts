import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
