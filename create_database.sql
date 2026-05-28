-- SQL script pentru crearea bazei de date a proiectului de gestiune apartamente
CREATE DATABASE IF NOT EXISTS `apartment_management` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `apartment_management`;

CREATE TABLE IF NOT EXISTS `apartments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `address` VARCHAR(255) NOT NULL,
  `area` INT NOT NULL,
  `rooms` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `tenants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `apartment` VARCHAR(255) DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contracts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `apartment` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `start` DATE NOT NULL,
  `end` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `apartment` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `maintenance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `apartment` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `priority` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `cost` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `apartments` (`address`, `area`, `rooms`, `status`) VALUES
('Str. Victoriei 10, Ap. 101', 55, 2, 'Liber'),
('Str. Libertății 12, Ap. 202', 72, 3, 'Ocupat'),
('Str. Unirii 5, Ap. 305', 48, 1, 'În mentenanță');

INSERT INTO `tenants` (`firstName`, `lastName`, `email`, `phone`, `apartment`, `status`) VALUES
('Andrei','Popescu','andrei.popescu@example.com','0712345678','Str. Victoriei 10, Ap. 101','Activ'),
('Ioana','Ionescu','ioana.ionescu@example.com','0723456789','Str. Libertății 12, Ap. 202','Activ');

INSERT INTO `contracts` (`apartment`, `type`, `start`, `end`) VALUES
('Str. Victoriei 10, Ap. 101','Închiriere','2024-01-01','2024-12-31'),
('Str. Libertății 12, Ap. 202','Închiriere','2024-03-15','2025-03-14');

INSERT INTO `payments` (`apartment`, `type`, `amount`, `date`) VALUES
('Str. Victoriei 10, Ap. 101','Chirie',1200,'2024-05-05'),
('Str. Libertății 12, Ap. 202','Utilități',240,'2024-05-01');

INSERT INTO `maintenance` (`apartment`, `description`, `date`, `priority`, `status`, `cost`) VALUES
('Str. Victoriei 10, Ap. 101','Verificare centrală termică','2024-05-20','Medie','Programat',150.00),
('Str. Libertății 12, Ap. 202','Reparație robinet baie','2024-05-22','Ridicată','În desfășurare',120.00);
