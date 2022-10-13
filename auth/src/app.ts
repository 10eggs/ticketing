import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler, NotFoundError } from '@supafellas/common';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'; 

const app = express();
//to add https connection
//traffic to our application is through ngingx
//Make express aware that app is behind proxy of ingress nginx
//It makes sure that traffic is secure even if it is coming from proxy
app.set('trust proxy',true);

app.use(json());
app.use(
  cookieSession({
    //to disable encryption as JWT is encrypted anyway
    signed:false,
    secure: process.env.NODE_ENV !== 'test'
  })
)
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//There are differences between how express handling async errors. We are handling it by using express-async-errors.
//It doesn't require to use next(), also we need to import this package only in one place in our code, do not need to use it in handlers
//Express recognize number of arguments - if it has more than 3 arguments than it is treated as error handler
// app.all('*',()=>{
//   throw new NotFoundError();
// })

app.use(errorHandler);

//curly braces because we are exporting just a name (app)
export { app };