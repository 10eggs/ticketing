import mongoose from 'mongoose';

//string - type specific to typescript
//String - specific for mongoose
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc {
  title: string;
  price: number;
  userId: string;
}


interface TicketModel extends mongoose.Model<TicketDoc>{
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    //value type - refeering to global string constructor
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  userId: {
    type: String,
    required: true
  }
},
{
  //direct changes to the object
  toJSON:{
    transform(doc,ret){
      ret.id = ret._id;
      delete ret._id;
    }
  }
});


ticketSchema.statics.build = (attrs: TicketAttrs) =>{
  return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema);


export { Ticket };