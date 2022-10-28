import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
  url: 'http://localhost:4222'
});


stan.on('connect',()=>{
  console.log('Listener connected to NATS');
  //Extra options are set in fluent interface flavour
  // stan.subscriptionOptions().X().Y();
  //(channel,queue group,extra options)
  stan.on('close', ()=>{
    console.log('NATS connection closed!');
    process.exit();
  })

  new TicketCreatedListener(stan).listen();
});

//Interrupt signal
process.on('SIGINT', () =>{
stan.close();
})
//Terminate signal
process.on('SIGTERM', () => {
  stan.close();
})