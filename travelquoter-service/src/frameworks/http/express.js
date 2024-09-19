const express = require('express');
const requestMiddleware = require('../../quoter/middleware/request-middleware');
const erroHandler = require('../../quoter/utils/error-handler-util');

async function createExpressApp(routers) {

  let app = express();

  // Configuraciones varias.

  app.use(express.json());

  // Usar rutas recibidas.

  for (let router of routers) {
    if (router.protect) {
      app.use(router.path, requestMiddleware.protectRoute, router.router);
    } else {
      app.use(router.path, router.router);
    }       
  }

  app.use(erroHandler.errorHandler);

  // Dejar escuchando y finalizar.

  const port = 8080;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return app;

}

module.exports = createExpressApp