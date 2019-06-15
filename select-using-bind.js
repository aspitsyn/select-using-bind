/* Copyright (c)2019 */

/* Yet another way to run queries to the Oracle Database */

const fs = require('fs');

var async = require('async');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var bindobj = require('./bindobj.js');

var SQLtext = "";
var SQLtext0 = "alter session set statistics_level = 'ALL'";
var SQLtext1 = "";
var SQLtext2 = "SELECT * FROM table(DBMS_XPLAN.DISPLAY_CURSOR(null,null,'ALL ALLSTATS LAST'))";

var slogfile = '/temp/test001.log';
var pathToFile = 'sqltext.txt';

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
    //console.log(SQLtext);
    SQLtext1 = SQLtext;
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

// Pre-command
var zero = function (conn, cb) {
    conn.execute(
      SQLtext0,
      {},  
      function(err, result) {
        if (err) {
          return cb(err, conn);
        } else {
          return cb(null, conn);
        }
      });
  };

// Object query
var basic = function (conn, cb) {
  conn.execute(
    SQLtext1,
    bindobj,
    function(err, result) {
      if (err) {
        return cb(err, conn);
      } else {
        //console.log(result.metaData);
            console.log("Number of rows: " + result.rows.length);        
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

doReadFile(loadSQLtext);

async.waterfall(
  [
    doconnect,
    zero,
    basic,
    extended
  ],
  function (err, conn) {
    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); }
    if (conn)
      dorelease(conn);
  });
