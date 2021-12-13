import { StatusCodes } from 'http-status-codes';
import { Player } from '../models/PlayerModel.js';
import Club from '../models/ClubModel.js';
import ApiError from '../errors/ApiError.js';
import { setCurrentClub, removePlayerFromPreviousClub } from './playerListControllers.js';

const getPlayerDetails = async (req, res, next) => {
  const playerID = req.params.id;

  try {
    const player = await Player.findOne({ _id: playerID }).orFail();
    res.status(StatusCodes.OK).json(player);
  } catch (err) {
    console.log('ERROR: ------>', err);
    next(ApiError.notFound('Resource not found. The specified resource does not exist.'));
  }
};

const updatePlayerDetails = async (req, res, next) => {
  const playerData = req.body;

  try {
    const updatedPlayerData = await setCurrentClub(playerData);
    const updatedPlayer = await Player
      .findOneAndUpdate({ _id: updatedPlayerData._id }, updatedPlayerData, { new: true })
      .orFail();

    await removePlayerFromPreviousClub(updatedPlayerData._id);

    if (updatedPlayer.club._id) {
      await Club
        .findOneAndUpdate({ _id: updatedPlayer.club._id }, { $addToSet: { squad: updatedPlayer } })
        .orFail();
    }

    res.status(StatusCodes.OK).json({ error: false, message: 'Player successfuly updated' });
  } catch (err) {
    console.log('ERROR: ------>', err);
    next(ApiError.notFound({ error: true, message: 'Resource not found. The specified resource does not exist.' }));
  }
};

export default {
  getPlayerDetails,
  updatePlayerDetails
};
