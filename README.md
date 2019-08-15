# select-using-bind version 0.4

Yet another way to run queries to the Oracle Database

This repository contains example for run SELECT query and gather statistics at ALL level.

# <a name="start"></a> Getting Started

Install Node.js from nodejs.org.
Install node-oracledb using the [Quick Start Node-oracledb Installation] [1] steps.
Install Async.js

Edit dbconfig.js and set your username, password and the database connection string:

module.exports = {
    user: "system",
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString:"localhost/orclpdb"
};

Edit bindobj.js and set your bind variables. 

Edit select.txt and set your query.

Then run the script like:

node select-using-bind.js

or 

node select-using-bind.js -sql <<sql_id>>

or

node select-using-bind.js -sql <<sql_id>> -cs EXACT

or

node select-using-bind.js -sql <<sql_id>> -cs EXACT -udt1 <<bind_name>>:<<SCHEMA.TYPE_NAME>>:<<value>>

Use named command line parameters -sql if you'd like to get sql_fulltext from sqlarea or -cs if you'd like to set parameter cursor_sharing = EXACT for your current session and -udt1, -udt2, -udt3, -udt4 if you'd like to set user defined database type.  for example -udt1 B2:HR.T$ID_TABLE:50 -udt2 B3:HR.T$ID_TABLE:100 Up to four user data type bind variables supported

[1]: https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
