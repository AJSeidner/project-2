drop database inventory_db;
CREATE DATABASE `inventory_db`;
use `inventory_db`;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(45) NOT NULL,
  `regionCode` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `stock_qty` int(11) DEFAULT '0',
  `unit_price` decimal(10,5) DEFAULT '0.00000',
  `regionCode` varchar(10) NOT NULL,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `inventory_line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` int(11) NOT NULL,
  `inventoryId` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `txnType` varchar(45) NOT NULL,
  'price_cost' decimal (10,5) NOT NULL DEFAULT "0.0000"
  PRIMARY KEY (`id`),
  KEY `id_idx` (`employeeId`),
  KEY `id_idx1` (`inventoryId`),
  CONSTRAINT `employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `inventoryId` FOREIGN KEY (`inventoryId`) REFERENCES `inventory` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

