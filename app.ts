import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ProjectRouter } from './routes/project';
import { TeammateRouter } from './routes/teammate';
import { TaskRouter } from './routes/task';
import { IndexRouter } from './routes';
import { TaskNoteRouter } from './routes/task-note';
import cors from 'cors';
import rateLimit, { Options } from 'express-rate-limit';
import helmet from 'helmet';
import winston from 'winston';
import expressWinston, { LoggerOptions, requestWhitelist } from 'express-winston';
import bodyParser from 'body-parser';
import morganBody from 'morgan-body';
import { createWriteStream } from 'node:fs';

dotenv.config();

var app = express();
/*
let loggerOptions: LoggerOptions = {
    transports: [new winston.transports.File({ filename: './log/systemlog.log', level: 'silly' })],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: 'HTTP  ',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req: Request, res: Response) {
        return false;
    },
};
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(expressWinston.logger(loggerOptions));
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(ignoreFavicon);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
let optionsOfLimiter: Partial<Options> = {
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Too many request from this IP',
};
let limiter = rateLimit(optionsOfLimiter);
app.use(limiter);

app.use(bodyParser.json());
const log = createWriteStream(path.join(__dirname, 'log', 'express.log'), { flags: 'a' });
morganBody(app, {
    noColors: true,
    stream: log,
});

/*
helmet default values for protection : 
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
*/
app.use(helmet());

process.env.DATABASE_URL = path.join(__dirname, '/public/assets/taskdb.db');

app.use('/', IndexRouter);
app.use('/project', ProjectRouter);
app.use('/teammate', TeammateRouter);
app.use('/task', TaskRouter);
app.use('/taskNote', TaskNoteRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error' });
});

function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
}

export default app;
