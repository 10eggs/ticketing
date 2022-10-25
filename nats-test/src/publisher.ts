import nats from 'node-nats-streaming'

//Instance of nats
const stan = nats.connect('ticketing','abc',{
  url: 'http://localhost:4222'
});



 //emmit an event
 stan.on('connect', ()=>{
  console.log('Publisher connected to NATS')

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });

  stan.publish('ticket:created',data, ()=>{
    console.log('Message published!');
  })
 }) 

