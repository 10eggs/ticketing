import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

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
],(req: Request,res: Response)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).send(errors.array())
  }
  const {email, password } = req.body;

  console.log('Creating a user...')

  res.send({});
  
});

export { router as signupRouter };