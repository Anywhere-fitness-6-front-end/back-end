const request = require('supertest');
const server = require('../server');
const db = require('../../data/db-config');

const instructor = {
	name: 'Max Beefstack',
	instructor: true,
	email: 'maxbeef@email.com',
	password: 'ilovedandelions'
};

const newClass = {
	"class_name": "Stack That Beef",
	"class_time": "2021-07-31T01:00:00.000Z",
	"duration": 90,
	"activity_name": "Weight Lifting",
	"intensity": "intense",
	"address": "123 Address Lane, Beefo, CA",
	"max_size": 12
}

const receivedClass = {
	class_id: 2,
	class_name: 'Stack That Beef',
	class_time: '2021-07-31T01:00:00.000Z',
	duration: 90,
	instructor_id: 2,
	activity_name: 'Weight Lifting',
	intensity: 'intense',
	address: '123 Address Lane, Beefo, CA',
	max_size: 12,
	available_slots: 12,
	instructor_name: 'Max Beefstack',
}

let token;


beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
	await db.seed.run();
});

describe('instructor can log in, post a new class, update that class, and delete it', () => {
	it('can log in', async () => {
		const result = await request(server).post('/users/login').send({ email: instructor.email, password: instructor.password });
		expect(result.status).toBe(200);
		expect(result.body.message).toMatch(/welcome, max beefstack/i);
		token = result.body.token;
	});
	it('can post a new class', async () => {
		const result = await request(server).post('/classes').set('Authorization', token).send(newClass);
		expect(result.status).toBe(201);
		expect(result.body).toMatchObject(receivedClass);
	})
	it('can update that class', async () => {
		const upd = { ...newClass, class_name: 'Just Beef!' }

		const result = await request(server).put('/classes/2').set('Authorization', token).send(upd);
		expect(result.status).toBe(200);
		expect(result.body.class_name).toMatch(/just beef/i);
	})
	it('can delete the class', async () => {
		const result = await request(server).delete('/classes/2').set('Authorization', token);
		expect(result.status).toBe(200);
	})
});
