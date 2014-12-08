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

    capOf:{
    	collection: 'Team',
        defaultsTo:""
    },

    teams:{
    	collection: 'Team',
        defaultsTo:""
    },

    poste:{
    	type: 'string',
    	enum:['G','D','M','A']
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
       return pg.toString();
       }
       else{
        return '0';
       }
    }, 

    pic:{
        type: 'string'
    },


    toJSON: function(){
        var obj= this.toObject();
        delete obj.password;
        delete obj.repassword;
        return obj;
    }
}


    

};
