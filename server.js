// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

Date.prototype.isValid = function() {
  // if Date is NaN, the below will return false (NaN will never equal NaN)
  return this.getTime() === this.getTime()
}

/*
Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with 
ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } 
e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }.
*/

app.get('/api/timestamp/:date_string', (req, res) => {
  let passedDate = new Date(req.params.date_string)
  if (!passedDate.isValid()) {
    res.send("Please use a valid date string in the following format: YYYY-MM-DD")
  }
  // take date and return the proper format
  res.json({"unix":passedDate.getTime(), "utc":passedDate.toUTCString()})
})



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});