/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	name:{
  		type:'string',
  		required: true
  	},

    toString: function(){
        return (this.firstname + ' ' + this.name) ;
    },

    firstname:{
    	type:'string',
    	required: true
    },

    email:{
    	type:'string',
    	required: true,
    	unique: true,
    	email: true
    },

    password:{
    	type:'string',
    	required: true
    },

    city:{
        type:'string',
    	required: true
    },

    dept:{
    	type: 'string',
    	required: true,
    	minLength: 2
    },

    getCap: function(){
        _.each(this.teams, function(team){
            if(team.captain.id==this.id){  // Captain of 1 team maximum
                return team;
            }
        });
        return -1;
    },

    isCap:{
         type : 'boolean',
         defaultsTo : false
    },


    teams:{
    	type: 'array',
        defaultsTo : []
    },

    getTeams: function(){
    var teamsList =[];
    _.each(teams, function(teamName){
        Team.find(teamName, function foundUser(err, user){
          if(err) return "ERROR"
          if(!user) return "No captain"
          teamsList.push(user);
          });
        });
      return teamsList;
    },         

    poste:{
    	type: 'integer',
        defaultsTo: 0
    },
    // Each figure in the integer poste represents the poste in a team.
    // This figure has the same position in the integer that the team it represents in the array Teams.

    getPoste: function(team){
        var k= this.teams.length - this.teams.indexOf(team);
        if (k==-1){
            return "Erreur";
        }
        switch(this.poste%10^k){

            case 1:
            return "G"; 
            break;

            case 2:
            return "D";
            break;

            case 3:
            return "M"; 
            break;

            case 4:
            return "A";
            break;

            case 0:
            return "Undefined";
            break;
        }

    
    },

    setPoste: function(post,team){
    var k= this.teams.indexOf(team);
    if (k==-1){
            return "Erreur";
        }
    
    this.poste= this.poste - (this.poste%10^k + post)*10^k;

    },

    goals:{
    	type: 'integer',
    	defaultsTo: 0
    },

    playedGames:{
        type: 'integer',
        defaultsTo: 0
    },

    getPlayedGames: function(){
       if(this.playedGames){
       var pg = this.playedGames;
       return (pg+'');
       }
       else{
        return '0';
       }
    }, 

    pic:{
        type: 'string'
    },

    messages:{
        type: 'array',
        defaultsTo: ""
    },


    toJSON: function(){
        var obj= this.toObject();
        delete obj.password;
        delete obj.repassword;
        return obj;
    }
}
};