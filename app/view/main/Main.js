/* Layout app todo */
Ext.define('todo.view.main.Main', {
	extend: 'Ext.container.Viewport',

	requires: [ 'todo.view.main.MainController', 
				'todo.view.main.MainModel' ],
	controller: 'main',
	viewModel: {
		type:'main'
	},
	height:800,
	overflowY:'auto',
	items:[{
		xtype:'panel',
		id:'mainpanel',

		items:{
			xtype:'container',
			id:'mainbody',
		},
		tbar:{
			id:'mainmenu',
			items:[{
	            bind: {
	            	text:'{menu.users.text}',
	            	iconCls: '{menu.users.icon}'
	            },
	            id:'users', 
	            disabled: Acl.is('users')	            
	        },{
	            text:'Settings',
	            iconCls:'glyphicon glyphicon-cog',
	            menu:{
		            items: [{ 
		            	glyph:"1@Glyphicons Halflings",		                         
			            iconCls:"glyphicon glyphicon-search pull-left",
			            text:'Filters',
			            id:'filters',
			            disabled: Acl.is('filters')               
			        },{
			        	glyph:"1@Glyphicons Halflings",	
			           	iconCls:'glyphicon glyphicon-th pull-left',
			           	text:'Projects',
			           	id:'projects',
			           	disabled: Acl.is('projects')
			        },{
			           	glyph:"1@Glyphicons Halflings",	
			           	iconCls:'glyphicon glyphicon-lock pull-left',
			          	text: 'Settings',
			           	id:'settings',
			           	disabled: Acl.is('settings')	           	
			        }],
		        }       	
	        },{
	        	xtype:'button',
	        	text:'Logout',
	        	hidden: (Auth.check().user) ? false : true,
	        	handler: 'onLogout'
	        }]
        }
	}]
});