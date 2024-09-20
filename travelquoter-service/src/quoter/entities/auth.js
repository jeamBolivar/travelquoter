//Entidad autenticador.

class Auth {
  
  static schema = {
    type: "object",
      properties: {        
        username: {type: "string", errorMessage:'must be of string type'},
        password: {type: "string", errorMessage:'must be of string type'},
      },
      required: ["username", "password"],
      additionalProperties: false,
  } 

  constructor(username, password) {

    this.username = username
    this.password = password

  }
}

module.exports = Auth;