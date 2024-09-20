const Coverage = require('../entities/coverage');

// Casos de uso para el manejo de coberturas.

class ManageCoveragesUsecase {

  constructor(coveragesRepository) {
    this.coveragesRepository = coveragesRepository;
  }

  async getCoverages() {
    return await this.coveragesRepository.getCoverages();
  }

  async getCoverage(id) {
    return await this.coveragesRepository.getCoverage(id);
  }

  async createCoverage(data) {

    const coverage = new Coverage(undefined, data.fromId, data.toId, data.providerId, data.vehicleId, data.startTime, data.duration);
    const id = await this.coveragesRepository.createCoverage(coverage);
    coverage.id = id;

    return coverage;

  }

  async updateCoverage(id, data) {    
    
    const coverage = new Coverage(id, data.fromId, data.toId, data.providerId, data.vehicleId, data.startTime, data.duration);
    await this.coveragesRepository.updateCoverage(coverage);

    return coverage;
  }

  async deleteCoverage(id) {
    await this.coveragesRepository.deleteCoverage(id);
  }

}

module.exports = ManageCoveragesUsecase;