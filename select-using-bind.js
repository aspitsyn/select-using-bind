/* Copyright (c)2019 */

/* Yet another way to run queries to the Oracle Database */

const fs = require('fs');

var async = require('async');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var bindobj = require('./bindobj.js');

var cmdArgs = process.argv.slice(2);
var SQLtext = "";
var SQLtextcursor = "alter session set cursor_sharing = 'EXACT'";
var SQLtextstat = "alter session set statistics_level = 'ALL'";
var SQLtext1 = "";
var SQLtext2 = "SELECT * FROM table(DBMS_XPLAN.DISPLAY_CURSOR(null,null,'ALL ALLSTATS LAST'))";

var slogfile = '/temp/test071.log';
var pathToFile = 'sqltext.txt';

// force all CLOBs to be returned as Strings
oracledb.fetchAsString = [ oracledb.CLOB ];

var sqlid = "";
var clob = "";

var doconnect = function(cb) {
  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    cb);
};

function doReadFile(callback) {
    fs.readFile(pathToFile, 'utf8', function (err, data) {
      SQLtext = data;
      callback();
    });
  };

function loadSQLtext() {    
    SQLtext1 = SQLtext;    
  };

  var nameIndex = (t1) => {
    return process.argv.indexOf(t1);
  };

  var nameValue = (nameIndex) => {    
      return process.argv[nameIndex + 1];
  };  

var checkargs = () => {
  return (nameIndex('-sql') === -1) ? doReadFile(loadSQLtext)
  : "checkargs: sql_id parameter passed"
  };

var dorelease = function(conn) {
  conn.close(function (err) {
    if (err)
      console.error(err.message);
  });
};

// Output to file and console
function simpleout(rows){
    console.log(rows);
     for (var i=0; i<rows.length; i++){      
        fs.writeFileSync(slogfile, rows[i] + "\r\n", {'flag':'a'}, function(err) {        
            if(err) {
                return console.log(err);
            }            
//            console.log("The file was saved!");
            });
     };    
};

// Pre-command1
var setallstat = function (conn, cb) {   
  conn.execute(
      SQLtextstat,
      {},  
      function(err, result) {
        if (err) {
          return cb(err, conn);
        } else {
          return cb(null,null,conn);
        }
      });
  };

//Set cursor sharing
var setcursorsharing = function (arg1,conn, cb) {   
  if (nameIndex('-cs') > -1) {   
  conn.execute(
    SQLtextcursor,
    {},  
    function(err, result) {
      if (err) {
        return cb(err, conn);
      } else {
        return cb(null,arg1,conn);
      }
    }) } else {
       return cb(null,arg1,conn)
    }
};

//Get sql text
var getselect = function (arg1,conn,cb)  {  
    if (nameIndex('-sql') > -1) {
      const sqlid = nameValue(nameIndex('-sql'));        
      const SQLtextmem = `select sql_fulltext from v$sql where sql_id='${sqlid}'`;     
  conn.execute(
    SQLtextmem,
    function(err,result)  {
        if (err) {console.error(err.message); return;}
        if (result.rows.length === 0)
        console.error("No results");
        else {
            clob = result.rows[0][0];            
      //console.log(clob);
      return cb(null, clob,conn);    
        }
    })
  } else {
    return cb(null, null,conn)
  } 
}; 

var getsqltext = (argx) => {
    return (nameIndex('-sql') === -1) ? SQLtext1    
       : (nameIndex('-sql') > -1) ? argx
       : "Nothing"
};

//Get user defined DB type
var getclass1 = function(arg1,conn,cb){  
  if (nameIndex('-udt1') > -1){   
      var udtparts = nameValue(nameIndex('-udt1')).split(':');
        var prop = udtparts[0];
        var typename = udtparts[1];
        var val1 = udtparts[2];  
    conn.getDbObjectClass(typename, function(err, TID) {
    if (err) {
      console.error(err.message);
      return cb(err, conn);
      };          
      const tid1 = {          
              ID: val1
            };
   var tids1 = new TID();
       tids1.append(tid1);    
      bindobj[prop] = tids1;      
    return cb(null, arg1, conn)
      });
    } else {
      return cb(null, arg1,conn)
  }
};

//Get user defined DB type
var getclass2 = function(arg1,conn,cb){  
  if (nameIndex('-udt2') > -1){   
      var udtparts = nameValue(nameIndex('-udt2')).split(':');
        var prop = udtparts[0];
        var typename = udtparts[1];
        var val1 = udtparts[2];  
    conn.getDbObjectClass(typename, function(err, TID) {
    if (err) {
      console.error(err.message);
      return cb(err, conn);
      };           
      const tid1 = {          
              ID: val1
            };
   var tids1 = new TID();
        tids1.append(tid1); 
      bindobj[prop] = tids1;      
    return cb(null, arg1, conn)
      });
    } else {
      return cb(null, arg1,conn)
  }
};

//Get user defined DB type
var getclass3 = function(arg1,conn,cb){  
  if (nameIndex('-udt3') > -1){   
      var udtparts = nameValue(nameIndex('-udt3')).split(':');
        var prop = udtparts[0];
        var typename = udtparts[1];
        var val1 = udtparts[2];  
    conn.getDbObjectClass(typename, function(err, TID) {
    if (err) {
      console.error(err.message);
      return cb(err, conn);
      };           
      const tid1 = {          
              ID: val1
            };
   var tids1 = new TID();
        tids1.append(tid1); 
      bindobj[prop] = tids1;      
    return cb(null, arg1, conn)
      });
    } else {
      return cb(null, arg1,conn)
  }
};

//Get user defined DB type
var getclass4 = function(arg1,conn,cb){  
  if (nameIndex('-udt4') > -1){   
      var udtparts = nameValue(nameIndex('-udt4')).split(':');
        var prop = udtparts[0];
        var typename = udtparts[1];
        var val1 = udtparts[2];  
    conn.getDbObjectClass(typename, function(err, TID) {
    if (err) {
      console.error(err.message);
      return cb(err, conn);
      };           
      const tid1 = {          
              ID: val1
            };
   var tids1 = new TID();
        tids1.append(tid1); 
      bindobj[prop] = tids1;      
    return cb(null, arg1, conn)
      });
    } else {
      return cb(null, arg1,conn)
  }
};

// Object query
var basic = function (arg1, conn, cb) {  
  conn.execute(
    getsqltext(arg1),
    bindobj,
    function(err, result) {
      if (err) {
        return cb(err, conn);
      } else {
        //console.log(result.metaData);
        console.log("Number of rows: " + result.rows.length);        
          //simpleout(result.rows);   
        return cb(null, conn);
      }
    });
};

// Results for study
var extended = function (conn, cb) {
  conn.execute(
    SQLtext2,
    {},
    function(err, result) {
      if (err) {
        return cb(err, conn);
      } else {
        //console.log(result.metaData);
        //console.log(result.rows.length);     
        simpleout(result.rows);  
        return cb(null, conn);
      }
    });
};

checkargs();

async.waterfall(
  [
    doconnect,    
    setallstat,
    setcursorsharing,    
    getselect,
    getclass1,
    getclass2,
    getclass3,
    getclass4,    
    basic,
    extended
  ],
  function (err, conn) {
    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); }
    if (conn)
      dorelease(conn);
  });
