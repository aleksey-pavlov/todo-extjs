Ext.define('todo.view.projects.Projects', {
	extend:'Ext.window.Window',
	
	requires: [ 'todo.view.projects.ProjectsController',
				'todo.view.main.MainModel', ],

	width:500,
	height:300,	
	overflowY:'auto',
	title:'Projects',
	controller: 'projects',
	viewModel: {
		type:'main'
	},
	autoShow:true,
	items:[{
		xtype:'grid',
		selType: 'cellmodel',		
		id:'projectsGrid',
		plugins: { ptype: 'cellediting',
				   pluginId:'cellplugin', 
                   clicksToEdit: 2 },
		
		columns:[{text:'Name',dataIndex:'name', editor:'textfield'},
				 {text:'Description', dataIndex:'description', editor:'textfield'}],

		store:'Projects',		

	}],
	
	tbar:[{
			xtype:'button',
			bind:{ 
				text: '{create.text}',
				iconCls: '{create.icon}' 
			},	
			handler: 'onCreateProject'
		},{
			xtype:'button',
			bind:{ 
				text: '{remove.text}',
				iconCls: '{remove.icon}' 
			},	
			handler: 'onDeleteProject'
		}],

});