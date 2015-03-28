 Ext.define('todo.view.tasks.Hours', {
    extend:'Ext.window.Window',
    width:300,
    items:[{
        xtype:'form',
        padding:10,
        border:0,
        listeners: {
            afterrender: function(form) {
               var input = this.up('window').input;
               form.getForm().setValues(input.value);
            }
        },
        items:[{
            xtype:'numberfield',
            maxValue:12,
            minValue:0,
            name:'value',
            margin:5,
            width:250,
           
        },{
            xtype:'textarea',
            name:'note',
            margin:5,
            width:250,
            height:50,
        },{
            xtype:'displayfield',
            name:'created',
            fieldLabel:'Created',
            margin:5,                                                                
        },{
            xtype:'displayfield',
            name:'updated',
            fieldLabel:'Updated',
            margin:5,                                                                
        },{
            xtype:'button',
            text:'Save',
            margin:5,
            handler:function(el){
                var input = el.up('window').input;
                var sets = {};
                sets[input.index] = el.up('form').getForm().getValues();
                input.record.set(sets);  
                el.up('window').close();                                                             
            }                                                                
        }]                                                      
    }]   
});