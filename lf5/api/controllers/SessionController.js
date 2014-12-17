/**
 * SessionController
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
 		if(req.session.authenticated){
 			res.redirect('user/profil/'+req.session.user.id);
 		}
 		res.locals.flash = _.clone(req.session.flash);
    res.locals.authenticated = _.clone(req.session.authenticated);
 		res.view('session/new');
 		req.session.flash={};
 	},

 	create: function(req, res, next) {
 		if( !req.param('email') || !req.param('password')){
 			req.session.flash = {
 				err: 1,
 				message: "Veuillez renseigner tous les champs"
 			}
 			res.redirect('session/new');
 			return;
 		}

 		User.findOneByEmail(req.param('email'),function(err,user){
 			if(err) return next(err);
 			if(!user) {
 				req.session.flash = {
 					err:1,
 					message: "L'email ne correspond pas à un utilisateur existant"
 				}
 				return res.redirect('session/new');
 			}
 			if(user.password!=req.param('password')){
 				req.session.flash = {
 					err:1,
 					message: "Mauvais mot de passe"
 				}
 				res.redirect('session/new');
 			} 
            if(user.password==req.param('password')){
                req.session.authenticated = true;
                req.session.user = _.clone(user);
            	  res.redirect('user/profil/'+user.id);
            }
 		});
 	},

  logout: function(req, res, next){
      if(req.session.authenticated){
        req.session.authenticated = false;
        req.session.user = false;
        res.redirect('/');
      }
      else{
        res.redirect('session/new');
      }
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
   _config: {}


};
