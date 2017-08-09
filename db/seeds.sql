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