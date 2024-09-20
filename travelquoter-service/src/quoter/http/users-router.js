const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de usuarios.

function createUsersRouter(manageUsersUsecase) {

  const router = express.Router();

  router.get("/users", async (req, res, next) => {

    try{

      const users = await manageUsersUsecase.getUsers();
      res.status(200).send(users);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/users/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const user = await manageUsersUsecase.getUser(id);
      res.status(200).send(user);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/users", async (req, res, next) => {

    try{
      validation = validateSchema(User.schemaCreate, req);

      if (validation === true) {
        const user = await manageUsersUsecase.createUser(req.body);
        res.status(200).send(user);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/users/:id", async (req, res, next) => {

    try{
      validation = validateSchema(User.schemaUpdate, req);

      if(validation === true) {
        const id = req.params.id;
        const user = await manageUsersUsecase.updateUser(id, req.body);
        res.status(200).send(user);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/users/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageUsersUsecase.deleteUser(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createUsersRouter;