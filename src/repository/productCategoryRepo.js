const ProductCategory = require("../models/productCategoryModel");

exports.createCategory = async (data) => {
  return await ProductCategory.create(data);
}

exports.getAllCategories = async (filter, search, skip, limit) => {
  filter = filter || {};
  skip = skip || 0;
  limit = limit || 0;

  const query = { is_active: true, ...filter };

  if (search) {
    query.$text = { $search: search };
  }

  return await ProductCategory.find(
    query,
    search ? { score: { $meta: "textScore" } } : {}
  )
    .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip(skip)
    .limit(limit);
}

exports.getCategoryById = async (id) => {
  return await ProductCategory.findById(id);
}

exports.updateCategory = async (id, data) => {
  return await ProductCategory.findByIdAndUpdate(id, data, { new: true });
}


exports.deleteCategory = async (id) => {
  return await ProductCategory.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );
}

