const express = require('express')
const app = express()
const port = 3000
// const loki = require('lokijs')
app.use(express.static('public'))

// var db = new loki('example.db');
// var timeCollection = db.addCollection('timeCollection');

// var startTime = timeCollection.insert({
// 	'id':'startTime',
// 	'unix_time_in_second':new Date().getTime() / 1000
// });
var startTime = {
	'id':'startTime',
	'duration':0,
	'unix_time_in_second':new Date().getTime() / 1000
};

// app.get('/', (req, res) => {
// 	var result = timeCollection.findOne();
// 	res.send(result.unix_time_in_second);
// });

app.get('/getTime', (req, res) => {
	res.status(200).type('json').send(startTime);
});

app.get('/getDisplay', (req, res) => {
	var currentTimestamp = new Date().getTime() / 1000;
	var timer = currentTimestamp - startTime.unix_time_in_second + startTime.duration;
	var hour, minutes, seconds;
	hour = parseInt(timer / 3600 % 24, 10);
	minutes = parseInt(timer / 60 % 60, 10);
	seconds = parseInt(timer % 60, 10);
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	res.status(200).type('json').send({'display':hour + ":" + minutes + ":" + seconds});
});

app.get('/reset', (req, res) => {
	startTime.unix_time_in_second = new Date().getTime() / 1000;
	// timeCollection.update(startTime);
	res.status(200).type('json').send(startTime);
});

app.get('/setDuration', (req, res) => {
	startTime.duration = parseInt(req.query.d);
	res.status(200).type('json').send(startTime);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))