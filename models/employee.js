var orm = require("../config/orm.js");

var employee=
{
    all:function(cb){
        orm.all("employees",function(data){
            cb(data);
        });
    },
    //cols - in array fomrat, the cols needed for insert 
    //vals - in array format
    create:function(cols,vals,cb){
        orm.create("employees",cols,vals,function(data){
            cb(data);
        });
    },
    //objColVals - in this format {col:val, col2:val2}
    //cond - in string format whereCol= whereVal
    update: function(objColVals,cond,cb){
        orm.update("employees",objColVals,cond,function(data){
            cb(data);
        });
    },
    //objColVals - in this format {col:val, col2:val2}
    findWhere: function(objColVals,cb){
        orm.findWhere("employees",objColVals,function(data){
            cb(data);
        });
    },

    //t1col - is the column from employees
    //t2col - is the column from table2 input
    innerJoin: function(table2,t1col,t2col,cb){
        orm.innerJoin("employees",table2,t1col,t2col,function(data){
            cb(data);
        });
    },
    //Select specific columns to return
    //cols - in array format
    select: function(cols,cb){
        orm.select(cols,"employees",function(data){
            cb(data);
        });
    }


}

module.exports=employee;

