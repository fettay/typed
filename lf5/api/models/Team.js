/**
 * Team
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	name:{
  		type:'string',
  		required: true,
  		unique: true,
      primaryKey: true
  	},

  	toString: function(){
  		return this.name;
  	},

  	pic:{
  		type:'string'
  	},

  	players:{
  		collection: 'User',
      via: 'users'
  	},

    games:{           //Contains vs names
      type: 'array'
    },

    goalFor:{
      type: 'array'
    },
   
    goalVs:{
      type: 'array'
    },

  	admins:{
  	   type: 'array', // Contains ids of admins Captain is the first in the list
       defaultsTo: []
  	},

    players:{
      type: 'array',  // Contains ids of players
      defaultsTo: []
    },

    adminsName:{
       type: 'array', // Contains ids of admins Captain is the first in the list
       defaultsTo: []
    },

    playersName:{
      type: 'array',  // Contains ids of players
      defaultsTo: []
    },


   // TODO SET CAPTAIN

    setPlayer: function(player){
      if (!_.contains(this.players, player.id)){
        this.players.push(player.id);
        this.playersName.push(player.firstname + ' ' + player.name);   // toString() doesn't work well 
          return true;
      }
      return false;
    }, // TO DO TRY FIND PLAYER'S NAME BY ID

    setAdmin: function(admin){
      if (!_.contains(this.admins, admin.id)){
        this.admins.push(admin.id);
        this.adminsName.push(admin.firstname + ' ' + admin.name);
          return true;
      }
      return false;
    },
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
