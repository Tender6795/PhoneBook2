import express from 'express';
import * as ContactController from '../controllers/contact';
import imageUpload from '../middlewares/imageUpload';
const router = express.Router();

router.get('/contacts', ContactController.all)
  .get('/:hash', ContactController.searchByHash)
  .post('/create',imageUpload.single('photo'), ContactController.create)
  .patch('/:hash',imageUpload.single('photo'), ContactController.update)
  .delete('/:hash', ContactController.deleteContact)
  // .get('/:params',ContactController.search);
export default router;