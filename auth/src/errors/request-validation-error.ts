import { ValidationError } from 'express-validator';


//Use 'private' keyword - take property errors and assign it to the overall class, otherway we'd need to write something like
//errors: ValidationError[];
//this.errors=errors;

export class RequestValidationError extends Error{
   constructor(private errors: ValidationError[]){
    super();

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
   }
}
