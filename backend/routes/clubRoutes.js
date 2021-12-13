import express from 'express';
import clubListControllers from '../controllers/clubListControllers.js';
import clubDetailsController from '../controllers/clubDetailsController.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.get('/', clubListControllers.getClubsByName, clubListControllers.getClubsByCompetition, clubListControllers.getClubs);
router.delete('/', clubListControllers.deleteClub);
router.post('/new', upload.single('fileData'), clubListControllers.addClub);
router.get('/:id', clubDetailsController.getClubDetails);
router.patch('/update/:id', upload.single('fileData'), clubDetailsController.updateClubDetails);

export default router;
