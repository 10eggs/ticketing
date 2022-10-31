import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event'
import { Subjects } from './subjects';
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  
  //Why type annotation?
  //TS may think that we'll want to change value of subject some time in the future
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated; 
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message){
    console.log(`Event data in TicketCreated Listener / Q Group payment-service. Data: ${JSON.stringify(data)}`);
    msg.ack();
}};