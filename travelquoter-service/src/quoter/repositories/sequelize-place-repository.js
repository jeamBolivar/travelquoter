const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de lugares.
// Recibe la conexión con Sequelize externamente.

class SequelizePlacesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Places";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: DataTypes.STRING

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.placeModel = sequelizeClient.sequelize.define('Place', columns, options);

  }

  async getPlaces() {

    const places = await this.placeModel.findAll({
      raw: true
    });

    return places;

  }

  async getPlace(id) {

    return await this.placeModel.findByPk(id);

  }

  async createPlace(place) {

    const data = await this.placeModel.create(place);
    return data.id;

  }

  async updatePlace(place) {

    const options = {
      where: {
        id: place.id
      }
    };

    await this.placeModel.update(place, options);

  }

  async deletePlace(id) {
    
    const options = {
      where: {
        id: id
      }
    };

    await this.placeModel.destroy(options);

  }

  async deleteAllPlaces() {

    if (this.test) {
      const options = {
        truncate: true
      };

      await this.placeModel.destroy(options);

    }

  }

  async dropPlacesTable() {

    if (this.test) {
      await this.placeModel.drop();
    }

  }

}

module.exports = SequelizePlacesRepository;