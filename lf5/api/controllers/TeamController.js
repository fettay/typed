/**
 * TeamController
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
      res.locals.flash = _.clone(req.session.flash);
      res.locals.authenticated = _.clone(req.session.authenticated);
      res.view({
      	title : "Créer une équipe"
      });
      req.session.flash = {};
    }
    else{
      res.redirect('session/new');
    }
  },

  create: function(req,res, next){
    if(req.session.authenticated){ 
     if(req.session.user.isCap){
      req.session.flash = {
              err: 1,    // Already cap
              message: "Vous êtes déjà capitaine d'équipe."
            }
            return res.redirect('/team/new');
      }
          Team.create(req.params.all(), function teamCreated(err, team){
            if(err){
             console.log(err);
             req.session.flash = {
              err: 1,    // General error probably name
              message: "Ce nom d'équipe est déjà pris."
            }
            return res.redirect('/team/new');          
          }
          req.session.flash = {};
          // Make creator captain, player and admin of the team
          console.log(team.setPlayer(req.session.user));
          team.setAdmin(req.session.user);
          req.session.user.teams.push(team.name);
          req.session.user.isCap= true;
          console.log(team);
          console.log(req.session.user);
          res.redirect('/team/profil/'+team.name);
        });
        }
        else{
          res.redirect('session/new');
        }
      },


      profil: function(req, res, next){
        Team.findOneByName(req.param('name'),function teamFinded(err, team) {
           if(err) return next(err);
           if(!team) return err;
           if(req.session.authenticated && (_.contains(team.admin,req.session.user)|| _.isEmpty(team.admin))){
            res.view({
              team: team,
              user: req.session.user
            });
           }
           else {
            res.redirect('/team/view/'+team.name);
           }
        });
      },

      

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TeamController)
   */
   _config: {}


 };
