const Category = require('../entities/category');

// Casos de uso para el manejo de categorias.

class ManageCategoriesUsecase {

  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async getCategory(id) {
    return await this.categoriesRepository.getCategory(id);
  }

  async createCategory(data) {

    const category = new Category(undefined, data.name);
    const id = await this.categoriesRepository.createCategory(category);
    category.id = id;

    return category;

  }

  async updateCategory(id, data) {

    const category = new Category(id, data.name);
    await this.categoriesRepository.updateCategory(category);

    return category;
  }

  async deleteCategory(id) {
    await this.categoriesRepository.deleteCategory(id);
  }

}

module.exports = ManageCategoriesUsecase;