const express = require('express');
const appRoot = require('app-root-path');
const Quotation = require('../entities/quotation');
const validateSchema = require(appRoot + "/frameworks/http/ajv");

// Router (endpoints) para la sección de cotizaciones.

function createQuotationsRouter(manageQuotationsUsecase) {

  const router = express.Router();

  router.get("/quotations", async (req, res, next) => {

    try{

      const quotations = await manageQuotationsUsecase.getQuotations();
      res.status(200).send(quotations);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/quotations/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const quotation = await manageQuotationsUsecase.getQuotation(id);
      res.status(200).send(quotation);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/quotations", async (req, res, next) => {

    try{
      validation = validateSchema(Quotation.schema, req);

      if (validation === true) {
        const quotation = await manageQuotationsUsecase.createQuotation(req.body);
        res.status(200).send(quotation);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/quotations/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Quotation.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const quotation = await manageQuotationsUsecase.updateQuotation(id, req.body);
        res.status(200).send(quotation);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/quotations/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageQuotationsUsecase.deleteQuotation(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/quotations/changeStatus", async (req, res, next) => {

    try{

      const quotation = await manageQuotationsUsecase.changeStatus(req.body);
      res.status(200).send(quotation);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createQuotationsRouter;