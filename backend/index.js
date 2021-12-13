import express from 'express';
import dotenv from 'dotenv';

import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './db/config.js';

import ApiError from './errors/ApiError.js';
import errorHandler from './errors/errorHandler.js';

import clubRoutes from './routes/clubRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';

dotenv.config();

const app = express();

// Set Public directory.
app.use(express.static('public'));

// CORS configuration
// const domainWhitelist = [process.env.FRONTEND_URL]; // change to domain URL
// const corsOptions = { origin: domainWhitelist }; // Probar si funciona
// const corsOptions = {
//   origin: (origin, callback) => {
//     const isWhitelisted = domainWhitelist.some(domain => domain === origin);
//     if (isWhitelisted) {
//       callback(null, true);
//     } else {
//       callback(new Error('ERROR: access restricted by CORS'));
//     }
//   }
// };
// app.use(cors(corsOptions));

app.use(rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'You have reached the request limit. Try again later.'
}));
app.use(helmet());
app.use(cors());
app.use(xss());

// Logger
app.use(morgan('dev'));

// Body-parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/resources/clubs', clubRoutes);
app.use('/resources/players', playerRoutes);
app.use('/resources/competitions', competitionRoutes);

// Error handling
app.use((req, res, next) => next(ApiError.notFound('Page Not Found')));
app.use(errorHandler);

// Server and DB connection
const PORT = process.env.PORT || 4000;
const startServer = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
