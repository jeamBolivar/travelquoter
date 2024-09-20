//Entidad vehiculo-asiento-categoria.

class VehicleCategory { 
  

  constructor(VehicleId, CategoryId, capacity) {

    this.VehicleId = VehicleId;
    this.CategoryId = CategoryId;
    this.capacity = capacity;

  }
}

module.exports = VehicleCategory;