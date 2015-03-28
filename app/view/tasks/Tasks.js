var yearsStore = Ext.create("Ext.data.Store", {
    fields:['year'],
    data: (function() { var years = [];
           var current = new Date().getFullYear();
           years.push({'year':(current+1)});
           for(var i=0; i<=6; i++) {
                years.push({'year':(current-i)});
           }          
           return years;})()
});

var monthStore = Ext.create('Ext.data.Store', {
    fields:['title','num'],        
    data: [{"title":"January","num":1},
            {"title":"February", "num":2},
            {"title":"March", "num":3},
            {"title":"April", "num":4},
            {"title":"May", "num":5},
            {"title":"June", "num":6},
            {"title":"July", "num":7},
            {"title":"August", "num":8},
            {"title":"September", "num":9},
            {"title":"October", "num":10},
            {"title":"November", "num":11},
            {"title":"December", "num":12}]
});


Ext.define('todo.view.tasks.Tasks', {
    extend: 'Ext.grid.Panel',   
    requires: [ 'todo.view.tasks.TasksController', 
                'todo.view.main.MainModel'],
    controller: 'tasks', 
    viewModel: {
        type: 'main'
    },
    renderTo:'mainbody',
    columnLines: true,
    selType: 'cellmodel',             
    id: 'tasksGrid', 
    height:800,   
    tbar: [{
        xtype: 'combobox',
        id: 'setYearCombo',
        store: yearsStore,
        displayField: 'year',
        valueField: 'year',
        value: (new Date().getFullYear()),  
        listeners: {
           select: 'renderColumnGrid'
        }                                          
    },{
        xtype: 'combobox',
        id: 'setMonthCombo',
        store: monthStore,
        displayField: 'title',
        valueField: 'num',
        value: (new Date().getMonth()+1),
        listeners: {
            select: 'renderColumnGrid'
        }
    },{
        xtype: 'button',
        bind:{ 
                text: '{create.text}',
                iconCls: '{create.icon}' 
            },  
        handler:'createTask',
        disabled: Acl.is('tasks', 'create')
    },{
        xtype: 'button',
        bind:{ 
                text: '{remove.text}',
                iconCls: '{remove.icon}' 
            },  
        handler:'deleteTask',
        disabled: Acl.is('tasks', 'delete')
    }],

    features: [{
        id:'group',
        ftype: 'groupingsummary',
        groupHeaderTpl:['{[values.rows[0].data.user_name]}'],
        startCollapsed :true ,
    }],

    listeners: {                   
        celldblclick: 'onCellDblClick', 
        cellclick: 'onCellClick',
        afterrender: 'renderColumnGrid',      
    }, 

    store: 'Tasks',
    columns: [{header:'Task', locked:true}],

    dockedItems: [{
        xtype:'form',
        id:'taskForm',
        dock:'bottom',
        height: 300,
        items:[{
            xtype:'panel',
            height:300,
            width:700,
            border:0,                
            style: { float:'left' },
            items: {
                xtype:'textarea',
                id:'ckeditor',
                name: 'description',
            },
            listeners: {
                afterrender:function() {
                     CKEDITOR.replace( 'ckeditor', { resize_enabled:false, height:150 });

                }
            }
        },{
            xtype: 'panel',
            style: { float:'left', 
                     padding:'10px 0 0 10px'},
            width:400,
            border:0, 
            items:[{
                xtype:'textfield',
                name:'name',
                fieldLabel: 'Name'                    
            },{
                xtype:'combobox',
                store: 'Projects',
                displayField:'name',
                valueField:'id',
                fieldLabel:'Project',
                name:'project_id' 

            },{
                xtype:'combobox',
                name:'user_id',
                store:'Users',
                displayField:'username',
                valueField:'id',
                fieldLabel:'User'
            },{
                xtype:'spinnerfield',
                name:'labor',
                fieldLabel:'Labor',
                value: 0.0,
                onSpinUp: function() {
                    this.setValue(parseFloat(this.getValue())+0.5);
                },
                onSpinDown: function() {
                    var val = this.getValue();
                    if(val>=0.5) {
                        this.setValue(val-0.5);
                    }
                },
            },{
                xtype:'combobox',
                name:'status',
                store: ['new','accepted','complited'],
                fieldLabel:'Status'
            },{
                xtype:'combobox',
                name:'priority',
                store:['low','medium','hight','veryhight'],
                fieldLabel:'Priority'
            },{
                xtype:'displayfield',
                fieldLabel:'Created',
                name:'created'
            },{
                xtype:'displayfield',
                fieldLabel:'Updated',
                name:'updated'
            },{
                xtype:'button',
                text:'Save',
                handler:'saveTask' ,
                disabled:Acl.is('tasks', 'edit'),             
            }]
        }]
    }]  
});

