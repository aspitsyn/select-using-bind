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

var slogfile = '/temp/test001.log';
var pathToFile = 'sqltext.txt';

var sqlid = "";
var SQLtextmem = "";

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

var checkargs = () => {
    return (cmdArgs.length == 0 ) ? doReadFile(loadSQLtext)
    : (cmdArgs.length == 1 || cmdArgs.length == 2 ) ? (sqlid = cmdArgs[0])    
    : ">2 parameters passed"
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

// Pre-command1
var setcursorsharing = function (arg1,conn, cb) {  
  if (cmdArgs.length == 2) {    
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
  SQLtextmem = "select sql_fulltext from v$sql where sql_id='" + sqlid + "'";  
  if (cmdArgs.length == 1 || cmdArgs.length == 2) {
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
  return (cmdArgs.length == 0) ? SQLtext1
    : (cmdArgs.length == 1) ? argx
    : (cmdArgs.length == 2) ? argx
    : "Nothing"
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
        //console.log("Number of rows: " + result.rows.length);        
           // simpleout(result.rows);   
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
    basic,
    extended
  ],
  function (err, conn) {
    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); }
    if (conn)
      dorelease(conn);
  });
