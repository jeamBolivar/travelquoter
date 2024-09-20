const express = require('express');
const appRoot = require('app-root-path');
const Category = require('../entities/category');
const validateSchema = require(appRoot + "/frameworks/http/ajv");

// Router (endpoints) para la sección de proveedores.

function createCategoriesRouter(manageCategoriesUsecase) {

  const router = express.Router();

  router.get("/categories", async (req, res, next) => {

    try{

      const categories = await manageCategoriesUsecase.getCategories();
      res.status(200).send(categories);

    } catch (error) {
      next(error);
    }   

  });

  router.get("/categories/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      const category = await manageCategoriesUsecase.getCategory(id);
      res.status(200).send(category);

    } catch (error) {
      next(error);
    }   

  });

  router.post("/categories", async (req, res, next) => {

    try{
      validation = validateSchema(Category.schema, req);

      if (validation === true) {
        const category = await manageCategoriesUsecase.createCategory(req.body);
        res.status(200).send(category);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.put("/categories/:id", async (req, res, next) => {

    try{
      validation = validateSchema(Category.schema, req);

      if(validation === true) {
        const id = req.params.id;
        const category = await manageCategoriesUsecase.updateCategory(id, req.body);
        res.status(200).send(category);
      } else {
        res.status(422).send(validation);
      }

    } catch (error) {
      next(error);
    }   

  });

  router.delete("/categories/:id", async (req, res, next) => {

    try{

      const id = req.params.id;
      await manageCategoriesUsecase.deleteCategory(id);

      res.status(200).send(`Deleted ${id}`);

    } catch (error) {
      next(error);
    }   

  });

  return router;

}

module.exports = createCategoriesRouter;