import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
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
],async ( req: Request,res: Response)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    //We are going to throw an error and it's going to be automactically picked up by that error handler middleware
      throw new RequestValidationError(errors.array());
  }

  const {email,password} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Email in use')
  }
  const user = User.build({email,password});
  await user.save();

  res.status(201).send(user);

});

export { router as signupRouter };


