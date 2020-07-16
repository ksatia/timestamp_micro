// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

Date.prototype.isValid = function(date) {
  return this.toString() !== "Invalid Date"
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp', (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
})

app.get('/api/timestamp/:date_string', (req, res) => {
  let passedDate = req.params.date_string

  // if we have an empty string at the endpoint
  if (passedDate.length === 0) {
    passedDate = new Date()
  }

  let digitCount = /\d{5,}/
  // this will count for 5+ digits at the start of the string
  if (digitCount.test(passedDate)) {
    // convert unix string to int
    let intDate = parseInt(passedDate)
    // validate date object
    if (new Date(intDate).isValid()) {
      return res.json({ unix: passedDate, utc: new Date(intDate).toUTCString()})
    }
    else return res.json({ error: "Invalid Date" })
  }

  else {
    let ISODate = new Date(passedDate)
    if (ISODate.isValid()) {
      return res.json({
        unix: new Date(passedDate).getTime(),
        utc: new Date(passedDate).toUTCString()
      })
    }
    else return res.json({ error: "Invalid Date" })
  }
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});