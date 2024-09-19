const Auth = require('../entities/auth');
const Encryption = require('../utils/encryption-util');
const jwtUtils = require('../utils/jwt-util');

// Casos de uso para el manejo de autenticación.

class ManageAuthUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  } 

  async login(data) {

    const encryption = new Encryption();
    const password = encryption.rijndaelEncryptString(data.password);

    const user = await this.usersRepository.validateLogin(data.username, password); 
    
    if(user) {
      const token = jwtUtils.generateToken({id: user.id, username: user.username});
      return {token: token};
    }else {
      throw new Error('Invalid credentials')      
    }   

  }
  
}

module.exports = ManageAuthUsecase;