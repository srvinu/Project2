var db = require("../models");
var express = require("express");
var helpers = require('handlebars-helpers')();
var path = require("path")
var nodemailer = require('nodemailer');
var router = express.Router();
// console.log(db);

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/order", function(req, res) {
    db.Order.findAll({}).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.get("/api/myorder", function(req, res) {
    db.Order.findAll({
      where:{
        order_status: 1,
        order_name: {
          $ne: null
        },
        catogery: {
          $ne: null
        }
      }
    }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });


  app.get("/", function(req, res) {
    db.Order.findAll({}).then(function(data) {
      // console.log(data[0].unique_title)
      res.render('index', {data})
    });
  });

  app.put('/api/orderCompleted', function(req, res){
    // console.log(req)
    var emailID = req.body.email
    // db.Order.update({
    //   {order_status: 0}
    //   where: { username: req.body.email }
    // })
    db.Order.update(
      { order_status: 0 },
      { where: { username: req.body.email } }
    )
    .then(function(dbMenu) {
      sendMail(emailID)
      res.json(dbMenu);
    });
  })

function sendMail(toemail){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ecafeteria.rut.do.not.reply@gmail.com',
      pass: 'srvinod111'
    }
  });

  var mailOptions = {
    from: 'ecafeteria.rut.do.not.reply@gmail.com',
    to: toemail,
    subject: 'Your Order is Ready to Pickup.',
    html: '<h1>Your order is ready to pickup. <br></h1><h3><br>Thanks,<br>eCafeteria.<h3><p>Please Submit your Feedback <a href="http://localhost:8080/feedback/'+toemail+'">Click Here!</a>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


};
