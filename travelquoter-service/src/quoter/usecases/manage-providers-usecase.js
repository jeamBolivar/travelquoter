const Provider = require('../entities/provider');
const ProviderVehicle = require('../entities/providerVehicle');

// Casos de uso para el manejo de proveedores.

class ManageProvidersUsecase {

  constructor(providersRepository, vehiclesRepository, providerVehicleRepository) {
    this.providersRepository = providersRepository;
    this.vehiclesRepository = vehiclesRepository;
    this.providerVehicleRepository = providerVehicleRepository;
  }

  async getProviders() {
    return await this.providersRepository.getProviders();
  }

  async getProvider(id) {
    return await this.providersRepository.getProvider(id);
  }

  async createProvider(data) {

    const provider = new Provider(undefined, data.name);

    if (data.vehicles && data.vehicles.length > 0 ) {
      const vehicles = data.vehicles;
      const vehiclesIds = [];

      for (const vehicleObj of vehicles) {        
        const vehicle = await this.vehiclesRepository.getVehicle(vehicleObj.vehicleId);
        if(vehicle){
          vehiclesIds.push(vehicle.id);
        }else{
          throw new Error(`The vehicle whith id: ${vehicleObj.vehicleId} does not exists`)
        }       
      }
      
      const id = await this.providersRepository.createProvider(provider);
      provider.id = id;    

      for (const vehicleId of vehiclesIds){        
        const providerVehicle = new ProviderVehicle(provider.id, vehicleId);      
        const data = await this.providerVehicleRepository.createProviderVehicle(providerVehicle);
      }

    } else {
      const id = await this.providersRepository.createProvider(provider);
      provider.id = id;
    }

    return provider; 

  }

  async updateProvider(id, data) {

    const provider = new Provider(id, data.name);
    await this.providersRepository.updateProvider(provider);

    return provider;
  }

  async deleteProvider(id) {

    await this.providersRepository.deleteProvider(id);
    
  }

}

module.exports = ManageProvidersUsecase;