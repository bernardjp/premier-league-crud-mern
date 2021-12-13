import { StatusCodes } from 'http-status-codes';
import Club from '../models/ClubModel.js';
import { Competition } from '../models/CompetitionModel.js';
import ApiError from '../errors/ApiError.js';

const getCompetitions = async (req, res, next) => {
  try {
    const competitionList = await Competition.find(null, '', { sort: { name: 1 } }).orFail();
    res.status(StatusCodes.OK).json(competitionList);
  } catch (err) {
    console.log('ERROR --->', err);
    next(ApiError.notFound('Resource not found: The specified resource does not exist.'));
  }
};

const getCompetitionDetails = async (req, res, next) => {
  try {
    const competitionID = req.params.id;
    const competition = await Competition.findOne({ _id: competitionID }).orFail();
    const clubList = await Club.find({ 'activeCompetitions._id': competitionID }, '_id name tla venue', { sort: { tla: 1 } }).orFail();

    res.status(StatusCodes.OK).json({ competition, clubList });
  } catch (err) {
    console.log('ERROR: ------>', err);
    next(ApiError.notFound('Resource not found: No club found active in this competition.'));
  }
};

export default {
  getCompetitions,
  getCompetitionDetails
};
