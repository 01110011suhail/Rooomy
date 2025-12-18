import express from 'express';
import { protect } from '../middleware/authMiddleWare';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController';


const userRouter = express.Router();

// Route to get user data
userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

export default userRouter;