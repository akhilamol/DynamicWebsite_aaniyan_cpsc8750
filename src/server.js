// use the express library
const express = require('express');
const cookieParser = require('cookie-parser');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

let nextVisitorId = 1;
let visitor_num;

// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(cookieParser());
// The main page of our website


app.get('/', (req, res) => {
  
  let last_visited;
  
  res.cookie('visited', Date.now().toString());

  // find visitorId
  if (req.cookies.visitorId == undefined)
  {
    visitor_num = nextVisitorId++;
    res.cookie('visitorId', visitor_num);
    last_visited = "You have never visited" ;
  }
  else{

    visitor_num = req.cookies.visitorId;
    last_visited = "It has been " + (Date.now().toString() - req.cookies.visited)/1000 + " seconds since your last visit";

  }

  
  // assign variables to display with welcome.ejs
  res.render('welcome', {
    name: req.query.name || "World",
    date_time: new Date().toLocaleString(),
    visitor : visitor_num,
    last_visit : last_visited,
    
  });
  console.log(req.headers.cookie);
});


// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");

