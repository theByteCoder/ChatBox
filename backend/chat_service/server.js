const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()

const mongoose = require('mongoose');
const dbConnectionString = `mongodb://${process.env.DOMAIN}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
const dbCollection = mongoose.model('messages', { name: String, message: String })
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(process.env.EXPRESS_PORT, (err) => {
    !err ? console.log(`Listening to express on ${process.env.DOMAIN}:${process.env.EXPRESS_PORT}`) : console.log(err)
}
)

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    !err ? console.log(`Listening to mongoose on port ${process.env.DOMAIN}:${process.env.MONGO_PORT}`) : console.log(err)
}
);

io.on('connection', () => {
    console.log('a user is connected')
})

app.get('/', (req, res) => {
    res.send('{}')
}
)

app.get('/messages', (req, res) => {
    dbCollection.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    const message = new dbCollection(req.body);
    message.save((err) => {
        err && sendStatus(500);
        res.sendStatus(200);
    })
})