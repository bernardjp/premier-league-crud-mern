import { unlinkSync } from 'fs';
import { StatusCodes } from 'http-status-codes';
import Club from '../models/ClubModel.js';
import { Competition } from '../models/CompetitionModel.js';
import ApiError from '../errors/ApiError.js';

const getClubsByName = async (req, res, next) => {
  if (!req.query.name) return next();

  try {
    const regex = new RegExp(`${req.query.name}`, 'gi');
    const clubList = await Club.find({ name: { $regex: regex } }, '_id name tla venue crestUrl', { sort: { tla: 1 } }).orFail();

    res.status(StatusCodes.OK).json(clubList);
  } catch (err) {
    next(ApiError.notFound('Resource not found: The specified resource does not exist.'));
  }
};

const getClubsByCompetition = async (req, res, next) => {
  if (!req.query.competition) return next();

  try {
    const competitionID = parseInt(req.query.competition);
    const clubList = await Club.find({ 'activeCompetitions._id': competitionID }, '_id name tla venue crestUrl', { sort: { tla: 1 } }).orFail();

    res.status(StatusCodes.OK).json(clubList);
  } catch (err) {
    next(ApiError.notFound('Resource not found: No club found active in this competition.'));
  }
};

const getClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find(null, '_id name tla venue crestUrl', { sort: { name: 1 } }).orFail();
    res.status(StatusCodes.OK).json(clubs);
  } catch (err) {
    next(ApiError.notFound('Resource not found: The specified club list do not exist or could not be found.'));
  }
};

const deleteClub = async (req, res, next) => {
  const clubID = req.body._id;

  try {
    const clubToDelete = await Club.findOne({ _id: clubID });

    Club.deleteOne({ _id: clubID })
      .then(() => {
        if (clubToDelete.crestUrl.length > 0) {
          const crestImagePath = `${process.env.PUBLIC_CREST_IMAGES_PATH}/${clubToDelete.crestUrl}`;
          unlinkSync(crestImagePath);
        }
        res.send({ message: `Club ${clubToDelete.name} successfuly removed` });
      });
  } catch (err) {
    next(ApiError.internalError('Server internal error: The specified resource could not be deleted. Try again later.'));
  }
};

const addClub = async (req, res, next) => {
  const newClubData = req.body;

  try {
    const competitionList = await getCompetitionList(newClubData.activeCompetitions);
    newClubData.activeCompetitions = competitionList;

    const newClub = new Club(newClubData);
    await newClub.save();

    res.status(StatusCodes.CREATED).send({ message: 'Club successfuly created', club: newClubData });
  } catch (err) {
    console.log(err);
    next(ApiError.internalError('Server internal error: The specified resource could not be created. Try again later.'));
  }
};

async function getCompetitionList(activeCompetition) {
  try {
    const localCompetitionList = await Competition.find({ area: { name: 'England' } }, '', { sort: { name: 1 } }).orFail();
    const [internationalCompetition] = await Competition.find({ name: activeCompetition }, '', { sort: { name: 1 } });

    return [...localCompetitionList, internationalCompetition].filter(Boolean);
  } catch (error) {
    console.log(error);
  }
}

export default {
  getClubs,
  getClubsByName,
  getClubsByCompetition,
  deleteClub,
  addClub
};
