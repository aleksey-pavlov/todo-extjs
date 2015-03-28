Ext.define("todo.view.tasks.TasksController", {
    extend:'Ext.app.ViewController',
    alias: 'controller.tasks',
    safeHeader: 0,

    onCellClick: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
         var cellHeader =  table.getHeaderAtIndex(cellIndex);  

        if(this.safeHeader) {
            this.safeHeader.getEl().setBorder(1);
        }

        this.safeHeader = cellHeader;
        cellHeader.getEl().setBorder(3);

        Ext.getCmp('taskForm').getForm().loadRecord(record);
        CKEDITOR.instances.ckeditor.setData(record.data.description);  
    },

    onCellDblClick: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        
        if(Acl.is('tasks', 'hours')) { return false; }
        if(Ext.get(td).hasCls('hours-columns')){

            var cellHeader =  table.getHeaderAtIndex(cellIndex);  

            Ext.getCmp('taskForm').getForm().loadRecord(record);
            CKEDITOR.instances.ckeditor.setData(record.data.description);                                                                  
                           
            var value = record.data[cellHeader.dataIndex];
            var title = cellHeader.dataIndex + ' ' + record.data.name
           
            var window = new todo.view.tasks.Hours( {title:title} );
            window.input = {
                value: value,
                record: record,
                index: cellHeader.dataIndex
            };
            window.show();           
        }
    },

    getDataFilter: function() {

        var output = { month:{}, year: 0 };

        var setYearCombo = Ext.getCmp('setYearCombo');
        var setMonthCombo = Ext.getCmp('setMonthCombo');

        output.year = setYearCombo.getValue();
        output.month = { "title": setMonthCombo.getRawValue(), 
                         "num":setMonthCombo.getValue() };

        return output;
    },

    renderColumnGrid: function() {
    
        var grid = Ext.getCmp('tasksGrid');
        var values = this.getDataFilter();
        var year = values.year;
        var month = values.month;

        var output = [{
             header:'Task', locked:true,         
             columns :[{text:'Title', dataIndex: 'name', 
                            renderer:function(value, metaData, record){
                                metaData.tdCls+="priority-"+record.data.priority;
                                return value;
                            }
                        },
                       {text:'Hours', dataIndex:'renderer',
                        width:50,                                 
                        renderer: function(value, metaData, record) {                                                    
                                    var total = 0;
                                        for(var k in record.data){                                                
                                           if(k.match(/[0-9-]{10}/)) { 
                                           		if(record.data[k].value>0) {
                                           			total+=parseInt(record.data[k].value);
                                           		}
    										}
                                        } 
                                        return total;                                                    
                                    },

                        summaryType: function(records){
                	        var total = 0;
                            for(var i in records){
                                for(var k in records[i].data) {                                         
                                       if(k.match(/[0-9-]{10}/)) { 
                                       		if(records[i].data[k].value>0) {
                                       			total+=parseInt(records[i].data[k].value);
                                       		}
    									}
                                  } 
                              }	                                 
                              return total;
                         },	                                
                     },{
                        text:'Status', dataIndex:'status'
                     }]                            
        }];

        var data = { header: month.title+' '+year, columns: [] };

        var days = new Date(year, month.num, 0).getDate();

        for(var j=1; j<=days; j++) {

            var dataIndex = year+'-'+(month.num<10?'0'+month.num:month.num)+'-'+(j<10?'0'+j:j);
            
            var column_cls = '';
            var week_day = new Date(year, month.num-1, j).getDay();
            if(week_day==6 || week_day==0) {
                column_cls = 'offday';
            }

            data.columns.push({ text:j, 
                    dataIndex: dataIndex,
                    width:40, 
                    sortable:false,
                    draggable:false,                   
                    tdCls: 'hours-columns '+column_cls,
                    cls: column_cls,                                          
                    menuDisabled:true, 
                    renderer: function(value, metaData){
                        if(value){
                            if(value.note){ 
                                metaData.style="color:red";
                            }
                            return value.value;
                        }
                    },

                    summaryType: function(records, values) {
                        var total = 0;
                        if(values) {
                           for(var i in values) {
                                if(values[i]) {
                                    total+=parseInt(values[i].value);    
                                }                                
                           }                           
                           return total;
                       }
                    },
                    
                    summaryRenderer: function(value) {
                        if(value>0) { return value; }
                    }
                });
        }

        output.push(data);
        var params = { year: year,
                        month: month.num };

        var user = Auth.check().user;
        if(Acl.is('tasks', 'full') && user) {
            params.user = user.id;
        }

        grid.getStore().load({ params: params, callback: grid.reconfigure(output) });
        this.safeHeader = 0;

        return true;
    },

    
    saveTask: function(el) {
        var form = el.up('form');
        var store = el.up('grid').getStore();
        var record = form.getRecord();
        var values = form.getValues();       
        values.description = CKEDITOR.instances.ckeditor.getData(); 
        record.set(values);        
    },

    createTask: function(el) {
        var store = el.up('grid').getStore();
        var selection = el.up('grid').getSelection();
        if(selection[0]) {
            store.insert(0, new todo.model.Tasks({user_id:selection[0].data.user_id,
                                                  project_id: selection[0].data.project_id}));
        }
    },

    deleteTask: function(el){
        var grid = el.up('grid');
        var store = grid.getStore();
        store.remove(grid.getSelection());
    }

    
});

