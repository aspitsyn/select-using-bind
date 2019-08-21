/* Copyright (c)2019 */

/* Yet another way to run queries to the Oracle Database */
"use strict";
const fs = require("fs");
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

var bindobj = require("./bindobj.js");
var bindobjtypes = require("./bindobjtypes.js");
var SQLtext = "";
var SQLtext1 = "";
var slogfile = "/temp/allstats001.log";
var pathToFile = "sqltext.txt";
var clob = "";

async function run() {
  let connection,
    result,
    result1,
    result2,
    result3,
    result4,
    result5,
    result6,
    result7;

  //read sqltext from file
  function doReadFile(callback) {
    fs.readFile(pathToFile, "utf8", function(err, data) {
      SQLtext = data;
      callback();
    });
  }

  function loadSQLtext() {
    SQLtext1 = SQLtext;
  }

  var nameIndex = t1 => {
    return process.argv.indexOf(t1);
  };

  var nameValue = nameIndex => {
    return process.argv[nameIndex + 1];
  };

  var checkargs = () => {
    return nameIndex("-sql") === -1
      ? doReadFile(loadSQLtext)
      : "checkargs: sql_id parameter passed";
  };

  var getsqltext = argx => {
    return nameIndex("-sql") === -1
      ? SQLtext1
      : nameIndex("-sql") > -1
      ? argx
      : "Nothing";
  };

  // Output to file and console
  function simpleout(rows) {
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
      fs.writeFileSync(slogfile, rows[i] + "\r\n", { flag: "a" }, function(
        err
      ) {
        if (err) {
          return console.log(err);
        }
        //            console.log("The file was saved!");
      });
    }
  }

  try {
    //Check parameters
    checkargs();

    //Get connection
    connection = await oracledb.getConnection(dbConfig);
    // force all CLOBs to be returned as Strings
    oracledb.fetchAsString = [oracledb.CLOB];

    //setallstat
    result1 = await connection.execute(
      "alter session set statistics_level = 'ALL'",
      {},
      {
        resultSet: false
      }
    );

    //Set cursor sharing
    if (nameIndex("-cs") > -1) {
      result2 = await connection.execute(
        "alter session set cursor_sharing = 'EXACT'",
        {},
        {
          resultSet: false
        }
      );
    }

    //Set current schema
    if (nameIndex("-schema") > -1) {
      const schema = nameValue(nameIndex("-schema"));
      result3 = await connection.execute(
        `alter session set current_schema = ${schema}`,
        {},
        {
          resultSet: false
        }
      );
    }

    // Fetch sql text
    if (nameIndex("-sql") > -1) {
      const sqlid = nameValue(nameIndex("-sql"));
      result4 = await connection.execute(
        `select sql_fulltext from v$sql where sql_id='${sqlid}'`
      );
      if (result4.rows.length === 0) throw new Error("No results");
      else {
        clob = result4.rows[0][0];
        console.log(clob);
      }
    }

    //Get user defined types and set bind variables
    for (let key in bindobjtypes) {
      const { oradbtype, isObj, vals } = bindobjtypes[key];
      const TIDTable = await connection.getDbObjectClass(oradbtype);
      const tids1 = new TIDTable();

      if (Array.isArray(vals)) {
        for (let v of vals) {
          if (isObj) {
            const tid1 = {
              ID: v
            };
            tids1.append(tid1);
          } else {
            tids1.append(v);
          }
        }
      } else {
        if (isObj) {
          const tid1 = {
            ID: vals
          };
          tids1.append(tid1);
        } else {
          tids1.append(vals);
        }
      }
      bindobj[key] = tids1;
      //      console.log(key);
      //    console.log(tids1);
    }
    // console.log(bindobj);
    // Run SQL
    result5 = await connection.execute(
      //   // The statement to execute
      getsqltext(clob),
      bindobj
    );
    console.log("Number of rows: " + result5.rows.length);
    // Get all stats
    result6 = await connection.execute(
      // The statement to execute
      "SELECT * FROM table(DBMS_XPLAN.DISPLAY_CURSOR(null,null,'ALL ALLSTATS LAST'))",
      {}
    );
    simpleout(result6.rows);
    // Get tracefile name
    result7 = await connection.execute(
      `SELECT s.sid, p.tracefile FROM   v$session s JOIN v$process p ON s.paddr = p.addr WHERE  s.sid = (select distinct sid from v$mystat)`,
      []
      // outFormat determines whether rows will be in arrays or JavaScript objects.
      // It does not affect how the FARM column itself is represented.
      //        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    simpleout(result7.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
