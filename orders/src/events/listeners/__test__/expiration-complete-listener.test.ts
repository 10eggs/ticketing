import mongoose from 'mongoose';
import { OrderStatus, ExpirationCompleteEvent } from '@supafellas/common';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';
const setup = async () =>{
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Title',
    price: 20

  });

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'asfk',
    expiresAt: new Date(),
    ticket
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] ={
    orderId: order.id
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
}


