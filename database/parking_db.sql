-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for parking_db
CREATE DATABASE IF NOT EXISTS `parking_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parking_db`;

-- Dumping structure for table parking_db.parking_lots
CREATE TABLE IF NOT EXISTS `parking_lots` (
  `parking_id` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `spot_number` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ช่องจอดรถ',
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'สถานะ',
  `floor` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชั้น',
  `type_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภท Car=T0001, Motocycle=T0002 ',
  PRIMARY KEY (`parking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table parking_db.parking_lots: ~15 rows (approximately)
INSERT INTO `parking_lots` (`parking_id`, `spot_number`, `status`, `floor`, `type_id`) VALUES
	('P0001', 'A01', 'free', '1f', 'T0001'),
	('P0002', 'A02', 'free', '1f', 'T0001'),
	('P0003', 'A03', 'unavailable', '1f', 'T0002'),
	('P0004', 'A04', 'unavailable', '1f', 'T0002'),
	('P0005', 'A05', 'unavailable', '1f', 'T0003'),
	('P0006', 'B01', 'unavailable', '2f', 'T0002'),
	('P0007', 'B02', 'free', '2f', 'T0002'),
	('P0008', 'B03', 'free', '2f', 'T0002'),
	('P0009', 'B04', 'free', '2f', 'T0001'),
	('P0010', 'B05', 'free', '2f', 'T0001'),
	('P0011', 'C01', 'free', '3f', 'T0002'),
	('P0012', 'C02', 'free', '3f', 'T0002'),
	('P0013', 'C03', 'free', '3f', 'T0002'),
	('P0014', 'C04', 'free', '3f', 'T0003'),
	('P0015', 'C05', 'free', '3f', 'T0003');

-- Dumping structure for table parking_db.parking_tickets
CREATE TABLE IF NOT EXISTS `parking_tickets` (
  `ticket_id` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `paid` decimal(10,2) DEFAULT NULL COMMENT 'ราคา = (60/vehicle_type_price*end_time)',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `vehicles_id` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parking_id` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table parking_db.parking_tickets: ~8 rows (approximately)
INSERT INTO `parking_tickets` (`ticket_id`, `paid`, `start_time`, `end_time`, `vehicles_id`, `parking_id`) VALUES
	('TI0001', 20.83, '2023-02-03 03:00:12', '2023-02-03 13:30:32', 'V0001', 'P0003'),
	('TI0002', 16.67, '2023-02-03 03:01:27', '2023-02-03 13:53:06', 'V0002', 'P0001'),
	('TI0003', 20.83, '2023-02-03 03:04:35', '2023-02-03 13:54:06', 'V0003', 'P0004'),
	('TI0004', NULL, '2023-02-03 14:00:40', NULL, 'V0004', 'P0005'),
	('TI0005', NULL, '2023-02-03 15:38:20', NULL, 'V0005', 'P0003'),
	('TI0006', 16.67, '2023-02-03 08:44:35', '2023-02-03 17:24:16', 'V0006', 'P0007'),
	('TI0007', NULL, '2023-02-03 16:46:07', NULL, 'V0007', 'P0004'),
	('TI0008', NULL, '2023-02-03 16:49:45', NULL, 'V0008', 'P0006');

-- Dumping structure for table parking_db.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `vehicles_id` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `license_plate` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `make` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ยี่ห้อ',
  `model` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `color` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'สี',
  `type_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภท Car=T0001, Motocycle=T0002 ',
  PRIMARY KEY (`vehicles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table parking_db.vehicles: ~8 rows (approximately)
INSERT INTO `vehicles` (`vehicles_id`, `license_plate`, `make`, `model`, `color`, `type_id`) VALUES
	('V0001', '1 กจ 8324 กรุงเทพ', 'Honda', 'City', 'white', 'T0002'),
	('V0002', '1 กน 5598 นครราชสีมา', 'Honda', 'Click 125i', 'blue', 'T0001'),
	('V0003', '8 กน 3521 กรุงเทพ', 'Toyota', 'yaris', 'orange', 'T0002'),
	('V0004', '7 ปป 8972 ชลบุรี', 'ISZUZU', 'NMR 130', 'white', 'T0003'),
	('V0005', '5 กด 4444', 'NISSAN', 'Almera', 'white', 'T0002'),
	('V0006', '7 วก 5871', 'Honda', 'Civic', 'gray', 'T0002'),
	('V0007', '1 ภภ 5263', 'Toyota', 'Hirux Revo', 'white', 'T0002'),
	('V0008', '9 ภภ 7586', 'Toyota', 'Hirux Revo', 'red', 'T0002');

-- Dumping structure for table parking_db.vehicles_types
CREATE TABLE IF NOT EXISTS `vehicles_types` (
  `type_id` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `vehicle_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL COMMENT 'motocycle 40/วัน car 50/วัน, truck 100/วัน',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table parking_db.vehicles_types: ~3 rows (approximately)
INSERT INTO `vehicles_types` (`type_id`, `vehicle_type`, `price`) VALUES
	('T0001', 'motocycle', 40.00),
	('T0002', 'car', 50.00),
	('T0003', 'truck', 100.00);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
