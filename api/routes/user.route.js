import express from 'express';
import { createReadingList, addBookToReadingList, removeBookFromReadingList, updateUser,deleteUser,getUser,getReadingList,getAllUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

//user 
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/:id',getUser)
router.get('/',getAllUsers)




router.post('/:userId/reading-list', createReadingList);
router.post('/:userId/reading-list/add', addBookToReadingList);
router.post('/:userId/reading-list/remove', removeBookFromReadingList);
router.get('/:userId/reading-list',getReadingList);



export default router;
