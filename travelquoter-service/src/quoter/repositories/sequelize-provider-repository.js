const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de proveedores.
// Recibe la conexión con Sequelize externamente.

class SequelizeProvidersRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "Providers";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
      },

      name: DataTypes.STRING

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.providerModel = sequelizeClient.sequelize.define('Provider', columns, options);

  }

  async getProviders() {

    const providers = await this.providerModel.findAll({
      raw: true
    });

    return providers;

  }

  async getProvider(id) {
    
    return await this.providerModel.findByPk(id);

  }

  async createProvider(provider) {

    const data = await this.providerModel.create(provider);
    return data.id;

  }

  async updateProvider(provider) {

    const options = {
      where: {
        id: provider.id
      }
    };

    await this.providerModel.update(provider, options);

  }

  async deleteProvider(id) {

    const options = {
      where: {
        id: id
      }
    };

    await this.providerModel.destroy(options);

  }

  async deleteAllProviders() {

    if(this.test) {
      const options = {
        truncate: true
      };

      await this.providerModel.destroy(options);

    }

  }

  async dropProvidersTable() {

    if (this.test) {
      await this.providerModel.drop();
    }

  }

}

module.exports = SequelizeProvidersRepository;
