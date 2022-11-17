import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app'
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';




it('fetches the order', async () =>{
  //Create ticket
  const ticket = Ticket.build({
    title: 'title',
    price: 20
  });

  await ticket.save();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

    
  // make a request to fetch the order
  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie',user)
    .send()
    .expect(200)
  
  expect(fetchedOrder.id).toEqual(order.id);
})

it.todo('return 404 when order not found');


it('401 if one user tries to fetch another users order', async () =>{
  //Create ticket
  const ticket = Ticket.build({
    title: 'title',
    price: 20
  });

  await ticket.save();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

  const userTwo = global.signin();
  // make a request to fetch the order
  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie',userTwo)
    .send()
    .expect(401)
})