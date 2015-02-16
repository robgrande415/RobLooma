-- MySQL dump 10.13  Distrib 5.5.40, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: Testing
-- ------------------------------------------------------
-- Server version	5.5.40-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `parentID` int(11) DEFAULT NULL,
  `childID` int(11) DEFAULT NULL,
  `guiName` varchar(128) DEFAULT NULL,
  `fileName` varchar(128) DEFAULT NULL,
  `fileType` varchar(16) DEFAULT NULL,
  `hyperlinkLoc` float DEFAULT NULL,
  `addInfo` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (0,1,'Level 1',NULL,'dir',NULL,NULL),(0,2,'Level 2',NULL,'dir',NULL,NULL),(0,4,'Level 4',NULL,'dir',NULL,NULL),(2,8,'Math',NULL,'dir',NULL,NULL),(2,12,'Nepali',NULL,'dir',NULL,NULL),(-1,0,'root',NULL,'dir',NULL,NULL),(0,13,'Level 3',NULL,'dir',NULL,NULL),(0,14,'Level 5',NULL,'dir',NULL,NULL),(0,15,'Level 6',NULL,'dir',NULL,NULL),(0,16,'Level 7',NULL,'dir',NULL,NULL),(0,17,'Level 8',NULL,'dir',NULL,NULL),(1,18,'English',NULL,'dir',NULL,NULL),(18,19,'Picture','addFile.png','png',NULL,NULL),(18,20,'Movie','testVideo.mp4','mp4',NULL,NULL),(18,22,'Audio','Track01.mp3','mp3',NULL,NULL);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links` (
  `parent` varchar(128) DEFAULT NULL,
  `child` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES ('root','Level 2'),('root','Level 3'),('root','Level 4'),('root','Level 5'),('root','Level 1'),('Level 1','Science'),('Level 1','Math'),('Level 2','Nepali');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-16 19:45:15
