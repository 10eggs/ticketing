import request from 'supertest';
import { app } from '../../app'
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';



 
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


    expect(response.status).not.toEqual(401);

},10000)

it('returns an error if an invalid title is provided', async() =>{
   await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title: '',
      price: 100
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price:10
    })
    .expect(400);
},10000)

it('returns an error if an invalid price is provided', async() =>{
  await request(app)
   .post('/api/tickets')
   .set('Cookie', global.signin())
   .send({
     title: 'asdk',
     price: -100
   })
   .expect(400);

   await request(app)
   .post('/api/tickets')
   .set('Cookie', global.signin())
   .send({
    title: 'asdk'
   })
   .expect(400);
},10000)


it('creates ticket with valid parameters', async() =>{

  //Declare test variables here

  let title = 'This is title';
  //Let - as we reassign this variable later
  let tickets = await Ticket.find({});
  let price = 10;

  expect(tickets.length).toEqual(0);
  
  //Add check to make sure a ticket saved
  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title,
      price
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);

},15000)


it('publishes an event', async()=>{

  let title = 'This is title';
  let price = 10;

  
  //Add check to make sure a ticket saved
  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title,
      price
    })
    .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
  });