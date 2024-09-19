//Entidad usuario.

class User {
  
  static schemaCreate = {
    type: "object",
      properties: {
        name : {type: "string", errorMessage:'must be of string type'},
        lastname: {type: "string", errorMessage:'must be of string type'},
        age: {type: "integer", errorMessage:'must be of integer type'},
        username: {type: "string", errorMessage:'must be of string type'},
        password: {type: "string", errorMessage:'must be of string type'},
      },
      required: ["name","lastname","age", "username", "password"],
      additionalProperties: false,
  }

  static schemaUpdate = {
    type: "object",
      properties: {
        name : {type: "string", errorMessage:'must be of string type'},
        lastname: {type: "string", errorMessage:'must be of string type'},
        age: {type: "integer", errorMessage:'must be of integer type'},
        username: {type: "string", errorMessage:'must be of string type'}        
      },
      required: ["name","lastname","age", "username"],
      additionalProperties: false,
  }

  constructor(id, name, lastname, age, username, password) {

    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.username = username
    this.password = password
  }
}

module.exports = User;