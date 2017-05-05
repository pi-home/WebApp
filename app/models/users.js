// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    property         : {
        kitchen      : {
          "lights":  String,
          "air_conditioner":   String,
          "fan":     String
        },
        hall      : {
          "lights":  String,
          "air_conditioner":   String,
          "fan":     String
        },
        living_room      : {
          "lights":  String,
          "air_conditioner":   String,
          "fan":     String
        },
        bed_room      : {
          "lights":  String,
          "air_conditioner":   String,
          "fan":     String
        },
        garage      : {
          "lights":  String,
          "air_conditioner":   String,
          "fan":     String
        }
    },
    preferences : [{}]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
