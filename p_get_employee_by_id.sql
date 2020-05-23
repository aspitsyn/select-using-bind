CREATE OR REPLACE PROCEDURE HR.GET_EMPLOYEE_BY_ID (vp_id IN NUMBER, vp_cursor OUT SYS_REFCURSOR)
       AS
       BEGIN
         OPEN vp_cursor FOR
           SELECT emp.employee_id
           FROM   employees emp
           WHERE  emp.employee_id = vp_id;
       END;