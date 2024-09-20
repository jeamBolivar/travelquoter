const express = require('express');
const appRoot = require('app-root-path');
const Vehicle = require('../entities/vehicle');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de vehiculos.

function createVehiclesRouter(manageVehiclesUsecase) {

  const router = express.Router();

  router.get("/vehicles", async (req, res, next) => {

    try{

      const vehicles = await manageVehiclesUsecase.getVehicles();
      res.status(200).send(vehicles);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/vehicles/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const vehicle = await manageVehiclesUsecase.getVehicle(id);
      res.status(200).send(vehicle);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/vehicles", async (req, res, next) => {

    try{
      validation = validateSchema(Vehicle.schema, req);

      if (validation === true) {
        const vehicle = await manageVehiclesUsecase.createVehicle(req.body);
        res.status(200).send(vehicle);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/vehicles/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Vehicle.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const vehicle = await manageVehiclesUsecase.updateVehicle(id, req.body);
        res.status(200).send(vehicle);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/vehicles/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageVehiclesUsecase.deleteVehicle(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createVehiclesRouter;