//Entidad proveedor.

class Provider {
  
  static schema = {
    type: "object",
      properties: {
        name : {type: "string", errorMessage:'must be of string type'}        
      },
      required: ["name"],
      additionalProperties: true,
  }

  constructor(id, name) {

    this.id = id;
    this.name = name;

  }
}

module.exports = Provider;