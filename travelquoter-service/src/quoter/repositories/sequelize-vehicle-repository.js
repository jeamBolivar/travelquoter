const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de vehiculos.
// Recibe la conexión con Sequelize externamente.

class SequelizeVehiclesRepository {

  constructor(sequelizeClient, test = false, sequelizeCategoriesRepository) {

    this.sequelizeClient = sequelizeClient;    
    this.test = test;
    this.sequelizeCategoriesRepository = sequelizeCategoriesRepository;

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
      include: {
        model: this.sequelizeCategoriesRepository.categoryModel,
        as: 'Seats',
        through: { attributes: ['capacity'] }
      }
    });

    return vehicles.map(vehicle => {
      const seats = vehicle.Seats.map(seat => ({
          id: seat.id,
          name: seat.name,
          capacity: seat.VehicleCategory.capacity
      }));

      return {
          id: vehicle.id,
          name: vehicle.name,
          identifier: vehicle.identifier,
          Seats: seats
      };
    });

  }

  async getVehicle(id) {
    
    const vehicle = await this.vehicleModel.findByPk(id, {
      include: {
        model: this.sequelizeCategoriesRepository.categoryModel,
        as: 'Seats',
        through: { attributes: ['capacity'] }
      }
    });

    const seats = vehicle.Seats.map(seat => ({
      id: seat.id,
      name: seat.name,
      capacity: seat.VehicleCategory.capacity
    }));

    return {
        id: vehicle.id,
        name: vehicle.name,
        identifier: vehicle.identifier,
        Seats: seats
    };  

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
