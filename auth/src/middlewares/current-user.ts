import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload{
  id: string;
  email: string;
}

//We don't need to extend actual stuff 
//We can reach actual type definition by using this statements
declare global{
  namespace Express{
    interface Request{
      currentUser?: UserPayload
    }
  }
}

//Because it's not an error handling middleware, it'll take 3 args
export const currentUser = (req: Request, res: Response, next: NextFunction) =>{
   
  //if we don't have session object or jwt property
  if(!req.session?.jwt){
    return next();
  }

  try{
    const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
    // Can't do anything like this
    // We want to add a property to the object which is already defined
    // req.currentUser = payload;
  }
  catch(err){

  }
  next();
};