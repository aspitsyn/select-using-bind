CREATE OR REPLACE TYPE HR.T$ID AS OBJECT(
  ID NUMBER(38,0)
);

CREATE OR REPLACE TYPE HR.T$ID_TABLE AS TABLE OF T$ID;

CREATE OR REPLACE TYPE HR.T$NUM_TABLE AS TABLE OF NUMBER;

