Ext.define('todo.view.main.Login', {
	extend:'Ext.window.Window',
	requires : [ 'todo.view.main.MainController' ],
	controller: 'main',
	title:'Login',
	autoShow:true,
	modal:true,
	width:300,
	height:150,	
	items:{
		xtype:'form',
		height:150,
		bodyPadding:20,
		items:[{
			xtype:'textfield',
			fieldLabel:'Email',
			name:'email',
		},{
			xtype:'textfield',
			fieldLabel:'Password',
			name:'password'
		},{
			xtype:'button',
			text:'Login',
			handler: 'onLogin',
		}]
	}	
});