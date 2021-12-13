import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  area: {
    name: {
      type: String
    }
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    uppercase: true
  },
  plan: {
    type: String,
    uppercase: true
  },
  lastUpdate: {
    type: Date,
    default: () => {
      const date = new Date();
      return date.toISOString();
    },
    required: true
  }
});

const Competition = mongoose.model('Competition', competitionSchema);

export { competitionSchema, Competition };
