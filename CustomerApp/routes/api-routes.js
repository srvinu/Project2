var db = require("../models");
var express = require("express");
var helpers = require('handlebars-helpers')();
var path = require("path")
var router = express.Router();
// console.log(db);

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/menu", function(req, res) {
    // console.log(db);
    // findAll returns all entries for a table when used with no options
    db.Ocms.findAll({}).then(function(dbMenu) {
      // console.table(dbMenu)
      res.json(dbMenu);
    });
  });

  app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, '../public/assets/login.html'))
  });
  app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname, '../public/assets/register.html'))
  });
  app.get("/order", function(req, res) {
    db.Ocms.findAll({}).then(function(data) {
      console.log(data[0].unique_title)
      res.render('index', {data})
    });
  });
  app.post("/api/posts", function(req, res) {
    console.log("api-posts"+JSON.stringify(req.body));
    db.Order.create({
        username: req.body.username,
        order_name: req.body.order_name,
        order_unique: req.body.order_unique,
        order_price: req.body.order_price,
        order_status: req.body.order_status,
        catogery: req.body.order_category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/myorderhistory", function(req, res) {
    // console.log(db);
    // findAll returns all entries for a table when used with no options
    db.Order.findAll({}).then(function(dbMenu) {
      // console.table(dbMenu)
      res.json(dbMenu);
    });
  });

  app.get("/thankyou", function(req, res) {
    res.render('thankyou')
  });

  app.get("/api/feedback/:user", function(req, res) {
    // console.log(req.params.user)
    db.Order.findAll({
      // where: {[{username: {[Op.eq]: req.params.user}}, {survey: {[Op.eq]: 0}}]},
      where: {username: req.params.user } && {survey: 0},
      attributes: [['order_name', 'order_name'], ['order_unique', 'order_unique']],
    }).then(function(dbMenu) {
      // console.table(dbMenu)
      res.json(dbMenu);
    });
  });


  app.get("/feedback/:user", function(req, res) {
    db.Order.findAll({
      where: {username: req.params.user } && {survey: 0},
      attributes: [['order_name', 'order_name'], ['order_unique', 'order_unique']],
    }).then(function(data) {
      // console.table(data)
      res.render('feedback', {data})
    });
  });

  app.post("/api/submitFeedback", function(req, res){
    // console.log("GOT----"+req.body.email)
    db.Order.update(
      { rating: req.body.rate,
        survey: 1
      },
      { where: { username: req.body.email } && {order_unique: req.body.uni_value} },
    )
    .then(function(dbMenu) {
      res.json(dbMenu);
    });
  })


};
