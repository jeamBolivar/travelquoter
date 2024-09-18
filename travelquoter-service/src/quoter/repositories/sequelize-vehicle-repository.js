const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de vehiculos.
// Recibe la conexión con Sequelize externamente.

class SequelizeVehiclesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Vehicles";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
      },

      name: DataTypes.STRING,
      identifier: DataTypes.STRING

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.vehicleModel = sequelizeClient.sequelize.define('Vehicle', columns, options);

  }

  async getVehicles() {

    const vehicles = await this.vehicleModel.findAll({
      raw: true
    });

    return vehicles;

  }

  async getVehicle(id) {
    
    return await this.vehicleModel.findByPk(id);

  }

  async createVehicle(vehicle) {

    const data = await this.vehicleModel.create(vehicle);
    return data.id;

  }

  async updateVehicle(vehicle) {

    const options = {
      where: {
        id: vehicle.id
      }
    };

    await this.vehicleModel.update(vehicle, options);

  }

  async deleteVehicle(id) {

    const options = {
      where: {
        id: id
      }
    };

    await this.vehicleModel.destroy(options);

  }

  async deleteAllVehicles() {

    if(this.test) {
      const options = {
        truncate: true
      };

      await this.vehicleModel.destroy(options);

    }

  }

  async dropVehiclesTable() {

    if (this.test) {
      await this.vehicleModel.drop();
    }

  }

}

module.exports = SequelizeVehiclesRepository;
