const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de proveedores con vehiculos.
// Recibe la conexión con Sequelize externamente.

class SequelizeProviderVehiclesRepository {

  constructor(sequelizeClient, test = false, sequelizeProvidersRepository, sequelizeVehiclesRepository) {

    this.sequelizeClient = sequelizeClient;
    this.sequelizeProvidersRepository = sequelizeProvidersRepository
    this.sequelizeVehiclesRepository = sequelizeVehiclesRepository
    this.test = test;

    let tableName = "ProviderVehicles";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      ProviderId: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        references: {
          model: 'Providers',
          key: 'id',
        }
      },
      VehicleId: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        references: {
          model: 'Vehicles',
          key: 'id',
        }
      }

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.providerVehicleModel  = sequelizeClient.sequelize.define('ProviderVehicle', columns, options);

    this.sequelizeProvidersRepository.providerModel.belongsToMany(this.sequelizeVehiclesRepository.vehicleModel, { through: this.providerVehicleModel, as: 'Vehicles' });
    this.sequelizeVehiclesRepository.vehicleModel.belongsToMany(this.sequelizeProvidersRepository.providerModel, { through: this.providerVehicleModel, as: 'Providers' });

  }  
  async getProviderVehicles() {

    const providerVehicles = await this.providerVehicleModel.findAll({
      raw: true
    });

    return providerVehicles;

  }

  async getProviderVehicle(providerId, vehicleId) {
    
    const options = {
      where: {
        providerId: providerId,
        vehicleId : vehicleId
      }
    }

    return await this.providerVehicleModel.findOne(options);

  }

  async createProviderVehicle(providerVehicle) {

    const data = await this.providerVehicleModel.create(providerVehicle);
    return data;

  }

  async updateProviderVehicle(providerVehicle) {

    const options = {
      where: {
        providerId: providerVehicle.providerId,
        vehicleId: providerVehicle.vehicleId
      }
    };

    await this.providerVehicleModel.update(providerVehicle, options);

  }

  async deleteProviderVehicle(providerId, vehicleId) {

    const options = {
      where: {
        providerId: providerId,
        vehicleId: vehicleId
      }
    };

    await this.providerVehicleModel.destroy(options);

  }

  async deleteAllProviderVehicles() {

    if(this.test) {
      const options = {
        truncate: true
      };

      await this.providerVehicleModel.destroy(options);

    }

  }

  async dropProviderVehiclesTable() {

    if (this.test) {
      await this.providerVehicleModel.drop();
    }

  }

}

module.exports = SequelizeProviderVehiclesRepository;
