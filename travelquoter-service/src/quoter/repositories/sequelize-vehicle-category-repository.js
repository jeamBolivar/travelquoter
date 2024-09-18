const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de vehiculo con categorias.
// Recibe la conexión con Sequelize externamente.

class SequelizeVehicleCategoriesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "VehicleCategories";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      vehicleId: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        references: {
          model: 'Vehicles',
          key: 'id',
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        references: {
          model: 'Categories',
          key: 'id',
        }
      },

      capacity: DataTypes.INTEGER    

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.vehicleCategoryModel  = sequelizeClient.sequelize.define('VehicleCategory', columns, options);

  }

  async getVehicleCategories() {

    const vehicleCategories = await this.vehicleCategoryModel.findAll({
      raw: true
    });

    return vehicleCategories;

  }

  async getVehicleCategory(vehicleId, categoryId) {
    
    const options = {
      where: {
        vehicleId: vehicleId,
        categoryId : categoryId
      }
    }

    return await this.vehicleCategoryModel.findOne(options);

  }

  async createVehicleCategory(vehicleCategory) {

    const data = await this.vehicleCategoryModel.create(vehicleCategory);
    return data;

  }

  async updateVehicleCategory(vehicleCategory) {

    const options = {
      where: {
        vehicleId: vehicleCategory.vehicleId,
        categoryId: vehicleCategory.categoryId
      }
    };

    await this.vehicleCategoryModel.update(vehicleCategory, options);

  }

  async deleteVehicleCategory(vehicleId, categoryId) {

    const options = {
      where: {
        vehicleId: vehicleId,
        categoryId: categoryId
      }
    };

    await this.vehicleCategoryModel.destroy(options);

  }

  async deleteAllVehicleCategories() {

    if(this.test) {
      const options = {
        truncate: true
      };

      await this.vehicleCategoryModel.destroy(options);

    }

  }

  async dropVehicleCategoriesTable() {

    if (this.test) {
      await this.vehicleCategoryModel.drop();
    }

  }

}

module.exports = SequelizeVehicleCategoriesRepository;
