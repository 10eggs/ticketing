import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

//Interfaces doesn't exist in Javascript world, but abstract classes do - we can use instance of abstract class within check
// interface CustomError {
//   statusCode: number;
//   serializeErrors():{
//     message: string;
//     field?: string
//   }[];
// }

//Use 'private' keyword - take property errors and assign it to the overall class, otherway we'd need to write something like
//errors: ValidationError[];
//this.errors=errors;

export class RequestValidationError extends CustomError implements CustomError{
  statusCode = 400; 
   constructor(public errors: ValidationError[]){
    super('Invalid request parameters');

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
   }

   serializeErrors(){
    return this.errors.map(error=>{
       return { message: error.msg, field: error.param}
    })
   }
}
