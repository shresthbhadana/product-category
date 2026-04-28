const productCategoryRepo = require("../repository/productCategoryRepo");
const client = require("../config/redis");
const CATEGORY_LIST = "category:list";
const CATEGORY_KEY = (id) => `category:${id}`;

exports.createCategory = async (data) => {

  const category =  await productCategoryRepo.createCategory(data);
  client.del(CATEGORY_LIST);
  return category;
}

exports.getCategories = async (query) => {
  const { search, page = 1, limit = 10 } = query;
const filter = {}
  const skip = (page - 1) * limit;

   const cacheKey = `categories:search=${search}:page=${page}:limit=${limit}`;
  const cached = await client.get(cacheKey);
  if(cached){
    return JSON.parse(cached)
  }
   const categories = await productCategoryRepo.getAllCategories(
    filter,
    search,
    Number(skip),
    Number(limit)
  );
   await client.setEx(cacheKey, 86400, JSON.stringify(categories));
   return categories;
}

exports.getCategoryById = async (id) => 
  {
    const key = CATEGORY_KEY(id);
    const cached = await client.get(key);
    if(cached){
      return JSON.parse(cached);
    }

    
  const category = await productCategoryRepo.getCategoryById(id);
  await client.setEx(key,86400, JSON.stringify(category));
  return category
}

exports.updateCategory = async (id, data) => {
  const updatedCategory =  await productCategoryRepo.updateCategory(id, data);
  client.del(CATEGORY_KEY(id))
  client.del(CATEGORY_LIST);
return updatedCategory;
}


exports.deleteCategory = async (id) => {
  const deletedCategory = await productCategoryRepo.deleteCategory(id);
  client.del(CATEGORY_KEY(id))
  client.del(CATEGORY_LIST);
  return deletedCategory;
}

