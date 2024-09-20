const express = require('express');
const appRoot = require('app-root-path');
const Price = require('../entities/price');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de precios.

function createPricesRouter(managePricesUsecase) {

  const router = express.Router();

  router.get("/prices", async (req, res, next) => {

    try{

      const prices = await managePricesUsecase.getPrices();
      res.status(200).send(prices);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/prices/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const price = await managePricesUsecase.getPrice(id);
      res.status(200).send(price);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/prices", async (req, res, next) => {

    try{
      validation = validateSchema(Price.schema, req);

      if (validation === true) {
        const price = await managePricesUsecase.createPrice(req.body);
        res.status(200).send(price);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/prices/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Price.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const price = await managePricesUsecase.updatePrice(id, req.body);
        res.status(200).send(price);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/prices/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await managePricesUsecase.deletePrice(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createPricesRouter;