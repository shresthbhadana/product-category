const productRepo = require("../repository/productRepo.js");



exports.createProduct = async (data) => {
  return await productRepo.createProduct(data);
}



exports.getProducts = async (query) => {
  const { search, city, page = 1, limit = 10 } = query;

  const filter = {};
  if (city) filter["location.city"] = city;

  const skip = (page - 1) * limit;

  return await productRepo.getAllProducts(
    filter,
    search,
    Number(skip),
    Number(limit)
  );
}



exports.getProductById = async (id) => {
  return await productRepo.getProductById(id);
}


exports.updateProduct = async (id, data) => {
  return await productRepo.updateProduct(id, data);
}



exports.deleteProduct = async (id) => {
  return await productRepo.deleteProduct(id);
}

