Ext.define('todo.view.users.UsersController', {
	extend:'Ext.app.ViewController',
	
	alias: 'controller.users',

	onCreateUser: function(el) {
		var grid = el.up('window').down('grid');
		var user = new todo.model.Users();
		grid.getStore().insert( 0, user);
	}, 
	onDeleteUser: function(el) {
		var grid = el.up('window').down('grid');
		grid.getStore().remove(grid.getSelection());
	},
	onSaveFilters:function(el) {
		var form = el.up("form");
		var store = Ext.getStore('Users');
		var user = Auth.check().user;
		var record = store.findRecord('id', user.id);
		var values = form.getValues();
		
		if(values.status && typeof values.status=='string'){
			values.status = [values.status];
		}

		record.set('filters', Ext.JSON.encode(values));
		location.reload();	
	}
});