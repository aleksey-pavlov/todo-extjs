Ext.define('todo.model.Projects', {
	extend: 'Ext.data.Model',

	idProperty:'id',

	fields: [ {name:'id', type:'int' },
			  {name:'name', type:'string'},
			  {name:'description', type:'string'} ],

	validators: {
		name: { type:'length', min: 4 },
	}

});