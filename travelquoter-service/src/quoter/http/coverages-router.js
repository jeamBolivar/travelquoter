const express = require('express');
const appRoot = require('app-root-path');
const Coverage = require('../entities/coverage');
const validateSchema = require(appRoot + "/frameworks/http/ajv");

// Router (endpoints) para la sección de coberturas.

function createCoveragesRouter(manageCoveragesUsecase) {

  const router = express.Router();

  router.get("/coverages", async (req, res, next) => {

    try{

      const coverages = await manageCoveragesUsecase.getCoverages();
      res.status(200).send(coverages);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/coverages/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const coverage = await manageCoveragesUsecase.getCoverage(id);
      res.status(200).send(coverage);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/coverages", async (req, res, next) => {

    try{
      validation = validateSchema(Coverage.schema, req);

      if (validation === true) {
        const coverage = await manageCoveragesUsecase.createCoverage(req.body);
        res.status(200).send(coverage);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/coverages/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Coverage.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const coverage = await manageCoveragesUsecase.updateCoverage(id, req.body);
        res.status(200).send(coverage);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/coverages/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageCoveragesUsecase.deleteCoverage(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createCoveragesRouter;