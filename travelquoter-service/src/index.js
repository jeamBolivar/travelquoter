// App and Database config
const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

// Router
const createUsersRouter = require('./quoter/http/users-router');
const createAuthRouter = require('./quoter/http/auth-router');
const createPlacesRouter = require('./quoter/http/places-router');
const createCategoriesRouter = require('./quoter/http/categories-router');
const createProvidersRouter = require('./quoter/http/providers-router');
const createVehiclesRouter = require('./quoter/http/vehicles-router');
const createCoveragesRouter = require('./quoter/http/coverages-router');
const createPricesRouter = require('./quoter/http/prices-router');
const createQuotationsRouter = require('./quoter/http/quotations-router');


// Usecases
const ManageUsersUsecase = require('./quoter/usecases/manage-users-usecase');
const ManageAuthUsecase = require('./quoter/usecases/manage-auth-usecase');
const ManagePlaceUsecase = require('./quoter/usecases/manage-places-usecase');
const ManageProviderUseCase = require('./quoter/usecases/manage-providers-usecase');
const ManageCategoryUseCase = require('./quoter/usecases/manage-categories-usecase');
const ManageVehicleUseCase = require('./quoter/usecases/manage-vehicles-usecase');
const ManageCoveragesUseCase = require('./quoter/usecases/manage-coverages-usecase');
const ManagePricesUseCase = require('./quoter/usecases/manage-prices-usecase');
const ManageQuotationsUseCase = require('./quoter/usecases/manage-quotations-usecase');

// Repositories
const SequelizeUsersRepository = require('./quoter/repositories/sequelize-user-repository');
const SequelizePlacesRepository = require('./quoter/repositories/sequelize-place-repository');
const SequelizeCategoriesRepository = require('./quoter/repositories/sequelize-category-repository')
const SequelizeProvidersRepository = require('./quoter/repositories/sequelize-provider-repository')
const SequelizeVehiclesRepository = require('./quoter/repositories/sequelize-vehicle-repository')
const SequelizeVehicleCategoryRepository = require('./quoter/repositories/sequelize-vehicle-category-repository');
const SequelizeProviderVehicleRepository = require('./quoter/repositories/sequelize-provider-vehicle-repository');
const SequelizeCoveragesRepository = require('./quoter/repositories/sequelize-coverage-repository');
const SequelizePricesRepository = require('./quoter/repositories/sequelize-price-repository');
const SequelizeQuotationsRepository = require('./quoter/repositories/sequelize-quotation-repository');


// Sync Database
const sequelizeClient = new SequelizeClient();
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizePlacesRepository = new SequelizePlacesRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeVehiclesRepository = new SequelizeVehiclesRepository(sequelizeClient, false , sequelizeCategoriesRepository);
const sequelizeProvidersRepository = new SequelizeProvidersRepository(sequelizeClient, false, sequelizeVehiclesRepository);
const sequelizeVehicleCategoryRepository = new SequelizeVehicleCategoryRepository(sequelizeClient, false, sequelizeVehiclesRepository, sequelizeCategoriesRepository);
const sequelizeProviderVehicleRepository = new SequelizeProviderVehicleRepository(sequelizeClient, false, sequelizeProvidersRepository, sequelizeVehiclesRepository );
const sequelizeCoveragesRepository = new SequelizeCoveragesRepository(sequelizeClient);
const sequelizePricesRepository = new SequelizePricesRepository(sequelizeClient);
const sequelizeQuotationsRepository = new SequelizeQuotationsRepository(sequelizeClient);

sequelizeClient.syncDatabase();

const manageUsersUseCase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageAuthUseCase = new ManageAuthUsecase(sequelizeUsersRepository);
const managePlacesUseCase = new ManagePlaceUsecase(sequelizePlacesRepository);
const manageCategoriesUseCase = new ManageCategoryUseCase(sequelizeCategoriesRepository)
const manageProvidersUseCase = new ManageProviderUseCase(sequelizeProvidersRepository, sequelizeVehiclesRepository,sequelizeProviderVehicleRepository );
const manageVehiclesUseCase = new ManageVehicleUseCase(sequelizeVehiclesRepository, sequelizeCategoriesRepository, sequelizeVehicleCategoryRepository);
const manageCoveragesUseCase = new ManageCoveragesUseCase(sequelizeCoveragesRepository);
const managePricesUseCase = new ManagePricesUseCase(sequelizePricesRepository);
const manageQuotationsUseCase = new ManageQuotationsUseCase(sequelizeQuotationsRepository,sequelizeCoveragesRepository, sequelizePricesRepository, sequelizeVehiclesRepository );


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
  },
  {
    path: '',
    router: createPlacesRouter(managePlacesUseCase),
    protect: true
  },
  {
    path: '',
    router: createCategoriesRouter(manageCategoriesUseCase),
    protect: true
  },
  {
    path: '',
    router: createProvidersRouter(manageProvidersUseCase),
    protect: true
  },
  {
    path: '',
    router: createVehiclesRouter(manageVehiclesUseCase),
    protect: true
  },
  {
    path: '',
    router: createCoveragesRouter(manageCoveragesUseCase),
    protect: true
  },
  {
    path: '',
    router: createPricesRouter(managePricesUseCase),
    protect: true
  },
  {
    path: '',
    router: createQuotationsRouter(manageQuotationsUseCase),
    protect: true
  }
];

const app = createExpressApp(routers);