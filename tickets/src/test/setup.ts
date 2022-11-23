import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//global, as this is implemented in setup.ts file it will be present only in test environment

//For fix:
//Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)

//After refactoring it'll be like this:
//declare global {
// var signin: ()=>{string[]};
//}

declare global{
  var signin: () => string[];
}


//Helper function
global.signin = ()=>{
  //1. Build a JWT payload. {id, email}
  //Instead of hardcoded ID, we are switching to random
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com'
    };

    //2. Create JWT
    const token = jwt.sign(payload,process.env.JWT_KEY!);

    //3. Build Session Object {jwt: MY_JWT}
    const session = {jwt: token};

    //4. Turn session into JSON
    const sessionJSON = JSON.stringify(session);
    
    //5. Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //6. return string thats the cookie with the encoded data
    return [`session=${base64}`];

}
jest.mock('../nats-wrapper');
jest.setTimeout(8000);
let mongo: any;

 beforeAll(async()=>{
  process.env.JWT_KEY = 'qwerty';
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri,{});

 })

beforeEach(async()=>{
  jest.clearAllMocks();
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


 