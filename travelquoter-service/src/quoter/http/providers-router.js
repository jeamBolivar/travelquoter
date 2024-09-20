const express = require('express');
const appRoot = require('app-root-path');
const Provider = require('../entities/provider');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de proveedores.

function createProvidersRouter(manageProvidersUsecase) {

  const router = express.Router();

  router.get("/providers", async (req, res, next) => {

    try{

      const providers = await manageProvidersUsecase.getProviders();
      res.status(200).send(providers);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/providers/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const provider = await manageProvidersUsecase.getProvider(id);
      res.status(200).send(provider);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/providers", async (req, res, next) => {

    try{
      validation = validateSchema(Provider.schema, req);

      if (validation === true) {
        const provider = await manageProvidersUsecase.createProvider(req.body);
        res.status(200).send(provider);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/providers/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Provider.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const provider = await manageProvidersUsecase.updateProvider(id, req.body);
        res.status(200).send(provider);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/providers/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageProvidersUsecase.deleteProvider(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createProvidersRouter;