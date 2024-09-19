const User = require('../entities/user');
const Encryption = require('../utils/encryption-util');

// Casos de uso para el manejo de usuarios.

class ManageUsersUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  async createUser(data) {

    const encryption = new Encryption();
    const password = encryption.rijndaelEncryptString(data.password); 

    const user = new User(undefined, data.name, data.lastname, data.age, data.username, password);
    const id = await this.usersRepository.createUser(user);
    user.id = id;

    return user;

  }

  async updateUser(id, data) {

    const user = new User(id, data.name, data.lastname, data.age, data.username);
    await this.usersRepository.updateUser(user);

    return user;
  }

  async deleteUser(id) {
    await this.usersRepository.deleteUser(id);
  }

}

module.exports = ManageUsersUsecase;