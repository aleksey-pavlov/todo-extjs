Ext.define('todo.controller.Main', {
	extend:'Ext.app.Controller',

	init: function(){

			this.control({
				'viewport > container': { 
         			render: this.tasksViewRender, 						
         	 	},

				'#mainmenu #projects': {
					click: this.projectsViewRender
				},

				'#mainmenu #users' : {
					click: this.usersViewRender
				},

				'#mainmenu #filters' : {
					click: this.filtersViewRender
				}
			});
		},

	projectsViewRender : function() {
		new todo.view.projects.Projects();			
	},
    tasksViewRender: function() {            
        new todo.view.tasks.Tasks();    
       	if(!Auth.check().user)  {
        	new todo.view.main.Login();
       	}        
    },
    usersViewRender: function() {
    	new todo.view.users.Users();
    },
    filtersViewRender: function() {
    	new todo.view.users.Filters();
    }
});