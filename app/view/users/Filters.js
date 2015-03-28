
var getItems = function() {
	
	var statuses = ['new', 'accepted', 'complited'];
	var items = [];
	var user = Auth.check().user;
	var filters = user ? Ext.JSON.decode(user.filters) : null ;

		for(var i in statuses) {
			var is_checked = false;			
			if(filters && filters.status) {
				for(var j in filters.status){
					if(statuses[i]===filters.status[j]) {
						is_checked = true;
					}
				}
			}

			items.push({ boxLabel: statuses[i], 
						name: 'status', 
						inputValue: statuses[i], 
						checked: is_checked });
		}

	return items;
};

Ext.define('todo.view.users.Filters', {
	extend: 'Ext.window.Window',
	requires: [ 'todo.view.users.UsersController' ],
	controller: 'users',
	viewModel: {
		type:'main'
	},
	autoShow: true,
	title:'Filters',
	width:600,
	height:300,	
	overflowY:'auto',
	
	items:[{
		xtype:'form',
		padding:10,
		border:0,		
		items:[{
			xtype:'checkboxgroup',
			fieldLabel:'Status',
			columns: 1,
			vertical: true,
			items: getItems(),
			listeners: {

			}
		},{
			xtype:"button",
			text: "Save",
			handler: "onSaveFilters",
		}]
	}]

});