//NPM Packages
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Create Express Server
var app = express();
var router = express.Router();

app.use(express.static(__dirname + "/public"));
app.use(router);

// Set Port
var PORT = process.env.PORT || 3000;

// Require routes
require("./config/routes.js")(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Check database connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Insert code from Body-Parser npm page 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// Insert code for handlebars
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Listen to Port being used, confirm working server
app.listen(PORT, function(){
    console.log("Listening on port:" + PORT);
});