import mongoose from 'mongoose';
import express, { Request,Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, BadRequestError, OrderStatus } from '@supafellas/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';



const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string)=>{
      mongoose.Types.ObjectId.isValid(input)
    }) 
    .withMessage('TicketId must be provied')
],validateRequest, async (req: Request, res: Response)=>{

  const { ticketId } = req.body;
  // Find the ticket the user is trying to order in the database

  const ticket = await Ticket.findById(ticketId);
  if(!ticket){
    throw new NotFoundError();
  }

  // Make sure ticket not reserved
  // Run query to look at all orders. Find an order where the ticket
  // is the ticket we just found *and* the orders status is *not* cancelled.
  // If we find an order from that means the ticket *is* reserved
  const isReserved  = await ticket.isReserved();
  if(isReserved){
    throw new BadRequestError('Ticket is already ordered.');
  }



  // Calc expiration

  // Build the order and save it to the db

  // Publish an event saying that an order was created


  res.send({});
})

export { router as newOrderRouter };
