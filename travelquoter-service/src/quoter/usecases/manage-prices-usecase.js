const Price = require('../entities/price');

// Casos de uso para el manejo de precios.

class ManagePricesUsecase {

  constructor(pricesRepository) {
    this.pricesRepository = pricesRepository;
  }

  async getPrices() {
    return await this.pricesRepository.getPrices();
  }

  async getPrice(id) {
    return await this.pricesRepository.getPrice(id);
  }

  async createPrice(data) {

    const price = new Price(undefined, data.coverageId, data.fromDate, data.toDate, data.price);
    const id = await this.pricesRepository.createPrice(price);
    price.id = id;

    return price;

  }

  async updatePrice(id, data) {    
    
    const price = new Price(id, data.coverageId, data.fromDate, data.toDate, data.price);
    await this.pricesRepository.updatePrice(price);

    return price;
  }

  async deletePrice(id) {
    await this.pricesRepository.deletePrice(id);
  }  

}

module.exports = ManagePricesUsecase;