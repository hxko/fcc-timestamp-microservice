// index.js
// where your node app starts
//////// SETUP ////////

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//////// HELPER FUNCTIONS ////////
// validate Date
const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

const parseDate = (dateParam) => {
  // If dateParam is a number, treat it as a Unix timestamp
  if (!isNaN(dateParam)) {
    return new Date(parseInt(dateParam));
  }
  // Otherwise, treat it as a date string
  return new Date(dateParam);
};

//////// ENDPOINTS ////////
// your first API endpoint... 


app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  // Parse and validate the date
  let date;
  if (!dateParam) {
    date = new Date(); // If no dateParam, use current date
  } else {
    date = parseDate(dateParam);
    if (!isValidDate(date)) {
      return res.json({ error: "Invalid Date" });
    }
  }

  // response with Unix timestamp and UTC string (always GMT time)
  res.json({
    unix: date.getTime(), // ex. 1720636325376
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
