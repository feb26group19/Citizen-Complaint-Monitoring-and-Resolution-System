CREATE DATABASE  IF NOT EXISTS `p19_complaintmonitoring_and_resolutionsystem_populated_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p19_complaintmonitoring_and_resolutionsystem_populated_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: p19_complaintmonitoring_and_resolutionsystem_populated_db
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `dept_id` int NOT NULL,
  `lid` int NOT NULL,
  `add_problem_area` varchar(20) NOT NULL,
  `description` varchar(40) NOT NULL,
  `complaint_date` date DEFAULT NULL,
  `since_when` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `fk_complaint_user` (`uid`),
  KEY `fk_complaint_department` (`dept_id`),
  KEY `fk_complaint_location` (`lid`),
  CONSTRAINT `fk_complaint_department` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `fk_complaint_location` FOREIGN KEY (`lid`) REFERENCES `location` (`lid`),
  CONSTRAINT `fk_complaint_user` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint`
--

LOCK TABLES `complaint` WRITE;
/*!40000 ALTER TABLE `complaint` DISABLE KEYS */;
INSERT INTO `complaint` VALUES (11,2,1,1,'JM Road','Large potholes on main road','2026-07-20','2026-07-15 10:00:00','Pending'),(12,3,2,3,'Hadapsar','Water leakage near society gate','2026-07-21','2026-07-18 09:00:00','In Progress'),(13,2,3,2,'Kothrud','Garbage not collected for three days','2026-07-22','2026-07-19 08:30:00','Resolved'),(14,3,4,4,'Andheri','Street light not working','2026-07-23','2026-07-20 07:00:00','Pending'),(15,2,5,5,'Dadar','Drain overflow during rain','2026-07-24','2026-07-22 11:00:00','In Progress');
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `officer_name` varchar(25) NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Road Maintenance Department','Rajesh Patil',987654321,'roads@cmrs.com'),(2,'Water Supply Department','Amit Deshmukh',987654322,'water@cmrs.com'),(3,'Sanitation Department','Priya Joshi',987654323,'sanitation@cmrs.com'),(4,'Street Light Department','Sneha Kulkarni',987654324,'streetlight@cmrs.com'),(5,'Drainage Department','Vikram Kadam',987654325,'drainage@cmrs.com');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_registration`
--

DROP TABLE IF EXISTS `event_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_registration` (
  `er_id` int NOT NULL AUTO_INCREMENT,
  `eid` int NOT NULL,
  `uid` int NOT NULL,
  `reg_date` date DEFAULT NULL,
  PRIMARY KEY (`er_id`),
  KEY `fk_event_registration_event` (`eid`),
  KEY `fk_event_registration_user` (`uid`),
  CONSTRAINT `fk_event_registration_event` FOREIGN KEY (`eid`) REFERENCES `events` (`eid`),
  CONSTRAINT `fk_event_registration_user` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_registration`
--

LOCK TABLES `event_registration` WRITE;
/*!40000 ALTER TABLE `event_registration` DISABLE KEYS */;
INSERT INTO `event_registration` VALUES (1,1,2,'2026-07-24'),(2,1,3,'2026-07-24');
/*!40000 ALTER TABLE `event_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `ngo_id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `lid` int NOT NULL,
  `area_detail` varchar(40) NOT NULL,
  `event_text` varchar(40) NOT NULL,
  PRIMARY KEY (`eid`),
  KEY `fk_events_ngo` (`ngo_id`),
  KEY `fk_events_location` (`lid`),
  CONSTRAINT `fk_events_location` FOREIGN KEY (`lid`) REFERENCES `location` (`lid`),
  CONSTRAINT `fk_events_ngo` FOREIGN KEY (`ngo_id`) REFERENCES `ngo` (`ngo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'2026-08-01 09:00:00',1,'Shivajinagar Garden','Tree Plantation Drive');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `fid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `textbox` varchar(200) NOT NULL,
  `feedback_date` date DEFAULT NULL,
  `cid` int NOT NULL,
  PRIMARY KEY (`fid`),
  KEY `fk_feedback_user` (`uid`),
  KEY `fk_feedback_complaint` (`cid`),
  CONSTRAINT `fk_feedback_complaint` FOREIGN KEY (`cid`) REFERENCES `complaint` (`cid`),
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (5,2,'Road repair needed','2026-07-24',11),(6,3,'Water issue under process','2026-07-24',12),(7,2,'Garbage issue resolved','2026-07-24',13),(8,2,'Road repair needed','2026-07-24',11),(9,3,'Water issue under process','2026-07-24',12),(10,2,'Garbage issue resolved','2026-07-24',13);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `lid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Shivajinagar, Pune'),(2,'Kothrud, Pune'),(3,'Hadapsar, Pune'),(4,'Andheri, Mumbai'),(5,'Dadar, Mumbai');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngo`
--

DROP TABLE IF EXISTS `ngo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ngo` (
  `ngo_id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `ngo_name` varchar(25) NOT NULL,
  `reg_no` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ngo_id`),
  UNIQUE KEY `reg_no` (`reg_no`),
  KEY `fk_ngo_user` (`uid`),
  CONSTRAINT `fk_ngo_user` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngo`
--

LOCK TABLES `ngo` WRITE;
/*!40000 ALTER TABLE `ngo` DISABLE KEYS */;
INSERT INTO `ngo` VALUES (1,4,'Green Earth NGO','1001','MG Road, Pune','9876543213','green@gmail.com');
/*!40000 ALTER TABLE `ngo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `nid` int NOT NULL AUTO_INCREMENT,
  `dept_id` int NOT NULL,
  `notice_text` varchar(40) NOT NULL,
  `lid` int NOT NULL,
  `area_name` varchar(40) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`nid`),
  KEY `fk_notice_department` (`dept_id`),
  KEY `fk_notice_location` (`lid`),
  CONSTRAINT `fk_notice_department` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `fk_notice_location` FOREIGN KEY (`lid`) REFERENCES `location` (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,2,'Water supply maintenance work',3,'Hadapsar','2026-07-25'),(2,4,'Street light repair work',4,'Andheri','2026-07-26'),(3,1,'Road repair work on JM Road',1,'Shivajinagar','2026-07-27');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(20) NOT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `rname` (`rname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Citizen'),(3,'NGO'),(4,'Officer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `rid` int NOT NULL,
  `fullname` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `password` (`password`),
  KEY `fk_users_role` (`rid`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin123',1,'System Admin','Pune','9876543200','admin@cmrs.com'),(2,'mansha','mansha123',2,'Mansha Singad','Kothrud, Pune','9876543201','mansha@gmail.com'),(3,'yashvi','yashvi123',2,'Yashvini Malviya','Hadapsar, Pune','9876543202','yashvi@gmail.com'),(4,'greenngo','green123',3,'Green Earth NGO','Shivajinagar, Pune','9876543203','greenngo@gmail.com'),(5,'rpatil','road123',4,'Rajesh Patil','Pune','9876543204','rajesh@cmrs.com'),(6,'adeshmukh','water123',4,'Amit Deshmukh','Pune','9876543205','amit@cmrs.com'),(7,'skulkarni','electric123',4,'Sneha Kulkarni','Mumbai','9876543206','sneha@cmrs.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-24 11:03:01
