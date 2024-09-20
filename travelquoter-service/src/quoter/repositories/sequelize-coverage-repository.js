const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de cobertura.
// Recibe la conexión con Sequelize externamente.

class SequelizeCoveragesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Coverages";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
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
      },
      startTime: DataTypes.STRING,
      duration: DataTypes.INTEGER


    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.coverageModel = sequelizeClient.sequelize.define('Coverage', columns, options);   
    

  }

  async getCoverages() {

    const coverages = await this.coverageModel.findAll({
      raw: true
    });

    return coverages;

  }

  async getCoverage(id) {
    
    return await this.coverageModel.findByPk(id);

  }

  async createCoverage(coverage) {

    const data = await this.coverageModel.create(coverage);
    return data.id;

  }

  async updateCoverage(coverage) {

    const options = {
      where: {
        id: coverage.id
      }
    };

    await this.coverageModel.update(coverage, options);

  }

  async deleteCoverage(id) {

    const options = {
      where: {
        id: id
      }
    };

    await this.coverageModel.destroy(options);

  }

  async deleteAllCoverages() {

    if(this.test) {
      const options = {
        truncate: true
      };

      await this.coverageModel.destroy(options);

    }

  }

  async dropCoveragesTable() {

    if (this.test) {
      await this.coverageModel.drop();
    }

  }

  async getCoveragesByPlaces(fromId, toId) {
    const options = {
      where: {
        FromId: fromId,
        ToId : toId
      }
    }

    const coverages = await this.coverageModel.findAll(options);
    return coverages;
  }
  
}

module.exports = SequelizeCoveragesRepository;
