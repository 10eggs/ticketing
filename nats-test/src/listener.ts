import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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


abstract class Listener{
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg:Message):void;
  private client: Stan;
  protected akcWait = 5*1000;

  constructor(client: Stan) {
    this.client=client;    
  }

  subscriptionOptions(){
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.akcWait)
      .setDurableName(this.queueGroupName)
  }

  listen(){
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on('message', (msg: Message)=>{
      console.log( 
        `Message received ${this.subject} / ${this.queueGroupName}`
      );
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData,msg);
    });
  }

  parseMessage(msg:Message){
    const data = msg.getData();
    return typeof data === 'string'
    ? JSON.parse(data)
    : JSON.parse(data.toString('utf8'));
  }
}

class TicketCreatedListener extends Listener {
  subject = 'ticked:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message){
    console.log(`Event data in TicketCreated Listener / Q Group payment-service. Data: ${data}`);
    msg.ack();
  };



}