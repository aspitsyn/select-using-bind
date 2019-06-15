# select-using-bind version 0.1
<<<<<<< HEAD

=======
>>>>>>> fd840339e6d598e8da408d43a4340c45606ae92f
Yet another way to run queries to the Oracle Database

This repository contains example for run SELECT query and gather statistics at ALL level.

<<<<<<< HEAD
# <a name="start"></a> Getting Started
Install Node.js from nodejs.org.
Install node-oracledb using the [Quick Start Node-oracledb Installation] [2] steps.
=======
Getting Started
Install Node.js from nodejs.org.
Install node-oracledb using the Quick Start Node-oracledb Installation steps.
>>>>>>> fd840339e6d598e8da408d43a4340c45606ae92f
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

<<<<<<< HEAD
[1]: https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
=======
>>>>>>> fd840339e6d598e8da408d43a4340c45606ae92f
