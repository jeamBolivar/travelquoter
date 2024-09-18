// App and Database config
const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

// Router
const createUsersRouter = require('./quoter/http/users-router');

// Usecases
const ManageUsersUsecase = require('./quoter/usecases/manage-users-usecase');

// Repositories
const SequelizeUsersRepository = require('./quoter/repositories/sequelize-user-repository');
const SequelizePlacesRepository = require('./quoter/repositories/sequelize-place-repository');
const SequelizeCategoriesRepository = require('./quoter/repositories/sequelize-category-repository')
const SequelizeProvidersRepository = require('./quoter/repositories/sequelize-provider-repository')
const SequelizeVehiclesRepository = require('./quoter/repositories/sequelize-vehicle-repository')
const SequelizeVehicleCategoryRepository = require('./quoter/repositories/sequelize-vehicle-category-repository')

// Sync Database
const sequelizeClient = new SequelizeClient();
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizePlacesRepository = new SequelizePlacesRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeProvidersRepository = new SequelizeProvidersRepository(sequelizeClient);
const sequelizeVehiclesRepository = new SequelizeVehiclesRepository(sequelizeClient);
const sequelizeVehicleCategoryRepository = new SequelizeVehicleCategoryRepository(sequelizeClient);
sequelizeClient.syncDatabase();


const manageUsersUseCase = new ManageUsersUsecase(sequelizeUsersRepository);

let routers = [
  createUsersRouter(manageUsersUseCase)
];

const app = createExpressApp(routers);