const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

// Implementación con Sequelize para el repositorio de precios.
// Recibe la conexión con Sequelize externamente.

class SequelizePricesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Prices";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CoverageId: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        references: {
          model: 'Coverages',
          key: 'id',
        }
      },
      fromDate: DataTypes.DATE,
      toDate: DataTypes.DATE,
      price: DataTypes.FLOAT

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.priceModel = sequelizeClient.sequelize.define('Price', columns, options);

  }

  async getPrices() {

    const prices = await this.priceModel.findAll({
      raw: true
    });

    return prices;

  }

  async getPrice(id) {

    return await this.priceModel.findByPk(id);

  }

  async createPrice(price) {

    const data = await this.priceModel.create(price);
    return data.id;

  }

  async updatePrice(price) {

    const options = {
      where: {
        id: price.id
      }
    };

    await this.priceModel.update(price, options);

  }

  async deletePrice(id) {
    
    const options = {
      where: {
        id: id
      }
    };

    await this.priceModel.destroy(options);

  }

  async deleteAllPrices() {

    if (this.test) {
      const options = {
        truncate: true
      };

      await this.priceModel.destroy(options);

    }

  }

  async dropPricesTable() {

    if (this.test) {
      await this.priceModel.drop();
    }

  }

  async getPricesByCoverage(coverageId, date) {
    const options = {
      where: {
        CoverageId: coverageId,
        fromDate: {
          [Op.lte]: date,
        },
        toDate: {
          [Op.gte]: date,
        }
      }
    }

    const price = await this.priceModel.findOne(options);
    return price;
  }

}

module.exports = SequelizePricesRepository;