import request from 'supertest';
import  { app } from '../../app';

it('returns a 201 on successful signup', async()=>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
})

it('returns a 400 with an invalid email',async()=>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
})

it('sets a cookie after successful signup', async() =>{
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  //get() allow us to get headers
  expect(response.get('Set-Cookie')).toBeDefined();
})