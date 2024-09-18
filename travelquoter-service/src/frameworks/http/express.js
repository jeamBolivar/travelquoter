const express = require('express');

async function createExpressApp(routers) {

  let app = express();

  // Configuraciones varias.

  app.use(express.json());

  // Usar rutas recibidas.

  for (let router of routers) {
    app.use(router);
  }

  // Dejar escuchando y finalizar.

  const port = 8080;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return app;

}

module.exports = createExpressApp