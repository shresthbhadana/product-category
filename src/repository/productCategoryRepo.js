const ProductCategory = require("../models/productCategoryModel");

async function createCategory(data) {
  return await ProductCategory.create(data);
}

const getAllCategories = async (filter, search, skip, limit) => {
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

const getCategoryById = async (id) => {
  return await ProductCategory.findById(id);
}

const updateCategory = async (id, data) => {
  return await ProductCategory.findByIdAndUpdate(id, data, { new: true });
}


const deleteCategory = async (id) => {
  return await ProductCategory.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};