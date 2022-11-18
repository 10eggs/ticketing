import { Publisher, OrderCancelledEvent, Subjects } from '@supafellas/common';

export class OrderCreatedPubliusher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

