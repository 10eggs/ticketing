import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';


const router = express.Router();

//Need to put some middleware here, after path we are passing it as an array
//Whenever we run validation result, it's going to inspect the request and pull out any information
//that was appended to the request during the validation step

  
router.post('/api/users/signup',[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 chars')
],
validateRequest,
async ( req: Request,res: Response)=>{

  const {email,password} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Email in use')
  }
  const user = User.build({email,password});
  await user.save();

  //Generate JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  },process.env.JWT_KEY!);

  //Store it on session object
  //Type definition we installed for jwt are not assuming there is property called jwt, that's why we can see an error here
  // req.session.jwt = userJwt;

  //To overcome it, we redefine entire object, like this:
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);

});

export { router as signupRouter };


