Ext.define('todo.store.Projects', {
	extend:'Ext.data.Store',
	model:'todo.model.Projects',
	autoSync: true,
	autoLoad: true,
	proxy: {
        type:'rest',
        url:'api/projects',
        reader: {
            type: 'json',
            rootProperty:"projects"
        }, 
        writer: {
            type: 'json',
            rootProperty:'',
        }
    }

});