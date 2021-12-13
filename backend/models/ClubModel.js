import mongoose from 'mongoose';
import { competitionSchema } from './CompetitionModel.js';
import { playerSchema } from './PlayerModel.js';

const clubSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide the club full name.']
  },
  activeCompetitions: [
    competitionSchema
  ],
  shortName: {
    type: String,
    required: [true, 'Please provide the club short name.']
  },
  tla: {
    type: String,
    required: [true, 'Please provide a three letter acronym (TLA).'],
    unique: [true, 'The TLA provided must be unique.'],
    uppercase: true,
    match: [
      /^[A-Za-z]{3}$/g,
      'Please provide a valid three letters acronym (no numbers or special characters allowed).'
    ]
  },
  crestUrl: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String,
    required: [true, 'Please provide an official website URL.'],
    match: [
      // eslint-disable-next-line no-useless-escape
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      'Please provide a valid website URL'
    ]
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ]
  },
  founded: {
    type: Number
  },
  clubColors: {
    type: String
  },
  venue: {
    type: String
  },
  squad: [
    playerSchema
  ],
  lastUpdated: {
    type: Date,
    default: () => {
      const date = new Date();
      return date.toISOString();
    },
    required: true
  }
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
