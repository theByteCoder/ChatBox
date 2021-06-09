'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cryptographer = require('../cryptographer');
const { log } = require('debug');

dotenv.config();

let key = cryptographer.getRandomKey();

const dbConnectionString = `mongodb://${process.env.DOMAIN}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    !err ? console.log(`Mongoose server listening on ${process.env.DOMAIN}:${process.env.MONGO_PORT}`) : console.log(err)
}
);

const collectionMessages = mongoose.model('messages', { name: String, message: Object, key: Object })

router.get('/messages/:name', (req, res) => {
    collectionMessages.find({ name: req.params.name }, (err, messages) => {
        let decryptOut = cryptographer.decrypt(messages[0].message.buffer, messages[0].key.buffer);
        const payload = { name: req.params.name, message: decryptOut.toString('utf8') }
        res.send(payload);
    })
})

router.post('/messages', (req, res) => {
    console.log(cryptographer.encrypt(req.body.message, key))
    const payload = { ...req.body, message: cryptographer.encrypt(req.body.message, key), key: key }
    const message = new collectionMessages(payload);
    message.save((err) => {
        err && res.sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports = router;