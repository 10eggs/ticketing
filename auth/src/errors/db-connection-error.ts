import { CustomError } from './custom-error'

export class DBConnectionError extends CustomError{
  statusCode = 500;
  reason = 'Error connecting to db';
  constructor(){
    super('Problem with DB connection');
    Object.setPrototypeOf(this,DBConnectionError.prototype);
  }
  
  serializeErrors(){
    return [
      {message: this.reason}
    ]
  }
}