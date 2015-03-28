Ext.define('todo.view.users.Users', {
	extend:'Ext.window.Window',

	requires: [ 'todo.view.users.UsersController',
				'todo.view.main.MainModel' ],
	controller: 'users',
	viewModel: {
		type:'main'
	},
	autoShow: true,
	title:'Users',
	width:600,
	height:300,	
	overflowY:'auto',
	
	items:[{
		xtype:'grid',
		id:'usersGrid',
		columns: [{text:'Username', dataIndex:'username', editor:'textfield'},
				  {	text: 'Role', 
				  	dataIndex: 'role', 
				 	editor: {
				  		xtype:'combobox',
				  		store: Acl.getRoles(),
				  	},				  				  	
				  },
				  {text:'Email', dataIndex:'email', editor:'textfield'},
				  {text:'Password', dataIndex:'password', editor:'textfield'},
				  {text:'Created', dataIndex:'created'},
				  {text:'Updated', dataIndex:'updated'}],

		store:'Users',

		selType:'cellmodel',
		plugins: {
			ptype: 'cellediting',
			pluginId:'cellplugin', 
            clicksToEdit: 2
		}		
	}],

	tbar:[{
			xtype:'button',
			bind:{ 
				text: '{create.text}',
				iconCls: '{create.icon}' 
			},					
			handler: 'onCreateUser',
			disabled: Acl.is('users', 'create')
		},{
			xtype:'button',
			bind:{ 
				text: '{remove.text}',
				iconCls: '{remove.icon}' 
			},	
			handler: 'onDeleteUser',
			disabled: Acl.is('users', 'delete')
		}],

});