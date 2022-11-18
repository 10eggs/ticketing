import { Publisher, OrderCreatedEvent, Subjects } from '@supafellas/common';

export class OrderCreatedPubliusher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

