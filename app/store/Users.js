Ext.define('todo.store.Users', {
	extend:'Ext.data.Store',
	model:'todo.model.Users',
	autoSync: true,
	autoLoad: true, 	
	proxy: {
		type:'rest',
		url:'api/users',
		reader: {
			type: 'json',
			rootProperty:"users"
		}, 
		writer: {
			type: 'json',
			rootProperty:''
		} 
	}
});