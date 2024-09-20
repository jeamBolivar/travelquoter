//Entidad vehiculo.

class Vehicle {
  
  static schema = {
    type: "object",
      properties: {
        name : {type: "string", errorMessage:'must be of string type'},
        identifier : {type: "string", errorMessage:'must be of string type'}
      },
      required: ["name","identifier"],
      additionalProperties: true,
  }

  constructor(id, name, identifier) {

    this.id = id;
    this.name = name;
    this.identifier = identifier;

  }
}

module.exports = Vehicle;