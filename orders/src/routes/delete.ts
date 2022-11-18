import express, { Request,Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@supafellas/common';
import { Order, OrderStatus } from '../models/order';
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
  
  res.status(204).send(order);

  //pub event about cancellation
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket:{
      id: order.ticket.id
    }
  })
})

export { router as deleteOrderRouter };
