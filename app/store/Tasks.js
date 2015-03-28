Ext.define('todo.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'todo.model.Tasks',    
    groupField:'user_id',
    autoSync: true,  
    autoLoad: false,    
    proxy: {
        type:'rest',
        url:'api/tasks',
        reader: {
            type: 'json',
            rootProperty:"tasks"
        }, 
        writer: {
            type: 'json',
            rootProperty:'',
        } 
    }
});