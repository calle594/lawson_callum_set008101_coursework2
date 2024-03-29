var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


//Schema to store user registration details
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: 'Email address is required',
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
      
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 32
  }
});


UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Username/Email already exists'));
  } else {
    next(error);
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;

