 Ext.define('Auth', {
        singletone:true,
        statics: {
            data: null,
            ajax: function(cb, method, params) {
                if(!params) { params = {}; }
                return Ext.Ajax.request({method: method, 
                                        url:'api/users?callback='+cb, 
                                        params: params,
                                        async: false }).responseText;
            },

            check: function() {
                  this.data = Ext.JSON.decode(this.ajax('check', 'get'));
                  return  this.data;
            },

            auth: function(params){
                 this.ajax('auth', 'post', params);          
                 return this.check(); 
            },

            destroy : function() {
                var r = Ext.JSON.decode(this.ajax('destroy', 'get'));
                return r.success;
            }  
        }
    });