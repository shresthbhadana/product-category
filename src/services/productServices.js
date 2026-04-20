const productRepo = require("../repository/productRepo.js");
const { getMatchPercentage } = require("../utils/matchPercentage.js");



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


exports.searchProducts = async(query)=>{
  const search = query.search || query.q || "";
  const city = query.city;

  const filter = {};
  if (city) filter["location.city"] = city;
  const products = await productRepo.getAllProducts(filter, null, 0, 100);
  let result = [];
  products.forEach((product)=>{
    const match = getMatchPercentage(product,search);
    if(match >= 50){
      let plain = product.toObject();
      delete plain.mathchPercentage;
      result.push({...plain, matchPercentage: match});
    }
  })
  result.sort((a,b) => b.matchPercentage - a.matchPercentage);
  return result;
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

