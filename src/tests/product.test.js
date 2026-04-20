const request = require('supertest');
const app = require('../app');
const productService = require('../services/productServices');

jest.mock('../services/productServices');

describe('Product APIs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/products', () => {
    it('should create a new product and return 201', async () => {
      const mockProduct = { _id: '1', product_name: 'Product 1' };
      productService.createProduct.mockResolvedValue(mockProduct);

      const res = await request(app)
        .post('/api/products')
        .send({ product_name: 'Product 1', product_category_id: 'cat1' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 400 on error', async () => {
      productService.createProduct.mockRejectedValue(new Error('Validation failed'));

      const res = await request(app).post('/api/products').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const mockProducts = [{ product_name: 'P1' }, { product_name: 'P2' }];
      productService.getProducts.mockResolvedValue(mockProducts);

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProducts);
    });
  });

  describe('GET /api/products/search', () => {
    it('should search products and return them', async () => {
      const mockResults = [{ product_name: 'P1', matchPercentage: 100 }];
      productService.searchProducts.mockResolvedValue(mockResults);

      const res = await request(app).get('/api/products/search?q=P1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResults);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get a product by ID', async () => {
      const mockProduct = { _id: '1', product_name: 'P1' };
      productService.getProductById.mockResolvedValue(mockProduct);

      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 if not found', async () => {
      productService.getProductById.mockResolvedValue(null);

      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Not found');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = { _id: '1', product_name: 'P1 Updated' };
      productService.updateProduct.mockResolvedValue(updatedProduct);

      const res = await request(app)
        .put('/api/products/1')
        .send({ product_name: 'P1 Updated' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedProduct);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      productService.deleteProduct.mockResolvedValue({ _id: '1' });

      const res = await request(app).delete('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Deleted successfully');
    });
  });
});
