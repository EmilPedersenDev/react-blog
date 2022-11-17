import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (err: any) => {
  console.log(err);
  process.exit(1);
});

import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http';
import helmet from 'helmet';
const path = require("path");
const cookieParser = require("cookie-parser");
const xss = require('xss-clean')
const logger = require('morgan');
const Port = process.env.PORT || '3001';
import AppError from './utils/app-error';
import indexRouter from './routes/index';
import articlesRouter from './routes/articles';
import errorController from './controllers/error-controller';
const app: Express = express();
app.set('port', Port);

app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(xss())
app.use('/api/v1/index', indexRouter);
app.use('/api/v1/articles', articlesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

const server = http.createServer(app).listen(Port, () => {
  console.log('Booted on ' + Port);
});

process.on('unhandledRejection', (err: any) => {
  console.log(err?.name, err?.message);
  server.close(() => {
    process.exit(1);
  });
});
