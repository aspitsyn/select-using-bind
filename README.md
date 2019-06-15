# select-using-bind version 0.1

Yet another way to run queries to the Oracle Database

This repository contains example for run SELECT query and gather statistics at ALL level.

# <a name="start"></a> Getting Started
Install Node.js from nodejs.org.
Install node-oracledb using the [Quick Start Node-oracledb Installation] [2] steps.
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

[1]: https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
