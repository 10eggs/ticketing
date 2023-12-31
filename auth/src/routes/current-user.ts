import express from 'express'
import { currentUser } from '@supafellas/common';


const router = express.Router();

//second argument is a middleware
router.get('/api/users/currentuser', currentUser,(req,res)=>{
  res.send({currentUser: req.currentUser || null});

});



export { router as currentUserRouter };