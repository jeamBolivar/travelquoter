const express = require('express');
const appRoot = require('app-root-path');
const Place = require('../entities/place');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de lugares.

function createPlacesRouter(managePlacesUsecase) {

  const router = express.Router();

  router.get("/places", async (req, res, next) => {

    try{

      const places = await managePlacesUsecase.getPlaces();
      res.status(200).send(places);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/places/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const place = await managePlacesUsecase.getPlace(id);
      res.status(200).send(place);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/places", async (req, res, next) => {

    try{
      validation = validateSchema(Place.schema, req);

      if (validation === true) {
        const place = await managePlacesUsecase.createPlace(req.body);
        res.status(200).send(place);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/places/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Place.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const place = await managePlacesUsecase.updatePlace(id, req.body);
        res.status(200).send(place);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/places/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await managePlacesUsecase.deletePlace(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createPlacesRouter;