const request = require('supertest');
const app = require('../app');
const planService = require('../services/planService');

jest.mock('../services/planService');

describe('Plan APIs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/plans', () => {
    it('should create a new plan and return 201', async () => {
      const mockPlan = { _id: '1', period: 'monthly', interval: 1, item: { name: 'Basic', amount: 100 } };
      planService.createPlan.mockResolvedValue(mockPlan);

      const res = await request(app)
        .post('/api/plans')
        .send({ period: 'monthly', interval: 1, item: { name: 'Basic', amount: 100 } });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockPlan);
    });

    it('should return 400 on error', async () => {
      planService.createPlan.mockRejectedValue({ error: 'Razorpay Error' });

      const res = await request(app).post('/api/plans').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Razorpay Error');
    });
  });

  describe('GET /api/plans', () => {
    it('should return all plans', async () => {
      const mockPlans = [{ period: 'monthly' }, { period: 'yearly' }];
      planService.getPlans.mockResolvedValue(mockPlans);

      const res = await request(app).get('/api/plans');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockPlans);
    });
  });

  describe('GET /api/plans/:id', () => {
    it('should get a plan by ID', async () => {
      const mockPlan = { _id: '1', period: 'monthly' };
      planService.getPlanById.mockResolvedValue(mockPlan);

      const res = await request(app).get('/api/plans/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockPlan);
    });

    it('should return 404 if not found', async () => {
      planService.getPlanById.mockResolvedValue(null);

      const res = await request(app).get('/api/plans/1');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Not found');
    });
  });

  describe('PUT /api/plans/:id', () => {
    it('should update a plan', async () => {
      const updatedPlan = { _id: '1', period: 'yearly' };
      planService.updatePlan.mockResolvedValue(updatedPlan);

      const res = await request(app)
        .put('/api/plans/1')
        .send({ period: 'yearly' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedPlan);
    });
  });

  describe('DELETE /api/plans/:id', () => {
    it('should delete a plan', async () => {
      planService.deletePlan.mockResolvedValue({ _id: '1' });

      const res = await request(app).delete('/api/plans/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Deleted successfully');
    });
  });
});
