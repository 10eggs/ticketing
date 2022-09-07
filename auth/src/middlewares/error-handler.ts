//http://expressjs.com/en/guide/error-handling.html
import { Request, Response, NextFunction } from 'express';
import { DBConnectionError } from '../errors/db-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';


export const errorHandler = (err:Error, req: Request, res: Response, next: NextFunction) =>{
  //Check error type
  if(err instanceof RequestValidationError){
    const formattedErrors = err.errors.map(error=>{
      return { message: error.msg, field: error.param}
    })
    return res.status(400).send({errors: formattedErrors});
  }

  if(err instanceof DBConnectionError){
    return res.status(500).send({ errors: [
      { message: err.reason}
    ]})
  }
  
  res.status(400).send({
    errors:[
      {message: 'Something went wrong'}
    ]
  });
}