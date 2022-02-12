var oracledb = require("oracledb");
//var myDate = new Date(2008, 03, 20, 01, 00, 00, 123);
//var myID = '180';

module.exports = {
  // B1: { dir: oracledb.BIND_IN, val: firstname },
  //B1: { dir: oracledb.BIND_IN, val: 1 },
  //   ,B2 { dir: oracledb.BIND_IN, val: myID},
  // B2: { dir: oracledb.BIND_IN, val: "some text" },
  B3: { dir: oracledb.BIND_IN, val: 1 }
  // v0: 107,
  // v1: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  // id: 107,
  // cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
};
