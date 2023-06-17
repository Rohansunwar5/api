const request = require('supertest');
const app = require('./server');

describe('API Tests', () => {
  beforeAll(async () => {
    // Wait for the CSV file to be processed before running the tests
    await new Promise((resolve) => {
      app.on('ready', resolve);
    });
  });

  it('should return the bank list', async () => {
    const res = await request(app).get('/banks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return branch details for a specific bank', async () => {
    const bankName = 'Example Bank';
    const res = await request(app).get(`/branches/${"ALLAHABAD BANK"}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].bank_name).toEqual("ALLAHABAD BANK");
  });
});