const Product = require("../models/productModel");



exports.createProduct = async (data) => {
  return await Product.create(data);
};


exports.getAllProducts = async (filter, search, skip, limit) => {

  if (!filter) filter = {};
  if (!skip) skip = 0;
  if (!limit) limit = 0;

  
  let query = { is_active: true, ...filter };
  
  
  if (search) {
    query.$text = { $search: search };
  }
  return await Product.find(
    query,
    search ? { score: { $meta: "textScore" } } : {}
  )
    .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip(skip)
    .limit(limit);
}

exports.getProductById = async (id) => {
  return await Product.findById(id);
}



exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}


exports.deleteProduct = async (id) => {
  return await Product.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );
}



