Ext.define('todo.view.projects.ProjectsController', {
	extend:'Ext.app.ViewController',
	alias: 'controller.projects',	
	
	onCreateProject: function(dom){
			var grid = dom.up('window').down('grid');
			grid.getStore().insert(0, new todo.model.Projects());
	}, 

	onDeleteProject: function(dom) {
		 var grid = dom.up('window').down('grid');
		 grid.getStore().remove(grid.getSelection());
	}
		
});