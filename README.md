# select-using-bind version 0.2

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

node select-using-bind.js <<sql_id>>

or

node select-using-bind.js <<sql_id>> EXACT

Use unnamed command line parameters sql_id if you'd like to get sql_fulltext from sqlarea or sql_id and EXACT if you'd like to get sql_fulltext and set parameter cursor_sharing = EXACT for your current session

[1]: https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
