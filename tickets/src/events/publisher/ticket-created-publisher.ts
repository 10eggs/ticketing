import { Publisher, Subjects, TicketCreatedEvent } from '@supafellas/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

