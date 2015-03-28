Ext.define('todo.view.main.MainController', {
	extend:'Ext.app.ViewController',

	alias:'controller.main',
	
	onLogin:function(el) {
				var form = el.up('form');
				var params = form.getValues();
				var auth = Auth.auth(params);
				if(auth.user) {
					location.reload();		
				}
			},
	onLogout: function(el) {
		 var clear = Auth.destroy();
		
		 if(clear) {
		 	location.reload();
		 }
	}
});
