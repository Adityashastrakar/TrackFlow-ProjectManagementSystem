CREATE DATABASE  IF NOT EXISTS `trackflowdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trackflowdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: trackflowdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `clientid` int NOT NULL AUTO_INCREMENT,
  `clientname` varchar(200) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `domain` varchar(100) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`clientid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Knowit','http://www.knowit.cdac.in','Training','Gokhale Sanchit,Fergusan College','1234568890'),(2,'Valores Consultany','http://www.valoresConsultany.co.in','Consultany','Navi Mumbai','9876543210'),(3,'Blackhole','http://www.blackhole.com','Music Industry','Pune','9823242390'),(4,'55D Audio','http://www.d55audio.co.in','Android','Nagpur','4378465876'),(5,'CUPA','www.cupa.com','MNC','Pune','9998885551'),(6,'CDAC','www.cdac.in','Education','Pune','1234567890');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `designationid` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`designationid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'FrontEnd Devloper'),(2,'BackEnd Developer'),(3,'Tester'),(4,'Devops Developer'),(5,'DBA'),(6,'Project Architect'),(7,'FullStack Developer ');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `empid` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `nationality` varchar(25) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `currentaddress` varchar(255) DEFAULT NULL,
  `permanentaddress` varchar(255) DEFAULT NULL,
  `basicsal` double DEFAULT NULL,
  `incentives` float DEFAULT NULL,
  `hiredate` date DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `login_id` int DEFAULT NULL,
  PRIMARY KEY (`empid`),
  UNIQUE KEY `UK_lo0aqea2uilso5tj35u8c05w` (`login_id`),
  KEY `designation_id` (`designation_id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designationid`),
  CONSTRAINT `FK7480gop9a2flk53qaag3jxvce` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Rushabh Dabare','2001-01-14','M','Indian','rushabhdabare@gmail.com','9067015129','Pune','Wadsa',60000,5000,'2024-03-01',1,1),(13,'MehulGhyar','2024-01-28','M','Indian','mehulghyar321@gmail.com','9876543210','pune','Nagbhid',1000000,9000,'2024-03-02',2,23),(14,'Bakul Mam','2024-01-28','F','Indian','bakulmam@gmail.com','1234567890','pune','pune',56000,4998,'2024-03-01',2,24),(15,'Aditya','2024-01-28','M','Indian','aditya2@gmail.com','9876543210','Pune','Pune',45000,5000,'2024-03-01',1,25),(16,'Krishna','2024-01-28','M','Indian','krishna@gmail.com','1234567890','Pune','Baitul',45000,4999,'2024-03-04',2,26),(17,'ram','2024-02-06','M','Indian','ram123@gmail.com','1234567890','pune','nashik',45000,5000,'2024-02-12',1,27),(20,'pranav','2024-01-28','M','Indian','pranav@gmail.com','9876543210','pune','pune',90000,10000,'2024-02-20',2,39),(22,'Tushar','2024-02-12','M','Indian','tushar@gmail.com','9876543210','Pune','Nagpur',60000,7500,'2024-03-09',2,43),(27,'Anuraag Ghyar','2024-01-28','M','Indian','anya@gmail.com','9876543210','Pune','Nagbhid',67000,5000,'2024-03-08',1,53),(28,'Harshal','2024-01-28','M','Indian','harshal@gmail.com','9876543210','Pune','Nagpur',45000,4997,'2024-03-01',1,54),(29,'Tejas','2024-01-28','M','Indian','tejas@gmail.com','9876543210','Pune','Pune',45000,4999,'2024-03-01',1,55),(30,'Shreyash Hake','2024-01-28','M','Indian','tejas@gmail.com','9876543210','Pune','Yavatmal',45000,4999,'2024-03-01',1,56),(31,'Tanmay','2024-01-28','M','Indian','tejas@gmail.com','9876543210','Pune','Bhandara',45000,4999,'2024-03-01',1,57),(32,'Spandan','2024-01-28','M','Indian','spandan@gmail.com','9876543210','Banguluru','Nagpur',45000,4999,'2024-03-01',1,58),(33,'Ramaksh','2024-01-28','M','Indian','spandan@gmail.com','9876543210','Pune','Nashik',45000,4999,'2024-03-01',1,59),(34,'Abhishek Bachchan','1999-12-31','M','Indian','ab@gmail.com','9067015129','Pune','pune',45000,5000,'2024-03-01',2,60),(35,'Babita','2000-11-16','F','Indian','babita@gmail.com','9876543210','Pune','pune',50000,499,'2024-03-02',1,61),(36,'Chacha Chaudhari','2001-12-02','M','Indian','chacha@gmail.com','9876543210','Pune','pune',30000,3000,'2024-03-03',3,62),(37,'Dipak','2002-04-20','M','Indian','dipak@gmail.com','9876543210','Pune','pune',30000,3000,'2024-03-03',5,63),(38,'Emma Watson','2003-05-08','F','Indian','emma@gmail.com','9876543210','Pune','pune',30000,3000,'2024-03-03',5,64),(39,'Falgoon','2003-05-08','M','Indian','emma@gmail.com','9876543210','Pune','pune',60000,3000,'2024-03-03',4,65),(40,'Prathamesh ','2009-02-25','M','Indian','prathamssh123@gmail.com','9067015129','Pune','Pune',0,0,'2024-02-21',1,66);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `login_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'rushabh','$2a$10$MLiH1QSkFNvzjoVAxxn7BOh0Tdk8/DOYYOXWzGvg9Nv025TzhxmKu',1,_binary ''),(23,'mehulghyar','$2a$10$W/I15g6rdYhcVW.JRtp7jusMBUd3WrXCTbBMh3Lqh6BHn4Qp1wdnK',2,_binary ''),(24,'bakulmam','$2a$10$CQLYnYhc.oBxAexl7USMUecJFUls9Zk9hxU7wSoL5iE04pKuNzfeC',3,_binary ''),(25,'adityaaa','$2a$10$hJ.qvFHDbfuZ2M8gJfcTEuhg6EuAP6pCHEleRxT6YpE1F.KqgNS3C',2,_binary ''),(26,'krishnamurti','$2a$10$LqvKSnJg7MsXI1bwNVpqK.JhNDveQzrJqyVzf0/9DqBgw9iuWWen.',3,_binary '\0'),(27,'Ram_123456','$2a$10$/AiCKLzg4T1Z8dAtWcVgY.XMLMCh4gScosa.b1J.AAK/y21vX2Aei',3,_binary '\0'),(39,'pranav_ner','$2a$10$zCfaj3RZK/i/sUSlb.1s9uUMIPTe5FWjskhkNyQkqvaHdjN7GSw3u',2,_binary ''),(43,'tusharbhoyar','$2a$10$20/ENHaw6lzDbTdhjPGr/uCyVjdq.Um1WZXfeHwUgHK6OoBkoQ6.u',3,_binary ''),(53,'anuragghyar','$2a$10$xCN.5UOmTTQzlvB6ddYi2.iwR7WL4Gc3GktmYEFL0SenpPxBJBmme',3,_binary ''),(54,'harshal','$2a$10$MdX69BBc9Eo1bPdQ2uM2SOZ/Horsrbhw7IMh.yDtQQjqmpnStpLQC',2,_binary ''),(55,'tejasss','$2a$10$eIRXVgtOM5Ypc8ZnsG/ncOK0Wo7IE95Pq1..L542riUdrc/yfu7I2',2,_binary ''),(56,'shreyash','$2a$10$BLNOnJWcefctH0dT7hYvreSxsousTfE/UAMxWJEP28EL/WSWvhQdG',3,_binary ''),(57,'tanmay12','$2a$10$r7JPr47ioJnp1lMx9ySI5uqNUaRWICpeykgaaTJLuIhF2eCvQ5xJC',3,_binary ''),(58,'spandycandy','$2a$10$UL39TUgeEjR2Fg4d7EIVmeHBPHr7x03A14Uq.0nrudDJqP9BRBzKi',3,_binary ''),(59,'ramaksh','$2a$10$S6gtr1a4kgJ5jXvjpbJ9dua9MKzsjXtXWhKlGihLjSI80bP01Zd9K',3,_binary ''),(60,'abhiabhishek','$2a$10$GkKV7jzrPoL3qY.NVROp0OgV6x05.0W0G5nPyLP4grP9tnu4Oso.u',2,_binary ''),(61,'babitaji','$2a$10$rIVTNdvBgK81/LlfcXJqauAwu7j8Ocu8ra3uW7yqGRWTeCirsnnuO',3,_binary ''),(62,'chaudhari','$2a$10$VLwQgV2..SjJL2NgUZcbJumHFk3/WOKofm3/CGcSCgUb2C6eV0Rlm',3,_binary '\0'),(63,'dipaksir','$2a$10$Aj.Vb4xxgWLtf3tjQWRlpOwba4xCpdamFFHo0Ow4Zqi4EjZcyDLdG',3,_binary ''),(64,'emmawatson','$2a$10$WxjrcZ2THN1oLQ5UtuxOdO229QOrWD0BML9tRTA7zZisEbM111r4.',3,_binary ''),(65,'falgooni','$2a$10$tMORYHEzPxPuZvsv.FneKOQan1habj5UW1GCtk2U5oDcNbN138CbS',3,_binary ''),(66,'prathamesh','$2a$10$i92nbWQDuHbTqWpa2qOrVOZJyy9YDS8EUM/mrZ/7vG38AmI4C5/6C',2,_binary '');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_mgr`
--

DROP TABLE IF EXISTS `prj_mgr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prj_mgr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `empid` int DEFAULT NULL,
  `lastdate` date DEFAULT NULL,
  `comments` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empid_idx` (`empid`),
  KEY `pid_idx` (`pid`),
  CONSTRAINT `mpid` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_mgr`
--

LOCK TABLES `prj_mgr` WRITE;
/*!40000 ALTER TABLE `prj_mgr` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_mgr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `techstack` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `deadline` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `empid` int DEFAULT NULL,
  `clientid` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `empid_idx` (`empid`),
  KEY `clientid_idx` (`clientid`),
  CONSTRAINT `clientid` FOREIGN KEY (`clientid`) REFERENCES `clients` (`clientid`),
  CONSTRAINT `empid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (18,'TrackFlow','Microservice Architecture','This is MY first Project','2024-02-25',_binary '\0','Complete it before 22',13,1),(19,'Project Harshal ','Target','Mission','2024-02-25',_binary '','no comments',15,1),(21,'Learning Management System','Microservice Architecture','this is like udamy','2024-02-29',_binary '','Complete it under deadline',29,2),(22,'Parking Plaza','Android, JAVA','Create andorid application using firebase\n','2024-02-29',_binary '','use Kotlin if possible',13,4),(23,'Last Phase','Microservice Architecture','Just For Testing','2024-02-22',_binary '\0','Finding and Fixing Bugs',34,3),(24,'TrackFlow ','Microservice Architecture','This is the project Mangement Sytem','2024-02-27',_binary '','To create a react component',40,3);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_team_after_project_insert` AFTER INSERT ON `projects` FOR EACH ROW BEGIN
    INSERT INTO teams (pid, empid, comments, assigned_date, status, releasedate)
    VALUES (NEW.pid, NEW.empid, 'You are the team lead of this project', CURRENT_DATE, 1, NULL);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'project_manager'),(3,'employee');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasktable`
--

DROP TABLE IF EXISTS `tasktable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasktable` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(45) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `assigneddate` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `empid` int DEFAULT NULL,
  `pid` int DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `_idx` (`empid`),
  KEY `pid_idx` (`pid`),
  CONSTRAINT `fkempid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`),
  CONSTRAINT `fkpid` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasktable`
--

LOCK TABLES `tasktable` WRITE;
/*!40000 ALTER TABLE `tasktable` DISABLE KEYS */;
INSERT INTO `tasktable` VALUES (1,'Example Task','Description of the task','2024-02-20','2024-03-20',_binary '\0',100,14,18),(2,'Tushar Task','Create Restapi using express for designatio and clients and fetch those data using react','2024-02-20','2024-03-27',_binary '',40,22,19),(3,'Tushar Task','Create Restapi using express for designatio and clients and fetch those data using react','2024-02-20','2024-03-27',_binary '',100,22,19),(4,'Backend using Express','asdfdss','2024-02-20','2024-02-29',_binary '',60,22,19),(5,'Backend using Express','asdfdss','2024-02-20','2024-02-29',_binary '',100,22,19),(6,'Backend using Express','do it correctly','2024-02-21','2024-02-29',_binary '',0,30,21),(7,'Backend','do very very good','2024-02-21','2024-03-07',_binary '',0,31,21),(8,'Build Pipeline using Jenkins','use jenkins wisely','2024-02-22','2024-02-22',_binary '\0',0,39,23),(9,'Create UI/UX wireframe','use figma for this','2024-02-22','2024-02-22',_binary '\0',100,35,23),(10,'Create Database','use mysql and if required mongodb','2024-02-22','2024-02-22',_binary '\0',80,37,23),(11,'Help Dipak','Help wisely','2024-02-22','2024-02-22',_binary '\0',0,38,23),(12,'Handle Backend','if need help contact to backend team and use express for it','2024-02-22','2024-02-22',_binary '\0',40,35,23),(13,'Frontend','React Ui will create','2024-02-22','2024-02-27',_binary '',0,27,24),(14,'Backend','dot net','2024-02-22','2024-02-29',_binary '',40,32,24);
/*!40000 ALTER TABLE `tasktable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `teamid` int NOT NULL AUTO_INCREMENT,
  `pid` int NOT NULL,
  `empid` int NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `assigned_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT b'0',
  `releasedate` date DEFAULT NULL,
  PRIMARY KEY (`teamid`),
  KEY `pid_idx` (`pid`),
  KEY `empid_idx` (`empid`),
  KEY `eid_idx` (`empid`),
  CONSTRAINT `eid` FOREIGN KEY (`empid`) REFERENCES `employees` (`empid`),
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (9,18,13,'You are the team lead of this project','2024-02-17',_binary '\0',NULL),(10,18,14,'This is your first project','2024-02-17',_binary '\0',NULL),(11,18,16,'','2024-02-17',_binary '\0',NULL),(12,19,15,'You are the team lead of this project','2024-02-19',_binary '',NULL),(14,19,22,'Your are under adityas team','2024-02-19',_binary '',NULL),(15,19,27,'','2024-02-19',_binary '\0',NULL),(16,19,33,'Fix Bugs','2024-02-20',_binary '\0',NULL),(17,21,29,'You are the team lead of this project','2024-02-21',_binary '',NULL),(18,21,30,'you are under tejas - tester','2024-02-21',_binary '',NULL),(19,21,31,'you are under tejas - tester','2024-02-21',_binary '\0',NULL),(20,21,31,'another role','2024-02-21',_binary '',NULL),(21,22,13,'You are the team lead of this project','2024-02-21',_binary '',NULL),(22,23,34,'You are the team lead of this project','2024-02-22',_binary '\0',NULL),(23,23,35,'Build pipeline ','2024-02-22',_binary '\0',NULL),(24,23,37,'Build pipeline ','2024-02-22',_binary '\0',NULL),(25,23,38,'Build pipeline ','2024-02-22',_binary '\0',NULL),(26,23,39,'Build pipeline ','2024-02-22',_binary '\0',NULL),(27,23,35,'create Ui using React','2024-02-22',_binary '\0',NULL),(28,23,37,'Design Database','2024-02-22',_binary '\0',NULL),(29,23,38,'Help dipak design database','2024-02-22',_binary '\0',NULL),(30,22,38,'','2024-02-22',_binary '\0',NULL),(31,22,38,'','2024-02-22',_binary '',NULL),(32,19,14,'','2024-02-22',_binary '\0',NULL),(33,19,14,'','2024-02-22',_binary '\0',NULL),(34,19,14,'','2024-02-22',_binary '\0',NULL),(35,19,14,'','2024-02-22',_binary '\0',NULL),(36,24,40,'You are the team lead of this project','2024-02-22',_binary '',NULL),(37,24,27,'React ui','2024-02-22',_binary '',NULL),(38,24,32,'Spring Boot','2024-02-22',_binary '',NULL);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'trackflowdb'
--

--
-- Dumping routines for database 'trackflowdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-23 19:51:08
