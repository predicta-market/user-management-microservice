import express,{Request,Response} from 'express';
import authRoute from './auth';
import { SuccessResponse } from '../common';
const router = express.Router();

router.use('/auth',authRoute);

router.get('/check', (_req: Request, res: Response)=>{
    const response = SuccessResponse('user-management microservice is live.') 
    res.status(200).json(response);
});

export default router;