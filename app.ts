import express from 'express';
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

dotenv.config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

process.env.DATABASE_URL = path.join(__dirname, '/public/assets/taskdb.db');

app.use(ignoreFavicon);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', IndexRouter);
app.use('/project', ProjectRouter);
app.use('/teammate', TeammateRouter);
app.use('/task', TaskRouter);
app.use('/taskNote', TaskNoteRouter);

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function ignoreFavicon(req: any, res: any, next: any) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
}

export default app;
function cors(): any {
    throw new Error('Function not implemented.');
}
