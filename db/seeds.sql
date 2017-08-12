-- employee table
INSERT INTO `employees`
(`fname`,`lname`,`role`,`email`,`password`,`regionCode`)
VALUES
("Matt","M","m","matt@test.com","","A");

INSERT INTO `employees`
(`fname`,`lname`,`role`,`email`,`password`,`regionCode`)
VALUES
("Shay","S","s","shay@test.com","shay","W");

INSERT INTO `employees`
(`fname`,`lname`,`role`,`email`,`password`,`regionCode`)
VALUES
("Joe","S","s","Joe@test.com","joe","E");


-- inventory table
INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("pen",20,1.50,"W","office supply");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("pen",50,1.50,"E","office supply");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("monitor",45,50.78,"E","electronic");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("monitor",20,50.78,"W","electronic");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("fork",30,5.00,"W","kitchen");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("knife",40,15.00,"E","kitchen");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("backpack",45,25.00,"W","office supply");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("copypaper",50,5.00,"E","office supply");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("spoon",25,2.00,"E","kitchen");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("spoon",5,2.00,"W","kitchen");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("charger",8,10.00,"E","electronic");

INSERT INTO `inventory_db`.`inventory`
(`product_name`,`stock_qty`,`unit_price`,`regionCode`,`category`)
VALUES
("radio",2,25.50,"E","electronic");

-- inventory line table
INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,5,10,"s",50);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,6,5,"s",75);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,8,20,"s",100);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,1,10,"s",15);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,9,5,"s",10);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,9,10,"s",20);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,38,5,"s",500);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,1,10,"p",5);
INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,2,20,"p",10);
INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (3,2,10,"s",15);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,3,5,"s",253.90);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,4,10,"s",507.80);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,3,45,"p",200);

INSERT INTO `inventory_line`
(`employeeId`,`inventoryId`,`qty`,`txnType`,`price_cost`)
VALUES (2,4,20,"p",150);