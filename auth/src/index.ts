import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//There are differences between how express handling async errors. We are handling it by using express-async-errors.
//It doesn't require to use next(), also we need to import this package only in one place in our code, do not need to use it in handlers
//Express recognize number of arguments - if it has more than 3 arguments than it is treated as error handler
app.all('*',()=>{
  throw new NotFoundError();
})

app.use(errorHandler);

const start = async()=>{
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  }
  catch(err){
    console.log('Can not connect to MongoDB!')
    console.error(err)
  }

  app.listen(3000, ()=>{
    console.log(`AUTH SERVICE: Listening on port 3000!!!`);
  });
};


start();