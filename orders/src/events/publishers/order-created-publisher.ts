import { Publisher, OrderCreatedEvent, Subjects } from '@supafellas/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

