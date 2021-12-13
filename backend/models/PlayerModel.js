import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  countryOfBirth: {
    type: String
  },
  nationality: {
    type: String
  },
  shirtNumber: {
    type: Number
  },
  role: {
    type: String,
    required: true,
    uppercase: true
  },
  club: {
    _id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  lastUpdated: {
    type: Date,
    default: () => {
      const date = new Date();
      return date.toISOString();
    },
    required: true
  }
});

const Player = mongoose.model('Player', playerSchema);

export { playerSchema, Player };
