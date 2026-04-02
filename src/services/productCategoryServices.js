const productCategoryRepo = require("../repository/productCategoryRepo");

exports.createCategory = async (data) => {
  return await productCategoryRepo.createCategory(data);
}

exports.getCategories = async (query) => {
  const { search, page = 1, limit = 10 } = query;
const filter = {}
  const skip = (page - 1) * limit;

  return await productCategoryRepo.getAllCategories(
    filter,
    search,
    Number(skip),
    Number(limit)
  );
}

exports.getCategoryById = async (id) => {
  return await productCategoryRepo.getCategoryById(id);
}

exports.updateCategory = async (id, data) => {
  return await productCategoryRepo.updateCategory(id, data);
}


exports.deleteCategory = async (id) => {
  return await productCategoryRepo.deleteCategory(id);
}

