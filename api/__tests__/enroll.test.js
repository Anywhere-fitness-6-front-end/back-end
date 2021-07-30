const request = require('supertest');
const server = require('../server');
const db = require('../../data/db-config');

const user = { name: 'Test User', instructor: false, email: 'test@user.com', password: 'testpass' }
let token;

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
	await db.seed.run();
});

describe('user can log in, get a list of classes, and get info about a specific class', () => {
	it('can log in', async () => {
		const result = await request(server).post('/users/login').send({ email: user.email, password: user.password });
		expect(result.status).toBe(200);
		expect(result.body.message).toMatch(/welcome, test user/i);
		token = result.body.token;
	});
	it('get a list of classes', async () => {
		const result = await request(server).get('/classes').set('Authorization', token);
		expect(result.status).toBe(200);
		expect(result.body).toHaveLength(1);
	})
	it('can get info about a specific class', async () => {
		const result = await request(server).get('/classes/1').set('Authorization', token);
		expect(result.status).toBe(200);

		const cb = result.body;
		expect(cb).toHaveProperty("class_id", 1)
		expect(cb).toHaveProperty("class_name")
		expect(cb).toHaveProperty("class_time")
		expect(cb).toHaveProperty("duration")
		expect(cb).toHaveProperty("instructor_id")
		expect(cb).toHaveProperty("activity_name")
		expect(cb).toHaveProperty("intensity")
		expect(cb).toHaveProperty("address")
		expect(cb).toHaveProperty("max_size")
		expect(cb).toHaveProperty("available_slots")
		expect(cb).toHaveProperty("instructor_name")
		expect(cb).toHaveProperty("enrolled")
	})
});


describe('user can check enrollment in a class, enroll in a class, and un-enroll from a class', () => {
	it('can check enrollment', async () => {
		const result = await request(server).get('/enroll/1').set('Authorization', token);
		expect(result.status).toBe(200);
		expect(result.body).toBe(true);
	});
	it('it can un-enroll', async () => {
		const result = await request(server).delete('/enroll/1').set('Authorization', token);
		expect(result.status).toBe(200);
		expect(result.body.message).toMatch(/successfully removed user from class/i);
	})
	it('it can enroll', async () => {
		const result = await request(server).post('/enroll/1').set('Authorization', token);
		expect(result.status).toBe(201);
		expect(result.body.message).toMatch(/successfully added user to class/i);
		console.log(result.body);
	})
});
