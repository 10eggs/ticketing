import mongoose from 'mongoose';
import express, { Request,Response } from 'express';
import { requireAuth, validateRequest } from '@supafellas/common';
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

  res.send({});
})

export { router as newOrderRouter };
