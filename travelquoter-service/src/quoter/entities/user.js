//Entidad usuario.

class User {
  
  static schema = {
    type: "object",
      properties: {
        name : {type: "string", errorMessage:'must be of string type'},
        lastname: {type: "string", errorMessage:'must be of string type'},
        age: {type: "integer", errorMessage:'must be of integer type'}
      },
      required: ["name","lastname","age"],
      additionalProperties: false,
  }

  constructor(id, name, lastname, age) {

    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.age = age;

  }
}

module.exports = User;