CREATE DATABASE  IF NOT EXISTS `inzynierka` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inzynierka`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inzynierka
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `account_status`
--

DROP TABLE IF EXISTS `account_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_status` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_status`
--

LOCK TABLES `account_status` WRITE;
/*!40000 ALTER TABLE `account_status` DISABLE KEYS */;
INSERT INTO `account_status` VALUES (1,'Unblocked'),(2,'Blocked');
/*!40000 ALTER TABLE `account_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `county`
--

DROP TABLE IF EXISTS `county`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `county` (
  `id` int NOT NULL,
  `name` varbinary(50) DEFAULT NULL,
  `voivodeship` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `voivodeship` (`voivodeship`),
  CONSTRAINT `county_ibfk_1` FOREIGN KEY (`voivodeship`) REFERENCES `voivodeship` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `county`
--

LOCK TABLES `county` WRITE;
/*!40000 ALTER TABLE `county` DISABLE KEYS */;
INSERT INTO `county` VALUES (1,_binary 'Wrocław',1),(2,_binary 'Jelenia Góra',1),(3,_binary 'Legnica',1),(4,_binary 'Wałbrzych',1),(5,_binary 'bolesławiecki',1),(6,_binary 'dzierżoniowski',1),(7,_binary 'głogowski',1),(8,_binary 'górowski',1),(9,_binary 'jaworski',1),(10,_binary 'jeleniogórski',1),(11,_binary 'kamiennogórski',1),(12,_binary 'kłodzki',1),(13,_binary 'legnicki',1),(14,_binary 'lubański',1),(15,_binary 'lubiński',1),(16,_binary 'lwówecki',1),(17,_binary 'milicki',1),(18,_binary 'oleśnicki',1),(19,_binary 'oławski',1),(20,_binary 'polkowicki',1),(21,_binary 'strzeliński',1),(22,_binary 'średzki',1),(23,_binary 'świdnicki',1),(24,_binary 'trzebnicki',1),(25,_binary 'wałbrzyski',1),(26,_binary 'wołowski',1),(27,_binary 'wrocławski',1),(28,_binary 'ząbkowicki',1),(29,_binary 'zgorzelecki',1),(30,_binary 'złotoryjski',1),(31,_binary 'Bydgoszcz',2),(32,_binary 'Toruń',2),(33,_binary 'Włocławek',2),(34,_binary 'Grudziądz',2),(35,_binary 'aleksandrowski',2),(36,_binary 'brodnicki',2),(37,_binary 'bydgoski',2),(38,_binary 'chełmiński',2),(39,_binary 'golubsko-dobrzyński',2),(40,_binary 'grudziądzki',2),(41,_binary 'inowrocławski',2),(42,_binary 'lipnowski',2),(43,_binary 'mogileński',2),(44,_binary 'nakielski',2),(45,_binary 'radziejowski',2),(46,_binary 'rypiński',2),(47,_binary 'sępoleński',2),(48,_binary 'świecki',2),(49,_binary 'toruński',2),(50,_binary 'tucholski',2),(51,_binary 'wąbrzeski',2),(52,_binary 'włocławski',2),(53,_binary 'żniński',2),(54,_binary 'Lublin',3),(55,_binary 'Biała Podlaska',3),(56,_binary 'Chełm',3),(57,_binary 'Zamość',3),(58,_binary 'bialski',3),(59,_binary 'biłgorajski',3),(60,_binary 'chełmski',3),(61,_binary 'hrubieszowski',3),(62,_binary 'janowski',3),(63,_binary 'krasnostawski',3),(64,_binary 'kraśnicki',3),(65,_binary 'lubartowski',3),(66,_binary 'lubelski',3),(67,_binary 'łęczyński',3),(68,_binary 'łukowski',3),(69,_binary 'opolski',3),(70,_binary 'parczewski',3),(71,_binary 'puławski',3),(72,_binary 'radzyński',3),(73,_binary 'rycki',3),(74,_binary 'świdnicki',3),(75,_binary 'tomaszowski',3),(76,_binary 'włodawski',3),(77,_binary 'zamojski',3),(78,_binary 'Gorzów Wielkopolski',4),(79,_binary 'Zielona Góra',4),(80,_binary 'gorzowski',4),(81,_binary 'krośnieński',4),(82,_binary 'międzyrzecki',4),(83,_binary 'nowosolski',4),(84,_binary 'słubicki',4),(85,_binary 'strzelecko-drezdenecki',4),(86,_binary 'sulęciński',4),(87,_binary 'świebodziński',4),(88,_binary 'wschowski',4),(89,_binary 'zielonogórski',4),(90,_binary 'żagański',4),(91,_binary 'żarski',4),(92,_binary 'Łódź',5),(93,_binary 'Piotrków Trybunalski',5),(94,_binary 'Skierniewice',5),(95,_binary 'bełchatowski',5),(96,_binary 'brzeziński',5),(97,_binary 'kutnowski',5),(98,_binary 'łaski',5),(99,_binary 'łęczycki',5),(100,_binary 'łowicki',5),(101,_binary 'łódzki wschodni',5),(102,_binary 'opoczyński',5),(103,_binary 'pabianicki',5),(104,_binary 'pajęczański',5),(105,_binary 'piotrkowski',5),(106,_binary 'poddębicki',5),(107,_binary 'radomszczański',5),(108,_binary 'rawski',5),(109,_binary 'sieradzki',5),(110,_binary 'skierniewicki',5),(111,_binary 'tomaszowski',5),(112,_binary 'wieluński',5),(113,_binary 'wieruszowski',5),(114,_binary 'zduńskowolski',5),(115,_binary 'zgierski',5),(116,_binary 'Kraków',6),(117,_binary 'Nowy Sącz',6),(118,_binary 'Tarnów',6),(119,_binary 'bocheński',6),(120,_binary 'brzeski',6),(121,_binary 'chrzanowski',6),(122,_binary 'dąbrowski',6),(123,_binary 'gorlicki',6),(124,_binary 'krakowski',6),(125,_binary 'limanowski',6),(126,_binary 'miechowski',6),(127,_binary 'myślenicki',6),(128,_binary 'nowosądecki',6),(129,_binary 'nowotarski',6),(130,_binary 'olkuski',6),(131,_binary 'oświęcimski',6),(132,_binary 'proszowicki',6),(133,_binary 'suski',6),(134,_binary 'tarnowski',6),(135,_binary 'tatrzański',6),(136,_binary 'wadowicki',6),(137,_binary 'wielicki',6),(138,_binary 'Warszawa',7),(139,_binary 'Ostrołęka',7),(140,_binary 'Płock',7),(141,_binary 'Radom',7),(142,_binary 'Siedlce',7),(143,_binary 'białobrzeski',7),(144,_binary 'ciechanowski',7),(145,_binary 'garwoliński',7),(146,_binary 'gostyniński',7),(147,_binary 'grodziski',7),(148,_binary 'grójecki',7),(149,_binary 'kozienicki',7),(150,_binary 'legionowski',7),(151,_binary 'lipski',7),(152,_binary 'łosicki',7),(153,_binary 'makowski',7),(154,_binary 'miński',7),(155,_binary 'mławski',7),(156,_binary 'nowodworski',7),(157,_binary 'ostrołęcki',7),(158,_binary 'ostrowski',7),(159,_binary 'otwocki',7),(160,_binary 'piaseczyński',7),(161,_binary 'płocki',7),(162,_binary 'płoński',7),(163,_binary 'pruszkowski',7),(164,_binary 'przasnyski',7),(165,_binary 'przysuski',7),(166,_binary 'pułtuski',7),(167,_binary 'radomski',7),(168,_binary 'siedlecki',7),(169,_binary 'sierpecki',7),(170,_binary 'sochaczewski',7),(171,_binary 'sokołowski',7),(172,_binary 'szydłowiecki',7),(173,_binary 'warszawski zachodni',7),(174,_binary 'węgrowski',7),(175,_binary 'wołomiński',7),(176,_binary 'wyszkowski',7),(177,_binary 'zwoleński',7),(178,_binary 'żuromiński',7),(179,_binary 'żyrardowski',7),(180,_binary 'Opole',8),(181,_binary 'brzeski',8),(182,_binary 'głubczycki',8),(183,_binary 'kędzierzyńsko-kozielski',8),(184,_binary 'kluczborski',8),(185,_binary 'krapkowicki',8),(186,_binary 'namysłowski',8),(187,_binary 'nyski',8),(188,_binary 'oleski',8),(189,_binary 'opolski',8),(190,_binary 'prudnicki',8),(191,_binary 'strzelecki',8),(192,_binary 'Rzeszów',9),(193,_binary 'Krosno',9),(194,_binary 'Przemyśl',9),(195,_binary 'Tarnobrzeg',9),(196,_binary 'bieszczadzki',9),(197,_binary 'brzozowski',9),(198,_binary 'dębicki',9),(199,_binary 'jarosławski',9),(200,_binary 'jasielski',9),(201,_binary 'kolbuszowski',9),(202,_binary 'krośnieński',9),(203,_binary 'leski',9),(204,_binary 'leżajski',9),(205,_binary 'lubaczowski',9),(206,_binary 'łańcucki',9),(207,_binary 'mielecki',9),(208,_binary 'niżański',9),(209,_binary 'przemyski',9),(210,_binary 'przeworski',9),(211,_binary 'ropczycko-sędziszowski',9),(212,_binary 'rzeszowski',9),(213,_binary 'sanocki',9),(214,_binary 'stalowowolski',9),(215,_binary 'strzyżowski',9),(216,_binary 'tarnobrzeski',9),(217,_binary 'Białystok',10),(218,_binary 'Łomża',10),(219,_binary 'Suwałki',10),(220,_binary 'augustowski',10),(221,_binary 'białostocki',10),(222,_binary 'bielski',10),(223,_binary 'grajewski',10),(224,_binary 'hajnowski',10),(225,_binary 'kolneński',10),(226,_binary 'łomżyński',10),(227,_binary 'moniecki',10),(228,_binary 'sejneński',10),(229,_binary 'siemiatycki',10),(230,_binary 'sokólski',10),(231,_binary 'suwalski',10),(232,_binary 'wysokomazowiecki',10),(233,_binary 'zambrowski',10),(234,_binary 'Gdańsk',11),(235,_binary 'Gdynia',11),(236,_binary 'Słupsk',11),(237,_binary 'Sopot',11),(238,_binary 'bytowski',11),(239,_binary 'chojnicki',11),(240,_binary 'człuchowski',11),(241,_binary 'kartuski',11),(242,_binary 'kościerski',11),(243,_binary 'kwidzyński',11),(244,_binary 'lęborski',11),(245,_binary 'malborski',11),(246,_binary 'nowodworski',11),(247,_binary 'gdański',11),(248,_binary 'pucki',11),(249,_binary 'słupski',11),(250,_binary 'starogardzki',11),(251,_binary 'sztumski',11),(252,_binary 'tczewski',11),(253,_binary 'wejherowski',11),(254,_binary 'Katowice',12),(255,_binary 'Bielsko-Biała',12),(256,_binary 'Bytom',12),(257,_binary 'Chorzów',12),(258,_binary 'Częstochowa',12),(259,_binary 'Dąbrowa Górnicza',12),(260,_binary 'Gliwice',12),(261,_binary 'Jastrzębie-Zdrój',12),(262,_binary 'Jaworzno',12),(263,_binary 'Mysłowice',12),(264,_binary 'Piekary Śląskie',12),(265,_binary 'Ruda Śląska',12),(266,_binary 'Rybnik',12),(267,_binary 'Siemianowice Śląskie',12),(268,_binary 'Sosnowiec',12),(269,_binary 'Świętochłowice',12),(270,_binary 'Tychy',12),(271,_binary 'Zabrze',12),(272,_binary 'Żory',12),(273,_binary 'będziński',12),(274,_binary 'bielski',12),(275,_binary 'bieruńsko-lędziński',12),(276,_binary 'cieszyński',12),(277,_binary 'częstochowski',12),(278,_binary 'gliwicki',12),(279,_binary 'kłobucki',12),(280,_binary 'lubliniecki',12),(281,_binary 'mikołowski',12),(282,_binary 'myszkowski',12),(283,_binary 'pszczyński',12),(284,_binary 'raciborski',12),(285,_binary 'rybnicki',12),(286,_binary 'tarnogórski',12),(287,_binary 'wodzisławski',12),(288,_binary 'zawierciański',12),(289,_binary 'żywiecki',12),(290,_binary 'Kielce',13),(291,_binary 'buski',13),(292,_binary 'jędrzejowski',13),(293,_binary 'kazimierski',13),(294,_binary 'kielecki',13),(295,_binary 'konecki',13),(296,_binary 'opatowski',13),(297,_binary 'ostrowiecki',13),(298,_binary 'pińczowski',13),(299,_binary 'sandomierski',13),(300,_binary 'skarżyski',13),(301,_binary 'starachowicki',13),(302,_binary 'staszowski',13),(303,_binary 'włoszczowski',13),(304,_binary 'Olsztyn',14),(305,_binary 'Elbląg',14),(306,_binary 'bartoszycki',14),(307,_binary 'braniewski',14),(308,_binary 'działdowski',14),(309,_binary 'elbląski',14),(310,_binary 'ełcki',14),(311,_binary 'giżycki',14),(312,_binary 'gołdapski',14),(313,_binary 'iławski',14),(314,_binary 'kętrzyński',14),(315,_binary 'lidzbarski',14),(316,_binary 'mrągowski',14),(317,_binary 'nidzicki',14),(318,_binary 'nowomiejski',14),(319,_binary 'olecki',14),(320,_binary 'olsztyński',14),(321,_binary 'ostródzki',14),(322,_binary 'piski',14),(323,_binary 'szczycieński',14),(324,_binary 'węgorzewski',14),(325,_binary 'Poznań',15),(326,_binary 'Kalisz',15),(327,_binary 'Konin',15),(328,_binary 'Leszno',15),(329,_binary 'chodzieski',15),(330,_binary 'czarnkowsko-trzcianecki',15),(331,_binary 'gnieźnieński',15),(332,_binary 'gostyński',15),(333,_binary 'grodziski',15),(334,_binary 'jarociński',15),(335,_binary 'kaliski',15),(336,_binary 'kępiński',15),(337,_binary 'kolski',15),(338,_binary 'koniński',15),(339,_binary 'kościański',15),(340,_binary 'krotoszyński',15),(341,_binary 'leszczyński',15),(342,_binary 'międzychodzki',15),(343,_binary 'nowotomyski',15),(344,_binary 'obornicki',15),(345,_binary 'ostrowski',15),(346,_binary 'ostrzeszowski',15),(347,_binary 'pilski',15),(348,_binary 'pleszewski',15),(349,_binary 'poznański',15),(350,_binary 'rawicki',15),(351,_binary 'słupecki',15),(352,_binary 'szamotulski',15),(353,_binary 'średzki',15),(354,_binary 'śremski',15),(355,_binary 'turecki',15),(356,_binary 'wągrowiecki',15),(357,_binary 'wolsztyński',15),(358,_binary 'wrzesiński',15),(359,_binary 'złotowski',15),(360,_binary 'Szczecin',16),(361,_binary 'Koszalin',16),(362,_binary 'Świnoujście',16),(363,_binary 'białogardzki',16),(364,_binary 'choszczeński',16),(365,_binary 'drawski',16),(366,_binary 'goleniowski',16),(367,_binary 'gryficki',16),(368,_binary 'gryfiński',16),(369,_binary 'kamieński',16),(370,_binary 'kołobrzeski',16),(371,_binary 'koszaliński',16),(372,_binary 'łobeski',16),(373,_binary 'myśliborski',16),(374,_binary 'policki',16),(375,_binary 'pyrzycki',16),(376,_binary 'sławieński',16),(377,_binary 'stargardzki',16),(378,_binary 'szczecinecki',16),(379,_binary 'świdwiński',16),(380,_binary 'wałecki',16);
/*!40000 ALTER TABLE `county` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help`
--

DROP TABLE IF EXISTS `help`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` int DEFAULT NULL,
  `supporter` int DEFAULT NULL,
  `county` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `side` int DEFAULT NULL,
  `help_status` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `supporter` (`supporter`),
  KEY `county` (`county`),
  KEY `type` (`type`),
  KEY `help_status` (`help_status`),
  CONSTRAINT `help_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`id`),
  CONSTRAINT `help_ibfk_2` FOREIGN KEY (`supporter`) REFERENCES `user` (`id`),
  CONSTRAINT `help_ibfk_3` FOREIGN KEY (`county`) REFERENCES `county` (`id`),
  CONSTRAINT `help_ibfk_4` FOREIGN KEY (`type`) REFERENCES `help_type` (`id`),
  CONSTRAINT `help_ibfk_5` FOREIGN KEY (`help_status`) REFERENCES `help_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help`
--

LOCK TABLES `help` WRITE;
/*!40000 ALTER TABLE `help` DISABLE KEYS */;
INSERT INTO `help` VALUES (1,1,1,1,1,'Przyjmę makaron.','https://i.imgur.com/vU2ajjQ.jpg',2,1),(2,2,2,2,4,'Potrzebuję leków przeciwbólowych.','https://i.imgur.com/yaXNpE6.jpg',2,1),(3,4,3,3,2,'Potrzebuję zakwaterowania dla 1 osoby.','https://i.imgur.com/yV5OQht.jpg',2,2),(19,1,1,121,4,'Potrzebuję leków.','\"photo.jpg\"',2,2),(20,1,1,198,3,'Potrzebuję ubrań.','\"photo.jpg\"',2,2),(21,1,1,186,3,'Potrzebuję ubrań.','\"photo.jpg\"',2,3),(22,1,1,117,2,'Potrzebuję zakwaterowania dla 1 osoby.','\"photo.jpg\"',2,1),(23,1,1,117,2,'Potrzebuję zakwaterowania dla 1 osoby.','\"photo.jpg\"',2,4),(24,2,1,80,4,'Pomogę. Dam leki.','\"photo.jpg\"',1,3),(25,1,1,98,4,'Potrzebuję dużo leków.','\"photo.jpg\"',2,3),(26,1,1,98,4,'Potrzebuję dużo leków.','\"photo.jpg\"',2,2),(27,1,1,61,2,'Potrzebuję zakwaterowania dla 3 osób.','\"photo.jpg\"',2,2),(28,1,1,61,2,'Potrzebuję zakwaterowania dla 3 osób.','\"photo.jpg\"',2,3),(29,1,NULL,184,3,'Potrzebuję spodni.','\"photo.jpg\"',2,3),(30,1,NULL,34,3,'Ubranie. Obok zdjęcie.','\"asd\"',1,2),(31,1,NULL,120,4,'Oddam leki takie jak na zdjęciu.','jpg.jpg',1,2),(32,1,NULL,1,1,'\"OpisOpis\"','\"pp.pp\"',1,2),(33,1,NULL,1,1,'\"OpisOpis\"','\"pp.pp\"',1,2),(34,1,NULL,1,1,'\"OpisOpis\"','\"pp.pp\"',1,2),(35,1,NULL,187,4,'Leki.','jpg.jpg',1,2),(36,1,NULL,187,4,'Leki.','jpg.jpg',1,3),(37,1,NULL,187,4,'Leki.','jpg.jpg',1,4),(38,1,NULL,187,4,'Leki.','jpg.jpg',1,2),(39,1,NULL,187,4,'Leki.','jpg.jpg',1,2),(40,1,NULL,103,4,'ASd.','undefined',1,4),(41,1,NULL,313,3,'Potrzebuję ubrań.','\"photo.jpg\"',2,2);
/*!40000 ALTER TABLE `help` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_status`
--

DROP TABLE IF EXISTS `help_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_status` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_status`
--

LOCK TABLES `help_status` WRITE;
/*!40000 ALTER TABLE `help_status` DISABLE KEYS */;
INSERT INTO `help_status` VALUES (1,'New'),(2,'In progress'),(3,'Completed'),(4,'Uncompleted');
/*!40000 ALTER TABLE `help_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_type`
--

DROP TABLE IF EXISTS `help_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_type` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `namePL` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_type`
--

LOCK TABLES `help_type` WRITE;
/*!40000 ALTER TABLE `help_type` DISABLE KEYS */;
INSERT INTO `help_type` VALUES (1,'Food','Jedzenie'),(2,'Accommodation','Zakwaterowanie'),(3,'Clothes','Ubrania'),(4,'Medicine','Leki'),(5,'Other','Inne');
/*!40000 ALTER TABLE `help_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Refugee'),(2,'Volunteer'),(3,'Administrator');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `identity_number` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `accepted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role` (`role`),
  KEY `user_ibfk_2` (`status`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`status`) REFERENCES `account_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Jan','Kowalski','jkowalski','password123','jankowalski@mail.com',1,'12345',1,1),(2,'Adam','Nowak','adamn','password456','adamnowak@o.pl',1,'67890',1,1),(3,'Alicja','Kowal','alakow','password789','alickakowalska@mail.pl',1,'54321',1,0),(4,'Tomasz','Kowalczyk','tkowalczyk','password000','tomaszkowalczyk@mail.pl',1,'123132',1,0),(5,'\"Klaudiusz\"','\"Wierzbowski\"','\"kwierzbowski\"','\"password123\"','\"email@email.email\"',1,'1123123',1,1),(6,'\"Klaudiusz1\"','','\"kwierzbowski\"','\"password123\"','\"email@email.email\"',1,'1123123',1,1),(7,'Klaudiusz2','Wierzbowski2','\"kwierzbowski\"','\"password123\"','\"email@email.email\"',1,'1123123',1,1),(8,'Klaudiusz2','Wierzbowski2','\"kwierzbowski\"','\"password123\"','\"email@email.email\"',1,'1123123',1,1),(9,'undefined','Wierzbowski2','\"kwierzbowski\"','\"password123\"','\"email@email.email\"',1,'1123123',1,1),(10,'Kazimierz','Wierzbowski2','kwierzbowski','password123','email@email.email',1,'1123123',1,1),(11,'Kazimierz','Wierzbowski2','kwierzbowski','password123','email@email.email',1,'1123123',1,1),(12,'','Wierzbowski2','kwierzbowski','password123','email@email.email',1,'1123123',1,1),(13,'Adam','Wierzbowski2','kwierzbowski','password123','email@email.email',1,'1123123',1,1),(14,'Adam','Kowalski','adamkowalski','adamkowalski123','adam@kowalski.pl',1,'1123123',1,1),(15,'Adam','Kowalski','adamkowalski','adamkowalski123','adam@kowalski.pl',1,'1123123',1,1),(16,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(17,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(18,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(19,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(20,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(21,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(22,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(23,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(24,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(25,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(26,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(27,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'123',1,1),(28,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'1',1,1),(29,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'1',1,1),(30,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(31,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(32,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(33,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(34,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(35,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(36,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(37,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(38,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(39,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(40,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(41,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(42,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(43,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(44,'Adam','Kowalski','adamkowalski1','adamkowalski123','ada1m@kowalski.pl',1,'XYZ123123',1,1),(45,'Andrzej','Nowak','andrzejnowak','anowak123','a@nowak.pl',1,'XYZ123123',1,1),(46,'','','','','',1,'',1,1),(47,'','','','','',1,'',1,1),(48,'123','123123','123','123','123',1,'123',1,1),(49,'123','123123','123','123','123@123.pl',1,'123',1,1),(50,'1','1','1','1','1',1,'1',1,1),(51,'litery','litery','litery','litery','litery@litery.pl',1,'ABC312312',1,1),(52,'litery','litery','litery','litery','litery@litery.pl',1,'',1,1),(53,'abc','abc','abc','abcabc','abc@abc.pl',1,'',1,1),(54,'abc','abc','abc','abcabc','abc@abc.pl',1,'',1,1),(55,'abc','abc','abc','abcabc','abc@abc.pl',1,'',1,1),(56,'Jan','Kowalski','jjkowalski','j123123','j@kowalski.eu',1,'XYZ123123',1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voivodeship`
--

DROP TABLE IF EXISTS `voivodeship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voivodeship` (
  `id` int NOT NULL,
  `name` varbinary(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voivodeship`
--

LOCK TABLES `voivodeship` WRITE;
/*!40000 ALTER TABLE `voivodeship` DISABLE KEYS */;
INSERT INTO `voivodeship` VALUES (1,_binary 'Dolnośląskie'),(2,_binary 'Kujawsko-Pomorskie'),(3,_binary 'Lubelskie'),(4,_binary 'Lubuskie'),(5,_binary 'Łódzkie'),(6,_binary 'Małopolskie'),(7,_binary 'Mazowieckie'),(8,_binary 'Opolskie'),(9,_binary 'Podkarpackie'),(10,_binary 'Podlaskie'),(11,_binary 'Pomorskie'),(12,_binary 'Śląskie'),(13,_binary 'Świętokrzyskie'),(14,_binary 'Warmińsko-Mazurskie'),(15,_binary 'Wielkopolskie'),(16,_binary 'Zachodniopomorskie');
/*!40000 ALTER TABLE `voivodeship` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24  0:45:47
