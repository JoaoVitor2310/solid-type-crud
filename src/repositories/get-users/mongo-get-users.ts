import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    // Método que irá retornar uma lista de usuários
    return [
      {
        firstName: "JV",
        lastName: "Gouveia",
        email: "jv@gmail.com",
        password: "123",
      },
    ];
  }
}
