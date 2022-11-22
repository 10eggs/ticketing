import express, { Request,Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@supafellas/common';
import { Order } from '../models/order';
import { OrderStatus } from '@supafellas/common';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response)=>{

  const { orderId } = req.params;
  
  const order = await Order.findById(orderId).populate('ticket');

  if(!order){
    throw new NotFoundError();
  }

  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  
  await order.save();
  
  
  //pub event about cancellation
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket:{
      id: order.ticket.id
    }
  })
  
  res.status(204).send(order);


})

export { router as deleteOrderRouter };
