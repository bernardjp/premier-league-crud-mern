import mongoose from 'mongoose';

const connectDB = url => mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  // set to "true" to avoid --> (node:78072)
  // DeprecationWarning: collection.ensureIndex is deprecated.
  // Use createIndexes instead.
});

export default connectDB;
