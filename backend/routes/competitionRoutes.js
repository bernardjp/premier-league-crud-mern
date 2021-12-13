import express from 'express';
import competitionController from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', competitionController.getCompetitions);
router.get('/:id', competitionController.getCompetitionDetails);

export default router;
