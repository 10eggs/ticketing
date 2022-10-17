import request from 'supertest';
import { app } from '../../app'

jest.useRealTimers(); 

it('has a route handler listening to /api/tickets for post request', async() =>{
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
})

it('can only be accessed of the user is signed in', async() =>{
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
})

it('returns a status other than 401 when user is signed in', async()=>{
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({});

    console.log(`Response from status ${response.status}`);
    // expect(response.status).not.toEqual(401);
},10000)

it('returns an error if an invalid title is provided', async() =>{
  
})

it('creates ticket with valid parameters', async() =>{
   
})