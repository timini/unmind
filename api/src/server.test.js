import { initServer } from './server';
import request from 'superagent';
import { connection, createTables } from './db';
import { type } from 'ramda';

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

const port = randomInt(10000, 20000);
const urlBase = `http://localhost:${port}`;

let server;

beforeAll(() => {
  server = initServer({ port });
  return createTables();
});

afterAll(() => server.stop());

it('server should run', async () => {
  const resp = await request.get(`${urlBase}/`);
  expect(resp.status).toEqual(200);
});

it('should return 400 for bad requests', async () => {
  try {
    const resp = await request
      .post(`${urlBase}/api/check-in`)
      .set('Content-Type', 'application/json')
      .send('');
  } catch (err) {
    expect(err.status).toEqual(400);
    expect(err.response.text).toEqual(
      '{"err":"`mood` and `feeling` are required"}'
    );
  }
  try {
    const resp = await request
      .post(`${urlBase}/api/check-in`)
      .set('Content-Type', 'application/json')
      .send({});
  } catch (err) {
    expect(err.status).toEqual(400);
    expect(err.response.text).toEqual(
      '{"err":"`mood` and `feeling` are required"}'
    );
  }
});

it('should check the values are in the enum', async () => {
  try {
    const resp = await request
      .post(`${urlBase}/api/check-in`)
      .set('Content-Type', 'application/json')
      .send({ mood: '1', feeling: 'x' });
  } catch (err) {
    expect(err.status).toEqual(400);
  }
});

it('should return created data with correct input', async () => {
  const resp = await request
    .post(`${urlBase}/api/check-in`)
    .set('Content-Type', 'application/json')
    .send({ mood: '1', feeling: 'happy' });
  expect(resp.status).toEqual(200);
  expect(resp.body.mood).toEqual('1');
  expect(resp.body.feeling).toEqual('happy');
});

it('should only have one check-in in the list', async () => {
  const resp = await request.get(`${urlBase}/api/check-in`);
  expect(type(resp.body)).toBe('Array');
  expect(resp.body.length).toEqual(1);
});
