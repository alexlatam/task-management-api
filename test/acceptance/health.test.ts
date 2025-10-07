import request from 'supertest';
import express from 'express';

// Crea una instancia de tu app para probar
const app = express();
app.use('/health', (req, res) => res.status(200).json({ status: 'OK' }));

describe('GET /health endpoint', () => {
    it('should return a 200 OK status', async () => {
        // Act & Assert
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'OK' });
    });
});