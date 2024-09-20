const Vehicle = require('../entities/vehicle');
const VehicleCategory = require('../entities/vehicleCategory');

// Casos de uso para el manejo de vehiculos.

class ManageVehiclesUsecase {

  constructor(vehiclesRepository, categoriesRepository, vehicleCategoryRepository) {
    this.vehiclesRepository = vehiclesRepository;
    this.categoriesRepository = categoriesRepository;
    this.vehicleCategoryRepository = vehicleCategoryRepository;
  }

  async getVehicles() {
    return await this.vehiclesRepository.getVehicles();
  }

  async getVehicle(id) {
    return await this.vehiclesRepository.getVehicle(id);
  }

  async createVehicle(data) {

    const vehicle = new Vehicle(undefined, data.name, data.identifier);

    if (data.seats && data.seats.length > 0) {
      const seats = data.seats;
      const seatsCategories = [];      

      for (const seatObj of seats) {        
        const category = await this.categoriesRepository.getCategory(seatObj.categoryId);        
        if(category) {
          seatsCategories.push({categoryId: category.id, capacity: seatObj.capacity});
        }else {
          throw new Error(`The category whith id: ${seatObj.categoryId} does not exists`)
        }
      }

      const id = await this.vehiclesRepository.createVehicle(vehicle);
      vehicle.id = id;

      for (const seats of seatsCategories) {
        const vehicleCategory = new VehicleCategory(vehicle.id, seats.categoryId, seats.capacity);
        const data = await this.vehicleCategoryRepository.createVehicleCategory(vehicleCategory);
      }
    } else {
      const id =  await this.vehiclesRepository.createVehicle(vehicle);
      vehicle.id = id;
    }    

    return vehicle;

  }

  async updateVehicle(id, data) {

    const vehicle = new Vehicle(id, data.name,data.identifier);
    await this.vehiclesRepository.updateVehicle(vehicle);

    return vehicle;
  }

  async deleteVehicle(id) {
    await this.vehiclesRepository.deleteVehicle(id);
  }

}

module.exports = ManageVehiclesUsecase;