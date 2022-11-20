import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//string - type specific to typescript
//String - specific for mongoose
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc extends  mongoose.Document{
  title: string;
  price: number;
  userId: string;
  version: number;
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

ticketSchema.set('versionKey','version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) =>{
  return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema);


export { Ticket };