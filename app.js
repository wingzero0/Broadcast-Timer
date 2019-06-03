const express = require('express')
const app = express()
const port = 3000
// const loki = require('lokijs')
app.use(express.static('public'))
app.use(express.static('files'))

// var db = new loki('example.db');
// var timeCollection = db.addCollection('timeCollection');

// var startTime = timeCollection.insert({
// 	'id':'startTime',
// 	'unix_time_in_second':new Date().getTime() / 1000
// });
var startTime = {
	'id':'startTime',
	'unix_time_in_second':new Date().getTime() / 1000
};

// app.get('/', (req, res) => {
// 	var result = timeCollection.findOne();
// 	res.send(result.unix_time_in_second);
// });

app.get('/getTime', (req, res) => {
	res.status(200).type('json').send(startTime);
});

app.get('/reset', (req, res) => {
	startTime.unix_time_in_second = new Date().getTime() / 1000;
	// timeCollection.update(startTime);
	res.status(200).type('json').send(startTime);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))