/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    'new': function(req,res) { 
      return res.view();
    },

    create: function(req,res, next){
       if(req.param('password')!=req.param('repassword')){
            console.log('err');
            req.session.flash = {
              err: 2     // MDP Error
            }
            return res.redirect('/user/new');
          }
       User.create(req.params.all(), function userCreated (err, user){
       	  if(err){
       	  	console.log(err);
            req.session.flash = {
              err: 1    // General error
             }
       	    return res.redirect('/user/new');          
          }
       	  req.session.flash = {};
          res.redirect('/user/profil/'+user.id);
       });
    },

    profil: function(req,res,next){
      User.findOne(req.param('id'),function foundUser(err,user){
        if(err) return next(err);
        if(!user) return next();
        res.view({ user: user});
      });
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};