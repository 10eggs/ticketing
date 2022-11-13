import { Publisher, Subjects, TicketUpdatedEvent } from '@supafellas/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

