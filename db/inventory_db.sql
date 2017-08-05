CREATE database `inventory_db` ;

CREATE TABLE `employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(100) NOT NULL,
  `lname` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(200) NOT NULL,
  `stock_qty` INT NULL DEFAULT 0,
  `unit_price` DECIMAL(5) NULL DEFAULT 0,
  `regionCode` VARCHAR(10) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `soldItems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `employeeId` INT NOT NULL,
  `inventoryId` INT NOT NULL,
  `sold_qty` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`employeeId` ASC),
  INDEX `id_idx1` (`inventoryId` ASC),
  CONSTRAINT `employeeId`
    FOREIGN KEY (`employeeId`)
    REFERENCES `inventory_db`.`employees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `inventoryId`
    FOREIGN KEY (`inventoryId`)
    REFERENCES `inventory_db`.`inventory` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
