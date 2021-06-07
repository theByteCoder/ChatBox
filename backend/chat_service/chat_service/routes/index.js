'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnectionString = `mongodb://${process.env.DOMAIN}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    !err ? console.log(`Mongoose server listening on ${process.env.DOMAIN}:${process.env.MONGO_PORT}`) : console.log(err)
}
);

const collectionMessages = mongoose.model('messages', { name: String, message: String })

router.get('/messages', (req, res) => {
    collectionMessages.find({}, (err, messages) => {
        res.send(messages);
    })
})

router.post('/messages', (req, res) => {
    const message = new collectionMessages(req.body);
    message.save((err) => {
        err && sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports = router;