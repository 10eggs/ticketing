import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';

//global, as this is implemented in setup.ts file it will be present only in test environment

//For fix:
//Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)


declare global{
  var signin: () => Promise<string[]>;
}

//Helper function
global.signin = async()=>{
  const email = 'email@email.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}

let mongo: any;

 beforeAll(async()=>{
  process.env.JWT_KEY = 'qwerty';
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri,{});

 })

beforeEach(async()=>{
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections){
    await collection.deleteMany({});
  }
});


afterAll(async()=>{
if(mongo){
  await mongo.stop();
}

await mongoose.connection.close();
});


 