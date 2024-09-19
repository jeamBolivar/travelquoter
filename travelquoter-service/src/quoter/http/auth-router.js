const express = require('express');
const appRoot = require('app-root-path');
const Auth = require('../entities/auth');
const validateSchema = require(appRoot + "/frameworks/http/ajv");

// Router (endpoints) para la sección de autenticación.

function createAuthRouter(manageAuthUsecase) {

  const router = express.Router();

  router.post("/login", async (req, res, next) => {

    try{

      validation = validateSchema(Auth.schema, req);

      if (validation === true) {
        const token = await manageAuthUsecase.login(req.body);
        res.status(200).send(token);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }
    
  }); 

  return router;

}

module.exports = createAuthRouter;