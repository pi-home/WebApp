var User = require('../app/models/users');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
         successRedirect : '/dashboard', // redirect to the secure profile section
         failureRedirect : '/signup', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // DASHBOARD SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/kitchen', isLoggedIn, function(req, res) {
        res.render('kitchen.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/hall', isLoggedIn, function(req, res) {
        res.render('hall.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/livingroom', isLoggedIn, function(req, res) {
        res.render('livingroom.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/bedroom', isLoggedIn, function(req, res) {
        res.render('bedroom.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.put('/api/:room_id/:device_id', function(req, res){
        var user = req.body.email;
        var location = req.params.room_id;
        var device = req.params.device_id;
        var body = req.body.property;
        var data = {};
        if(location == 'kitchen'){
          if(device == 'fan'){
            data = {'property.kitchen.fan' : body}
          }else if(device == 'lights'){
            data = {'property.kitchen.lights' : body}
          }else if(device == 'ac'){
            data = {'property.kitchen.air_conditioner' : body}
          }
        }else if(location == 'hall'){
          if(device == 'fan'){
            data = {'property.hall.fan' : body}
          }else if(device == 'lights'){
            data = {'property.hall.lights' : body}
          }else if(device == 'ac'){
            data = {'property.hall.air_conditioner' : body}
          }
        }else if(location == 'livingroom'){
          if(device == 'fan'){
            data = {'property.living_room.fan' : body}
          }else if(device == 'lights'){
            data = {'property.living_room.lights' : body}
          }else if(device == 'ac'){
            data = {'property.living_room.air_conditioner' : body}
          }
        }else if(location == 'bedroom'){
          if(device == 'fan'){
            data = {'property.bed_room.fan' : body}
          }else if(device == 'lights'){
            data = {'property.bed_room.lights' : body}
          }else if(device == 'ac'){
            data = {'property.bed_room.air_conditioner' : body}
          }
        }

        console.log(data);


        User.findOneAndUpdate({ 'local.email' : user }, {$set: data}, {new: true}, function(error, doc){
          if(error){
            console.log(error);
          }
            // console.log(doc);
            res.json(doc);
            // res.redirect('/'+location);
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
