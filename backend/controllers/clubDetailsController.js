/* eslint-disable no-await-in-loop */
import { StatusCodes } from 'http-status-codes';
import Club from '../models/ClubModel.js';
import { Competition } from '../models/CompetitionModel.js';
import ApiError from '../errors/ApiError.js';

const getClubDetails = async (req, res, next) => {
  const clubID = req.params.id;

  try {
    const club = await Club.findOne({ _id: clubID }).orFail();
    res.status(StatusCodes.OK).json(club);
  } catch (err) {
    next(ApiError.notFound('Resource not found. The specified resource does not exist.'));
  }
};

const updateClubDetails = async (req, res, next) => {
  const clubID = parseInt(req.params.id);
  const { activeCompetitions, _id, ...clubData } = req.body;

  try {
    await Club.findOneAndUpdate(
      { _id: clubID },
      clubData,
      { new: true, runValidators: true }
    ).orFail();

    const updatedClub = await updateCompetitionList(activeCompetitions, clubID);
    res.status(StatusCodes.OK).json({ message: 'Club updated', club: updatedClub });
  } catch (err) {
    next(ApiError.notFound('Resource not found. The specified resource does not exist.'));
  }
};

async function updateCompetitionList(activeCompetition, clubID) {
  try {
    // devuelve el listado de competencias
    const competitionList = await getInternationalCompetitions();
    let updatedClub;

    // eslint-disable-next-line no-restricted-syntax
    for (const competition of competitionList) {
      if (competition.name === activeCompetition) {
        const competitionData = await getCompetitionByName(activeCompetition);
        updatedClub = await addCompetitionToClub(clubID, competitionData);
      }

      if (competition.name !== activeCompetition) {
        updatedClub = await removeCompetitionFromClub(clubID, competition._id);
      }
    }
    return updatedClub;
  } catch (error) {
    console.log('updateCompetitionList:', error);
  }
}

async function getInternationalCompetitions() {
  const competitionList = await Competition.find(
    { area: { name: 'Europe' } },
    'name _id',
    { sort: { name: 1 } }
  ).orFail();

  return competitionList;
}

async function getCompetitionByName(competitionName) {
  const competition = await Competition.find(
    { name: competitionName },
    '',
    { sort: { name: 1 } }
  ).orFail();

  return competition;
}

async function removeCompetitionFromClub(clubID, competitionID) {
  try {
    const competition = await Club.findOneAndUpdate(
      { _id: clubID },
      { $pull: { activeCompetitions: { _id: competitionID } } },
      { runValidators: true, new: true }
    );
    return competition;
  } catch (error) {
    console.log(error);
  }
}

async function addCompetitionToClub(clubID, competitionData) {
  const competition = await Club.findOneAndUpdate(
    { _id: clubID },
    { $addToSet: { activeCompetitions: competitionData } },
    { runValidators: true, new: true }
  ).orFail();

  return competition;
}

export default {
  getClubDetails,
  updateClubDetails
};
