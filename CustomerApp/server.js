// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");
// var hbs = exphbs.create({
//   defaultLayout: "main",
//   helpers: {
//       match: function(arg1, arg2) {
//           if (arg1 === arg2){
//             return true;
//           } else
//           {
//             return false;
//             }
//           }
//       }
// });

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");
// app.use(routes);

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
