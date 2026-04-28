const productRepo = require("../repository/productRepo.js");
const { getMatchPercentage } = require("../utils/matchPercentage.js");
const client = require("../config/redis");
const PRODUCT_LIST = "product:list";
const PRODUCT_KEY = (id) => `product:${id}`;



exports.createProduct = async (data) => {
  const product =  await productRepo.createProduct(data);
  client.del(PRODUCT_LIST);
  client.del(PRODUCT_KEY(product._id));
  return product;
}



exports.getProducts = async (query) => {
  const { search, city, page = 1, limit = 10 } = query;

  const filter = {};
  if (city) filter["location.city"] = city;

  const skip = (page - 1) * limit;
  const cacheKey = `products:filter=${JSON.stringify(filter)}:search=${search}:page=${page}:limit=${limit}`;
  const cached = await client.get(cacheKey);
  if(cached){
    return JSON.parse(cached);
  };


  const products =await productRepo.getAllProducts(
    filter,
    search,
    Number(skip),
    Number(limit)
  );
  await client.setEx(cacheKey, 86400, JSON.stringify(products));
  return products;
}


exports.searchProducts = async(query)=>{
  const search = query.search || query.q || "";
  const city = query.city;
    const cacheKey = `products:search=${search}:city=${city}`;

 
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log("Cache HIT (search)");
    return JSON.parse(cached);
  }


  const filter = {};
  if (city) filter["location.city"] = city;
  const products = await productRepo.getAllProducts(filter, null, 0, 100);
  let result = [];
  products.forEach((product)=>{
    const match = getMatchPercentage(product,search);
    if(match >= 50){
      let plain = product.toObject();
      delete plain.matchPercentage;
      result.push({...plain, matchPercentage: match});
    }
  })
  result.sort((a,b) => b.matchPercentage - a.matchPercentage);
  await client.setEx(cacheKey, 86400, JSON.stringify(result));
  return result;
}


exports.getProductById = async (id) => {
  const key = PRODUCT_KEY(id);
  const cached = await client.get(key);
  if(cached){
    return JSON.parse(cached);
  }
  
  const product =  await productRepo.getProductById(id);
  await client.setEx(key, 86400, JSON.stringify(product));
  return product;
}


exports.updateProduct = async (id, data) => {
   const updated = await productRepo.updateProduct(id, data);
  client.del(PRODUCT_KEY(id));
  client.del(PRODUCT_LIST);
  return updated;
}



exports.deleteProduct = async (id) => {
  client.del(PRODUCT_KEY(id));
  client.del(PRODUCT_LIST);
  const deleted = await productRepo.deleteProduct(id);
  return deleted;
}

