Ext.define('todo.model.Tasks', { 
    extend: 'Ext.data.Model', 
    
    idProperty: 'id',

    fields: [ {name: 'id', type: 'int' },
    		      {name: 'project_id', type:'int'},
     		      {name: 'user_id', type:'int'},
              {name: 'name',  type: 'string'},
              {name: 'description', type:'string'},
              {name: 'created', type:'string'},
              {name: 'updated', type:'string'},
              {name: 'labor', type: 'float'},
              {name: 'status', type: 'string'},
              {name: 'priority', type: 'string'},
              {name: 'username', type:'int'} ],

    validators: {
        name: { type:'length', min: 4 }
    } 
});