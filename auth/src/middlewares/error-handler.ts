//http://expressjs.com/en/guide/error-handling.html
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';


export const errorHandler = (err:Error, req: Request, res: Response, next: NextFunction) =>{
  //Check error type
  //Initially we had to do check for every type of Error. By introducing abstract class we can just check if errortype = CustomError, just one check.
  if(err instanceof CustomError){
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }


  res.status(400).send({
    errors:[
      {message: 'Something went wrong'}
    ]
  });
}