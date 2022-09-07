//http://expressjs.com/en/guide/error-handling.html
import { Request, Response, NextFunction } from 'express';
import { DBConnectionError } from '../errors/db-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';


export const errorHandler = (err:Error, req: Request, res: Response, next: NextFunction) =>{
  //Check error type
  if(err instanceof RequestValidationError){
    console.log('Hanlding this error as a reqiest validation error')
  }

  if(err instanceof DBConnectionError){
    console.log('DB Connection error')
  }
  console.log('Something when wrong: ',err)
  res.status(400).send({
    message: err.message
  });
}