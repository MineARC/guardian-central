-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for guardian
CREATE DATABASE IF NOT EXISTS `guardian` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `guardian`;

-- Dumping structure for table guardian.alarms
CREATE TABLE IF NOT EXISTS `alarms` (
  `guardian` varchar(50) DEFAULT NULL,
  `sent` timestamp NULL DEFAULT NULL,
  `email` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  KEY `FK_alarms_guardians` (`guardian`),
  CONSTRAINT `FK_alarms_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.aura_data
CREATE TABLE IF NOT EXISTS `aura_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `o2` float DEFAULT NULL,
  `temp` float DEFAULT NULL,
  `co` float DEFAULT NULL,
  KEY `FK_aura_data_guardians` (`guardian`),
  CONSTRAINT `FK_aura_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.battmon_data
CREATE TABLE IF NOT EXISTS `battmon_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `bank` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `balance` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  KEY `FK_battmon_data_guardians` (`guardian`),
  CONSTRAINT `FK_battmon_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.cams_data
CREATE TABLE IF NOT EXISTS `cams_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `occupied` tinyint(1) DEFAULT NULL,
  `solenoid` tinyint(1) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  KEY `FK_cams_data_guardians` (`guardian`),
  CONSTRAINT `FK_cams_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.elvp_data
CREATE TABLE IF NOT EXISTS `elvp_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mains present` tinyint(1) DEFAULT NULL,
  `inverter output` tinyint(1) DEFAULT NULL,
  `emergency bank voltage` float DEFAULT NULL,
  `standby bank voltage` float DEFAULT NULL,
  `current` float DEFAULT NULL,
  `power` float DEFAULT NULL,
  `consumed energy` float DEFAULT NULL,
  KEY `FK_elvp_data_guardians` (`guardian`),
  CONSTRAINT `FK_elvp_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.elv_data
CREATE TABLE IF NOT EXISTS `elv_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mains present` tinyint(1) DEFAULT NULL,
  `inverter output` tinyint(1) DEFAULT NULL,
  `emergency bank voltage` float DEFAULT NULL,
  `current` float DEFAULT NULL,
  `power` float DEFAULT NULL,
  `consumed energy` float DEFAULT NULL,
  KEY `FK_elv_data_guardians` (`guardian`),
  CONSTRAINT `FK_elv_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.guardians
CREATE TABLE IF NOT EXISTS `guardians` (
  `name` varchar(50) NOT NULL,
  `lastseen` timestamp NULL DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `alias` text DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `alarms_total` int(11) NOT NULL DEFAULT 0,
  `alarms_active` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}',
  PRIMARY KEY (`name`),
  UNIQUE KEY `ip` (`ip`),
  KEY `FK_guardians_guardian_types` (`type`),
  CONSTRAINT `FK_guardians_guardian types` FOREIGN KEY (`type`) REFERENCES `guardian_types` (`index`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.guardian_types
CREATE TABLE IF NOT EXISTS `guardian_types` (
  `index` tinyint(4) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.s3_data
CREATE TABLE IF NOT EXISTS `s3_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  KEY `FK_s3_data_guardians` (`guardian`),
  CONSTRAINT `FK_s3_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.s4_data
CREATE TABLE IF NOT EXISTS `s4_data` (
  `guardian` varchar(50) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  KEY `FK_s4_data_guardians` (`guardian`),
  CONSTRAINT `FK_s4_data_guardians` FOREIGN KEY (`guardian`) REFERENCES `guardians` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table guardian.state
CREATE TABLE IF NOT EXISTS `state` (
  `state` text DEFAULT NULL,
  `value` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
