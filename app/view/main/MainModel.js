Ext.define('todo.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.main',

	data: {
		remove: { text : 'Remove', icon: 'glyphicon glyphicon-remove'},
		create: { text: 'Create', icon: 'glyphicon glyphicon-plus'},
		menu: {
			users: { text: 'Users', icon: 'glyphicon glyphicon-user' },

		}
	}

});