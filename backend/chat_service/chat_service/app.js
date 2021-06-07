'use strict';
const debug = require('debug')('chatbox');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();
dotenv.config();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.EXPRESS_PORT || 3000);

io.on('connection', () => {
    console.log('a user is connected')
})

const server = app.listen(app.get('port'), () => {
    console.log(`Express server listening on ${process.env.DOMAIN}:${process.env.EXPRESS_PORT}`)
    debug('Express server listening on port ' + server.address().port);
});