import express from 'express';
import playerListController from '../controllers/playerListControllers.js';
import playerDetailsController from '../controllers/playerDetailsControllers.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.get('/', playerListController.getSearchedPlayer, playerListController.getPlayers);
router.delete('/', playerListController.deletePlayer);
router.post('/new', upload.none(), playerListController.addPlayer);
router.get('/:id', playerDetailsController.getPlayerDetails);
router.put('/update/:id', upload.none(), playerDetailsController.updatePlayerDetails);

export default router;
