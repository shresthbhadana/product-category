const request = require('supertest');
const app = require('../app');
const userService = require('../services/userServices');

jest.mock('../services/userServices');

describe('User APIs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users/signup', () => {
    it('should create a new user and return 201', async () => {
      const mockUser = { _id: '123', email: 'test@example.com', name: 'Test User' };
      userService.signup.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'Test User' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockUser);
      expect(userService.signup).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return 400 on error', async () => {
      userService.signup.mockRejectedValue(new Error('Email already registered'));

      const res = await request(app).post('/api/users/signup').send({ email: 'test@example.com' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email already registered');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user and return token', async () => {
      const mockRes = { user: { _id: '123', email: 'test@example.com' }, token: 'fake-jwt-token' };
      userService.login.mockResolvedValue(mockRes);

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockRes);
    });

    it('should return 400 for invalid credentials', async () => {
      userService.login.mockRejectedValue(new Error('Invalid password'));

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'wrong' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Invalid password');
    });
  });

  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
      userService.getUsers.mockResolvedValue(mockUsers);

      const res = await request(app).get('/api/users');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUsers);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const mockUser = { _id: '123', name: 'User 1' };
      userService.getUserById.mockResolvedValue(mockUser);

      const res = await request(app).get('/api/users/123');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if user not found', async () => {
      userService.getUserById.mockResolvedValue(null);

      const res = await request(app).get('/api/users/123');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = { _id: '123', name: 'Updated Name' };
      userService.updateUser.mockResolvedValue(updatedUser);

      const res = await request(app)
        .put('/api/users/123')
        .send({ name: 'Updated Name' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedUser);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      userService.deleteUser.mockResolvedValue(true);

      const res = await request(app).delete('/api/users/123');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User deleted');
    });
  });
});
