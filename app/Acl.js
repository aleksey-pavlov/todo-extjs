Ext.define('Acl', {
        singletone:true,        
        statics: {
            is: function(access, action) {                
                var auth = Auth.check();
                var Acl = (auth && auth.user) ? auth.user.acl : {};                               
                action = action ? action : "view";
                if(Acl[access]) {
                    for(var i in Acl[access]) {
                        if(Acl[access][i]===action){                           
                            return 0;
                        }
                    }
                }
                return 1;                
            },
            
            getRoles: function() {
               return Ext.JSON.decode(Auth.ajax('roles', 'get'));    
            },                   
        }
    });
