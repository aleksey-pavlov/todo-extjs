Ext.onReady(function(){    

    Ext.application({
        name: 'todo',
        paths: { 'Auth':'./app/Auth.js', 
                'Acl':'./app/Acl.js' },
        requires: [ 'Auth', 'Acl' ],
        appFolder:'./app',
        controllers: [ 'Main' ],
        views: [ 'main.Main', 'main.Login', 
                 'projects.Projects', 
                 'tasks.Tasks', 'tasks.Hours', 
                 'users.Users', 'users.Filters' ],

        stores: ['Projects', 'Tasks', 'Users'],
        models: ['Projects', 'Tasks', 'Users'],

        autoCreateViewport: 'todo.view.main.Main',

        launch: function() {
            console.log('Launch todo');
        }
	});    
});