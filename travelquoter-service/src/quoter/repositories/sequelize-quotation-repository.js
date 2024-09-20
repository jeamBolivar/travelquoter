const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de cotizaciones.
// Recibe la conexión con Sequelize externamente.

class SequelizeQuotationsRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Quotations";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,        
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
      FromId: {
        type: DataTypes.INTEGER,        
        primaryKey : true,
        references: {
          model: 'Places',
          key: 'id',
        }
      },
      ToId: {
        type: DataTypes.INTEGER,        
        primaryKey : true,
        references: {
          model: 'Places',
          key: 'id',
        }
      },
      date: DataTypes.DATE,      
      passengersQuantity: DataTypes.INTEGER,
      status: DataTypes.STRING      

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.quotationModel = sequelizeClient.sequelize.define('Quotation', columns, options);

  }

  async getQuotations() {

    const quotations = await this.quotationModel.findAll({
      raw: true
    });

    return quotations;

  }

  async getQuotation(id) {

    return await this.quotationModel.findByPk(id);

  }

  async createQuotation(quotation) {

    const data = await this.quotationModel.create(quotation);
    return data.id;

  }

  async updateQuotation(quotation) {

    const options = {
      where: {
        id: quotation.id
      }
    };

    await this.quotationModel.update(quotation, options);

  }

  async deleteQuotation(id) {
    
    const options = {
      where: {
        id: id
      }
    };

    await this.quotationModel.destroy(options);

  }

  async deleteAllQuotations() {

    if (this.test) {
      const options = {
        truncate: true
      };

      await this.quotationModel.destroy(options);

    }

  }

  async dropQuotationsTable() {

    if (this.test) {
      await this.quotationModel.drop();
    }

  }

}

module.exports = SequelizeQuotationsRepository;