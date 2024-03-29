import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  const port = process.env.PORT || 8000;
  await MongoClient.connect();

  app.get("/", async (req, res) => {
    res
      .status(200)
      .send(
        "Olá, bem vindo ao projeto, saiba mais sobre mim(e o projeto) em: https://docs.google.com/document/d/1tQtWbZDr6f-rfCiAqEb4TAF8X9HXWyeYwkPp74qjDoQ/edit?usp=sharing "
      );
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository(); // Repository que vai se comunicar com o Mongo
    const getUsersController = new GetUsersController(mongoGetUsersRepository); // Irá chamar o método handle

    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();
