import { StatusCodes } from 'http-status-codes';
import { Player } from '../models/PlayerModel.js';
import Club from '../models/ClubModel.js';
import ApiError from '../errors/ApiError.js';

const getSearchedPlayer = async (req, res, next) => {
  if (!req.query.name) return next();
  const regex = new RegExp(`${req.query.name}`, 'gi');

  try {
    const players = await Player
      .find({ name: { $regex: regex } }, '_id name position club', { sort: { name: 1 } })
      .limit(100)
      .orFail();

    res.status(StatusCodes.OK).json(players);
  } catch (err) {
    next(ApiError.notFound('Resource not found: The specified resource does not exist.'));
  }
};

const getPlayers = async (req, res, next) => {
  try {
    const players = await Player
      .find(null, '_id name position club', { sort: { name: 1 } })
      .orFail();

    res.status(StatusCodes.OK).json(players);
  } catch (err) {
    console.log('ERROR: ------>', err);
    next(ApiError.notFound('Resource not found: The specified player list do not exist or could not be found.'));
  }
};

const deletePlayer = async (req, res, next) => {
  const playerID = req.body._id;

  try {
    await Player.deleteOne({ _id: playerID });
    await removePlayerFromPreviousClub(playerID);

    res.status(StatusCodes.OK).send({ message: `Player ID: ${playerID} successfuly deleted` });
  } catch (err) {
    next(ApiError.internalError('Server internal error: The specified resource could not be deleted. Try again later.'));
  }
};

const addPlayer = async (req, res, next) => {
  const newPlayerData = req.body;

  try {
    const updatedPlayerData = await setCurrentClub(newPlayerData);
    const newPlayer = new Player(updatedPlayerData);
    await newPlayer.save();

    if (updatedPlayerData.club._id) {
      await Club
        .findOneAndUpdate({ _id: updatedPlayerData.club._id }, { $addToSet: { squad: newPlayer } })
        .orFail();
    }

    res.status(StatusCodes.CREATED).send({ message: 'Player successfuly created', playerData: newPlayer });
  } catch (err) {
    console.log('ERROR: ---->', err);
    next(ApiError.internalError('Server internal error: The specified resource could not be created. Try again later.'));
  }
};

export async function setCurrentClub(playerData) {
  const updatedPlayerData = { ...playerData };
  const [currentClub] = await Club.find({ _id: updatedPlayerData.club }, '_id name');
  updatedPlayerData.club = currentClub || { _id: null, name: 'Free Agent' };

  return updatedPlayerData;
}

export async function removePlayerFromPreviousClub(playerID) {
  const filter = { 'squad._id': playerID };
  await Club.findOneAndUpdate(filter, { $pull: { squad: { _id: playerID } } });
}

export default {
  getSearchedPlayer,
  getPlayers,
  deletePlayer,
  addPlayer
};
