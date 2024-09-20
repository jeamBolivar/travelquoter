const Quotation = require('../entities/quotation');

// Casos de uso para el manejo de precios.

class ManageQuotationsUsecase {

  constructor(quotationsRepository, coveragesRepository, pricesRepository, vehicleRepository) {
    this.quotationsRepository = quotationsRepository;
    this.coveragesRepository = coveragesRepository;
    this.pricesRepository = pricesRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async getQuotations() {
    return await this.quotationsRepository.getQuotations();
  }

  async getQuotation(id) {
    return await this.quotationsRepository.getQuotation(id);
  }

  async createQuotation(data) {

    const quotation = new Quotation(undefined, null, data.fromId, data.toId, data.date, data.passengersQuantity,"creada");

    if(data.categoryId){
      quotation.CategoryId = data.categoryId;
    }
    
    const id = await this.quotationsRepository.createQuotation(quotation);
    quotation.id = id;

    const quotationReponse = {
      quotationId : quotation.id,
      coverages: []
    }

    const coverages = await this.coveragesRepository.getCoveragesByPlaces(quotation.FromId, quotation.ToId);
    for (const coverage of coverages) {

      const price = await this.pricesRepository.getPricesByCoverage(coverage.id, quotation.date);
      const vehicle = await this.vehicleRepository.getVehicle(coverage.VehicleId);     

      const coverageObj = {
        coverageId : coverage.id,
        pricesId: (price) ? price.id : 0,
        amount: (price) ? price.price: 0,
        vehicle: vehicle.name + ' ' + vehicle.identifier
      }
      quotationReponse.coverages.push(coverageObj)
    }    

    return quotationReponse;

  }

  async updateQuotation(id, data) {    
    
    const quotation = new Quotation(id, null, data.fromId, data.toId, data.date, data.passengersQuantity,data.status);
    await this.quotationsRepository.updateQuotation(quotation);

    return quotation;
  }

  async deleteQuotation(id) {
    await this.quotationsRepository.deleteQuotation(id);
  }

  async changeStatus(data) {
    
    const currentQuotation = await this.quotationsRepository.getQuotation(data.quotationId);
    if (currentQuotation.status == 'reserva cancelada'){
      throw new Error('You can not change a quotation status when the quotation is in status: Reserva Cancelada ' );
    }
    if (data.status == 'reserva' && currentQuotation.status !== 'creada'){
      throw new Error('You can not change a quotation status to reserva when the current status of the quotation is not creada' );
    }
    if (data.status == 'reserva cancelada' && currentQuotation.status !== 'reserva'){
      throw new Error('You can not change a quotation status to reserva cancelada when the current status of the quotation is not reserva');
    }
    if (data.status == 'creada' && currentQuotation !== 'creada'){
      throw new Error('You can not change a quotation status to creada when the current status of the quotation is not creada' );
    }

    currentQuotation.status = data.status;    
    const quotation = new Quotation(currentQuotation.id, currentQuotation.categoryId, currentQuotation.fromId, currentQuotation.toId, currentQuotation.date, currentQuotation.passengersQuantity,currentQuotation.status);
    await this.quotationsRepository.updateQuotation(quotation);

    return 'Status changed';    

  }

}

module.exports = ManageQuotationsUsecase;