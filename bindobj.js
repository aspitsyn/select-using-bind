var oracledb = require("oracledb");
//var myDate = new Date(2008, 03, 20, 01, 00, 00, 123);
//var myID = '180';

module.exports = {
  // B1: { dir: oracledb.BIND_IN, val: firstname },
  B1: { dir: oracledb.BIND_IN, val: 3000 }
  //   ,B2 { dir: oracledb.BIND_IN, val: myID}
};
