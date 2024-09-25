-- SELECT CONCAT("FirstName",' ', "LastName") 
--     AS "FullName"
-- from "Customer"
--     order by "FirstName";


-- Tasks

-- 1. Perform aggregation function on “Track” table 
-- a.Perform max on milliseconds.
-- b.Perform min on bytes
-- c.Perform sum on unit price

SELECT MAX("Milliseconds") 
    AS maxi
FROM   
    "Track" 


SELECT MIN("Milliseconds") 
    AS mini
FROM   
    "Track" 

SELECT SUM("UnitPrice") 
    AS total
FROM   
    "Track" 

-- 2 Calculate kilobyte / second using bytes and milliseconds from the “Track” table.

SELECT ( "Bytes" / "Milliseconds" * 1000 / 1024 ) 
    AS result
FROM   
    "Track" 

--3 Calculate the count of people by their ‘city’ and sort them alphabetically from the “Employee” table.

SELECT 
   "City", 
    COUNT(*) AS employee_count
FROM 
    "Employee"
GROUP BY 
    "City"
ORDER BY 
    "City"
    
    
--4 Count the number of invoices in the range of Jan to March of 2009 using the invoice date and also calculate the sum of the total of invoices in that range.

SELECT 
    COUNT(*) AS invoice_count,
    SUM("Total") AS total_sum
FROM 
    "Invoice"
WHERE 
    "InvoiceDate" >= '2009-01-01' AND "InvoiceDate" < '2009-04-01';