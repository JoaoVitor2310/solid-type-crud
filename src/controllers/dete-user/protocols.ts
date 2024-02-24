import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse>;
}
export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
