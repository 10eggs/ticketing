import express from 'express'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler'
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//Express recognize number of arguments - if it has more than 3 arguments than it is treated as error handler
app.use(errorHandler);

app.listen(3000, ()=>{
  console.log(`AUTH SERVICE: Listening on port 3000!!!`);
});