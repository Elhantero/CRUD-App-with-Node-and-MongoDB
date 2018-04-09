//grab our dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


//configure our application =============================
//tell express where to look for static assets
app.use(express.static(__dirname + '/public'))

//set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connect to our database
mongoose.connect('mongodb://footbaldb:passworddb@ds153778.mlab.com:53778/football');


//set the routes=========================================
app.use( require('./app/routes'));

//start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});