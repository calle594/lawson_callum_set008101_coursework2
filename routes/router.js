var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ejs = require('ejs');
var Email = require("../models/Email"); //Export schema
var nodemailer = require('nodemailer'); // Send email
var bodyParser = require('body-parser');
// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  } 


  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      } 
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
           return res.render('profile.ejs', {"name":user.username,"email":user.email});
        }
      }
    });
});

// GET for logout 
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//SEND EMAIL
router.get('/mail', (req, res) => {
  res.render('mailer.html');
});

router.post('/send', (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var newEmail = {name:name,email:email,message:message};

    Email.create(newEmail,function(err,newCreatedEmail){
        if(err){
            console.log(err);
        }
        else{
            console.log(newCreatedEmail);
        }
    })   
    
const output = `
    <p>You have a new contact request</p>
    <li>Name: ${req.body.name}</li>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // OUTLOOK/HOTMAIL, can be replaced with other hosts.
    port: 587,
    secure: false, 
    auth: {
        user: 'YOUREMAIL', // Test User - fill with your details
        pass: 'YOURPASSWORD'  // Test Password - fill with your details
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <call232e590@hotmail.com>', // sender address
      to: 'TESTEMAIL', // define who to send the email too
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('mailer.html', {msg:'Email has been sent'});
  });
  });

//CIPHER PAGE ROUTE
    router.get('/ciphers', function (req, res, next) {
	return res.render('ciphers.html');
});

module.exports = router;