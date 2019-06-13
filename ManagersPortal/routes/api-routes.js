var db = require("../models");
var express = require("express");
var helpers = require('handlebars-helpers')();
var path = require("path")
var nodemailer = require('nodemailer');
var router = express.Router();
var sequelize = require("sequelize")
// console.log(db);

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/OCMS", function(req, res) {
    db.Ocms.findAll({
      attributes: [['menu_title', 'menu_title'],['unique_title', 'unique_title'],['catogery', 'catogery']],
    }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });
  app.get("/api/dashCount", function(req, res) {
    db.Order.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('order_id')), 'order_id'],['order_name', 'order_name']],
      group: ['order_name'],
      }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.get("/", function(req, res) {
    db.Ocms.findAll({
      attributes: [['menu_title', 'menu_title'],['unique_title', 'unique_title'],['catogery', 'catogery']],
    }).then(function(dbMenu) {
      res.render('index', {dbMenu})
    });
  });
  app.post("/api/menuPost", function(req, res) {
    console.log("api-posts"+JSON.stringify(req.body));
    db.Ocms.create({
        menu_title: req.body.menu_title,
        unique_title: req.body.unique_title,
        menu_des: req.body.menu_des,
        menu_text: req.body.menu_text,
        catogery: req.body.category,
        price: req.body.price,
        img_loc: req.body.img_loc
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
  app.get("/api/feedback", function(req, res) {
    db.Order.findAll({
      where: {survey: 1},
      attributes: [['order_name', 'order_name'], ['username', 'username'], ['rating', 'rating']],
    }).then(function(data) {
      // console.table(data)
      res.json(data);
    });
  });


};
