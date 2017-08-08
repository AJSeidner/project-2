CREATE DATABASE `inventory_db`;
use `inventory_db`;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `stock_qty` int(11) DEFAULT '0',
  `unit_price` decimal(5,0) DEFAULT '0',
  `regionCode` varchar(10) NOT NULL,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `soldItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` int(11) NOT NULL,
  `inventoryId` int(11) NOT NULL,
  `sold_qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`employeeId`),
  KEY `id_idx1` (`inventoryId`),
  CONSTRAINT `employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `inventoryId` FOREIGN KEY (`inventoryId`) REFERENCES `inventory` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
);


