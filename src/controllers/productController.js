

const productService = require("../services/productServices");
const logger = require("../config/logger")
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
        logger.info("Product created successfully")
  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.error("error in creating product")
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
    logger.info("product fetched successfully")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error om fetching products")
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const data = await productService.searchProducts(req.query);
    res.json(data);
    logger.info("product searched")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in searching the products")
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
    logger.info(`prodyct ${req.params.id} is fetched successfully`)
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in fetching the product")
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
    logger.info("product updated successfully")
  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.error("error in updating product")
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
    logger.info("product deleted successfully")
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error("error in deleting product")
  }
};