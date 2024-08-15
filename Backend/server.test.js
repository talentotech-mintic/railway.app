const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('API Endpoints', () => {
    it('GET /api/products should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /api/products should create a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            price: 9.99,
            desc: 'This is a test product',
            image: 'http://example.com/image.jpg'
        };

        const res = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newProduct.name);
    });

    it('POST /api/users/register should register a new user', async () => {
        const newUser = {
            username: 'testuser',
            password: 'testpassword'
        };

        const res = await request(app)
            .post('/api/users/register')
            .send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuario registrado exitosamente');
    });

    it('POST /api/users/login should login a user', async () => {
        const user = {
            username: 'testuser',
            password: 'testpassword'
        };

        const res = await request(app)
            .post('/api/users/login')
            .send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});