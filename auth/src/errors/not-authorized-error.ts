import {CustomError} from './custom-error'

export class NotAuthorizedError extends CustomError{
    statusCode = 401;
    
    constructor(){
      super('Not Authorized');

      Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(){
      return [{
        message: 'Not authorized.'
      }]
    }

    //Extending build-in class, that's why we need to add this line of code

}