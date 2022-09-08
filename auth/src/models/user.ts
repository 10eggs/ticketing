import mongoose from 'mongoose';

//An interface that describes the properties
//that are required to create a new User
interface UserAttrs{
  email: string;
  password: string;
}


//
/**
 * 
 * User.build({}); <- Won't be recognized by TypeScript, we need to introduce another interface to help TS with it
 * 
 */

//An interface that describes the properties
//That a User Model Has
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;

}

//An interface that describes the properties
//that a User Document has (User Document = Single User)
//If we'd like to reach any built-in property we should put relevant property down here, in UserDoc interface, eg. .updatedAt
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
}


//Schema
const userSchema = new mongoose.Schema({
  email: {
    //Doesn't do anything in typescript, just schema deifnition. Start from capital letter as we are refering to build-in type
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});
//static property for schema:
userSchema.statics.build = (attrs: UserAttrs)=>{
  return new User(attrs);

 }
const User = mongoose.model<UserDoc,UserModel>('User',userSchema);



export { User };