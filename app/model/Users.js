Ext.define('todo.model.Users', {
	extend:'Ext.data.Model',

	idProperty: 'id',

	fields: [{ name: 'id', type: 'int' , default: 0},
			 { name: 'role', type:'string', default:'USER' },	
			 { name: 'filters', type: 'auto' },		
			 { name: 'username', type:'string'},
			 { name: 'email', type:'string' },
			 { name: 'password', type:'string' },
			 { name: 'created', type: 'string' },
			 { name: 'updated', type: 'string' } ],

	validators: {
		name: {type:'length', min: 4},
		email: {type:'length', min: 4}
	}			 

});