// App and Database config
const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

// Router
const createUsersRouter = require('./quoter/http/users-router');
const createAuthRouter = require('./quoter/http/auth-router');

// Usecases
const ManageUsersUsecase = require('./quoter/usecases/manage-users-usecase');

// Repositories
const SequelizeUsersRepository = require('./quoter/repositories/sequelize-user-repository');
const SequelizePlacesRepository = require('./quoter/repositories/sequelize-place-repository');
const SequelizeCategoriesRepository = require('./quoter/repositories/sequelize-category-repository')
const SequelizeProvidersRepository = require('./quoter/repositories/sequelize-provider-repository')
const SequelizeVehiclesRepository = require('./quoter/repositories/sequelize-vehicle-repository')
const SequelizeVehicleCategoryRepository = require('./quoter/repositories/sequelize-vehicle-category-repository');
const ManageAuthUsecase = require('./quoter/usecases/manage-auth-usecase');

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
const manageAuthUseCase = new ManageAuthUsecase(sequelizeUsersRepository);

let routers = [
  {
    path: '/auth',
    router: createAuthRouter(manageAuthUseCase),
    protect: false
  },
  {
    path: '',
    router: createUsersRouter(manageUsersUseCase),
    protect: true
  }  
];

const app = createExpressApp(routers);