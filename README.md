# select-using-bind version 0.5

Yet another way to run queries to the Oracle Database

This repository contains example for run SELECT query and gather statistics at ALL level.

# <a name="start"></a> Getting Started

Install Node.js from nodejs.org.
Install node-oracledb using the [Quick Start Node-oracledb Installation][1] steps.

Edit dbconfig.js and set your username, password and the database connection string:

module.exports = {
user: "system",
password: process.env.NODE_ORACLEDB_PASSWORD,
connectString:"localhost/orclpdb"
};

Edit bindobj.js and set your bind variables.
Edit bindobjtypes.js and set your user defined type bind variables.
Edit select.txt and set your query.

Then run the script like:

node select-using-bind.js

or

node select-using-bind.js -sql <B><I>sql_id</I></B>

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -schema HR

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR -udt

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR -udt -trace

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR -udt -trace 10053 -sqltrace <B><I>sql_id</I></B>

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR -udt -sqltune TEST

or

node select-using-bind.js -sql <B><I>sql_id</I></B> -cs EXACT -schema HR -refcursor 

Use named command line parameters -sql if you'd like to get sql_fulltext from sqlarea or -cs if you'd like to set parameter
cursor_sharing = EXACT for your current session or -schema <B><I>schema_name</I></B> if you require change current schema at runtime
or -udt if you requre to set user defined type in bind variables or -trace if you'd like to trace session
or -trace 10053 if you'd like to trace SQL Optimizer for sql_id specified by -sqltrace <B><I>sql_id</I></B>.

Using bind variables examples:
bindobj.js - for simple bind variables number, string, clob, blob or date types,
bindobjtypes.js - for user defined type bind variables.
sqltext.sql - example query

Note that 10053 SQL Optimizer tracing work out if that sql wouldn't exist in sqlarea cache.
But if it does, it requires to clean up first that sql from sqlarea:

select INST_ID, ADDRESS, HASH_VALUE from GV\$SQLAREA where SQL_Id='<B><I>sql_id</I></B>';

exec DBMS_SHARED_POOL.PURGE('<B><I>ADDRESS</I></B>,<B><I>HASH_VALUE</I></B>','C');

[1]: https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
