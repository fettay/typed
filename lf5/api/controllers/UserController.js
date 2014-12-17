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
      res.locals.flash = _.clone(req.session.flash);
      return res.view();
      req.session.flash = {};
    },

    create: function(req,res, next){
       if(req.param('password')!=req.param('repassword')){
            console.log('err');
            req.session.flash = {
              err: 1,     // MDP Error
              message: "Les mots de passes ne sont pas identiques."
            }
            return res.redirect('/user/new');
          }
       User.create(req.params.all(), function userCreated(err, user){
       	  if(err){
            req.session.flash = {
              err: 1,   // General error
              message: "Veuillez vérifier que tous les champs ont bien été remplis et que l'email n'ait pas déjà été utilisé."
             }
       	    return res.redirect('/user/new');          
          }
       	  req.session.flash = {};
          req.session.authenticated = true;
          req.session.user = _.clone(user);
          res.redirect('/user/profil/'+user.id);
       });
    },

    profil: function(req,res,next){
      User.findOne(req.param('id'),function foundUser(err,user){
        if(err) return next(err);
        if(!user) return next();
        if(req.session.authenticated && req.session.user.id == user.id){
        res.locals.authenticated = _.clone(req.session.authenticated);
        res.view({ user: user});
        }
        else{ 
          res.redirect('session/new');
        }
      });
    },

    index: function(req,res,next){
    if(req.param('admin') && req.param('password')){
      req.session.admin = req.param('admin');
      req.session.password = req.param('password');
      res.redirect('/user/admin');
    }
    else{
      res.view();
    }
  },

  admin: function(req,res,next){
    User.find(function foundUsers (err,users){
      if(err){
      return next(err);
      }
      if(req.session.admin=='lf5'&&req.session.password=='fettaya'){
      res.view({
        users: users
      });
    }
    else{
      res.redirect('/user');
    }
    });
  },  
  
  delete: function(req,res,next){
    User.findOne(req.param('id'),function userFinded(err,user){
      if(err) return next(err);
      if(!user) return next('Utilisateur inexistant');

      User.destroy(req.param('id'),function userFinded(err){
      if(err) return next(err);
      });
      res.redirect('/user/admin');
   });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
