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
  `city` varbinary(50) DEFAULT NULL,
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
INSERT INTO `county` VALUES (1,_binary 'Wrocław',_binary 'Wrocław',1),(2,_binary 'Jelenia Góra',_binary 'Jelenia Góra',1),(3,_binary 'Legnica',_binary 'Legnica',1),(4,_binary 'Wałbrzych',_binary 'Wałbrzych',1),(5,_binary 'bolesławiecki',_binary 'Bolesławiec',1),(6,_binary 'dzierżoniowski',_binary 'Dzierżoniów',1),(7,_binary 'głogowski',_binary 'Głogów',1),(8,_binary 'górowski',_binary 'Góra',1),(9,_binary 'jaworski',_binary 'Jawor',1),(10,_binary 'jeleniogórski',_binary 'Jelenia Góra',1),(11,_binary 'kamiennogórski',_binary 'Kamienna Góra',1),(12,_binary 'kłodzki',_binary 'Kłodzko',1),(13,_binary 'legnicki',_binary 'Legnica',1),(14,_binary 'lubański',_binary 'Lubań',1),(15,_binary 'lubiński',_binary 'Lubin',1),(16,_binary 'lwówecki',_binary 'Lwówek Śląski',1),(17,_binary 'milicki',_binary 'Milicz',1),(18,_binary 'oleśnicki',_binary 'Oleśnica',1),(19,_binary 'oławski',_binary 'Oława',1),(20,_binary 'polkowicki',_binary 'Polkowice',1),(21,_binary 'strzeliński',_binary 'Strzelin',1),(22,_binary 'średzki',_binary 'Środa Śląska',1),(23,_binary 'świdnicki',_binary 'Świdnica',1),(24,_binary 'trzebnicki',_binary 'Trzebnica',1),(25,_binary 'wałbrzyski',_binary 'Wałbrzych',1),(26,_binary 'wołowski',_binary 'Wołów',1),(27,_binary 'wrocławski',_binary 'Wrocław',1),(28,_binary 'ząbkowicki',_binary 'Ząbkowice Śląskie',1),(29,_binary 'zgorzelecki',_binary 'Zgorzelec',1),(30,_binary 'złotoryjski',_binary 'Złotoryja',1),(31,_binary 'Bydgoszcz',_binary 'Bydgoszcz',2),(32,_binary 'Toruń',_binary 'Toruń',2),(33,_binary 'Włocławek',_binary 'Włocławek',2),(34,_binary 'Grudziądz',_binary 'Grudziądz',2),(35,_binary 'aleksandrowski',_binary 'Aleksandrów Kujawski',2),(36,_binary 'brodnicki',_binary 'Brodnica',2),(37,_binary 'bydgoski',_binary 'Bydgoszcz',2),(38,_binary 'chełmiński',_binary 'Chełmno',2),(39,_binary 'golubsko-dobrzyński',_binary 'Golub-Dobrzyń',2),(40,_binary 'grudziądzki',_binary 'Grudziądz',2),(41,_binary 'inowrocławski',_binary 'Inowrocław',2),(42,_binary 'lipnowski',_binary 'Lipno',2),(43,_binary 'mogileński',_binary 'Mogilno',2),(44,_binary 'nakielski',_binary 'Nakło nad Notecią',2),(45,_binary 'radziejowski',_binary 'Radziejów',2),(46,_binary 'rypiński',_binary 'Rypin',2),(47,_binary 'sępoleński',_binary 'Sępólno Krajeńskie',2),(48,_binary 'świecki',_binary 'Świecie',2),(49,_binary 'toruński',_binary 'Toruń',2),(50,_binary 'tucholski',_binary 'Tuchola',2),(51,_binary 'wąbrzeski',_binary 'Wąbrzeźno',2),(52,_binary 'włocławski',_binary 'Włocławek',2),(53,_binary 'żniński',_binary 'Żnin',2),(54,_binary 'Lublin',_binary 'Lublin',3),(55,_binary 'Biała Podlaska',_binary 'Biała Podlaska',3),(56,_binary 'Chełm',_binary 'Chełm',3),(57,_binary 'Zamość',_binary 'Zamość',3),(58,_binary 'bialski',_binary 'Biała Podlaska',3),(59,_binary 'biłgorajski',_binary 'Biłgoraj',3),(60,_binary 'chełmski',_binary 'Chełm',3),(61,_binary 'hrubieszowski',_binary 'Hrubieszów',3),(62,_binary 'janowski',_binary 'Janów Lubelski',3),(63,_binary 'krasnostawski',_binary 'Krasnystaw',3),(64,_binary 'kraśnicki',_binary 'Kraśnik',3),(65,_binary 'lubartowski',_binary 'Lubartów',3),(66,_binary 'lubelski',_binary 'Lublin',3),(67,_binary 'łęczyński',_binary 'Łęczna',3),(68,_binary 'łukowski',_binary 'Łuków',3),(69,_binary 'opolski',_binary 'Opole Lubelskie',3),(70,_binary 'parczewski',_binary 'Parczew',3),(71,_binary 'puławski',_binary 'Puławy',3),(72,_binary 'radzyński',_binary 'Radzyń Podlaski',3),(73,_binary 'rycki',_binary 'Ryki',3),(74,_binary 'świdnicki',_binary 'Świdnik',3),(75,_binary 'tomaszowski',_binary 'Tomaszów Lubelski',3),(76,_binary 'włodawski',_binary 'Włodawa',3),(77,_binary 'zamojski',_binary 'Zamość',3),(78,_binary 'Gorzów Wielkopolski',_binary 'Gorzów Wielkopolski',4),(79,_binary 'Zielona Góra',_binary 'Zielona Góra',4),(80,_binary 'gorzowski',_binary 'Gorzów Wielkopolski',4),(81,_binary 'krośnieński',_binary 'Krosno Odrzańskie',4),(82,_binary 'międzyrzecki',_binary 'Międzyrzecz',4),(83,_binary 'nowosolski',_binary 'Nowa Sól',4),(84,_binary 'słubicki',_binary 'Słubice',4),(85,_binary 'strzelecko-drezdenecki',_binary 'Strzelce Krajeńskie',4),(86,_binary 'sulęciński',_binary 'Sulęcin',4),(87,_binary 'świebodziński',_binary 'Świebodzin',4),(88,_binary 'wschowski',_binary 'Wschowa',4),(89,_binary 'zielonogórski',_binary 'Zielona Góra',4),(90,_binary 'żagański',_binary 'Żagań',4),(91,_binary 'żarski',_binary 'Żary',4),(92,_binary 'Łódź',_binary 'Łódź',5),(93,_binary 'Piotrków Trybunalski',_binary 'Piotrków Trybunalski',5),(94,_binary 'Skierniewice',_binary 'Skierniewice',5),(95,_binary 'bełchatowski',_binary 'Bełchatów',5),(96,_binary 'brzeziński',_binary 'Brzeziny',5),(97,_binary 'kutnowski',_binary 'Kutno',5),(98,_binary 'łaski',_binary 'Łask',5),(99,_binary 'łęczycki',_binary 'Łęczyca',5),(100,_binary 'łowicki',_binary 'Łowicz',5),(101,_binary 'łódzki wschodni',_binary 'Łódź',5),(102,_binary 'opoczyński',_binary 'Opoczno',5),(103,_binary 'pabianicki',_binary 'Pabianice',5),(104,_binary 'pajęczański',_binary 'Pajęczno',5),(105,_binary 'piotrkowski',_binary 'Piotrków Trybunalski',5),(106,_binary 'poddębicki',_binary 'Poddębice',5),(107,_binary 'radomszczański',_binary 'Radomsko',5),(108,_binary 'rawski',_binary 'Rawa Mazowiecka',5),(109,_binary 'sieradzki',_binary 'Sieradz',5),(110,_binary 'skierniewicki',_binary 'Skierniewice',5),(111,_binary 'tomaszowski',_binary 'Tomaszów Mazowiecki',5),(112,_binary 'wieluński',_binary 'Wieluń',5),(113,_binary 'wieruszowski',_binary 'Wieruszów',5),(114,_binary 'zduńskowolski',_binary 'Zduńska Wola',5),(115,_binary 'zgierski',_binary 'Zgierz',5),(116,_binary 'Kraków',_binary 'Kraków',6),(117,_binary 'Nowy Sącz',_binary 'Nowy Sącz',6),(118,_binary 'Tarnów',_binary 'Tarnów',6),(119,_binary 'bocheński',_binary 'Bochnia',6),(120,_binary 'brzeski',_binary 'Brzesko',6),(121,_binary 'chrzanowski',_binary 'Chrzanów',6),(122,_binary 'dąbrowski',_binary 'Dąbrowa Tarnowska',6),(123,_binary 'gorlicki',_binary 'Gorlice',6),(124,_binary 'krakowski',_binary 'Kraków',6),(125,_binary 'limanowski',_binary 'Limanowa',6),(126,_binary 'miechowski',_binary 'Miechów',6),(127,_binary 'myślenicki',_binary 'Myślenice',6),(128,_binary 'nowosądecki',_binary 'Nowy Sącz',6),(129,_binary 'nowotarski',_binary 'Nowy Targ',6),(130,_binary 'olkuski',_binary 'Olkusz',6),(131,_binary 'oświęcimski',_binary 'Oświęcim',6),(132,_binary 'proszowicki',_binary 'Proszowice',6),(133,_binary 'suski',_binary 'Sucha Beskidzka',6),(134,_binary 'tarnowski',_binary 'Tarnów',6),(135,_binary 'tatrzański',_binary 'Zakopane',6),(136,_binary 'wadowicki',_binary 'Wadowice',6),(137,_binary 'wielicki',_binary 'Wieliczka',6),(138,_binary 'Warszawa',_binary 'Warszawa',7),(139,_binary 'Ostrołęka',_binary 'Ostrołęka',7),(140,_binary 'Płock',_binary 'Płock',7),(141,_binary 'Radom',_binary 'Radom',7),(142,_binary 'Siedlce',_binary 'Siedlce',7),(143,_binary 'białobrzeski',_binary 'Białobrzegi',7),(144,_binary 'ciechanowski',_binary 'Ciechanów',7),(145,_binary 'garwoliński',_binary 'Garwolin',7),(146,_binary 'gostyniński',_binary 'Gostynin',7),(147,_binary 'grodziski',_binary 'Grodzisk Mazowiecki',7),(148,_binary 'grójecki',_binary 'Grójec',7),(149,_binary 'kozienicki',_binary 'Kozienice',7),(150,_binary 'legionowski',_binary 'Legionowo',7),(151,_binary 'lipski',_binary 'Lipsko',7),(152,_binary 'łosicki',_binary 'Łosice',7),(153,_binary 'makowski',_binary 'Maków Mazowiecki',7),(154,_binary 'miński',_binary 'Mińsk Mazowiecki',7),(155,_binary 'mławski',_binary 'Mława',7),(156,_binary 'nowodworski',_binary 'Nowy Dwór Mazowiecki',7),(157,_binary 'ostrołęcki',_binary 'Ostrołęka',7),(158,_binary 'ostrowski',_binary 'Ostrów Mazowiecka',7),(159,_binary 'otwocki',_binary 'Otwock',7),(160,_binary 'piaseczyński',_binary 'Piaseczno',7),(161,_binary 'płocki',_binary 'Płock',7),(162,_binary 'płoński',_binary 'Płońsk',7),(163,_binary 'pruszkowski',_binary 'Pruszków',7),(164,_binary 'przasnyski',_binary 'Przasnysz',7),(165,_binary 'przysuski',_binary 'Przysucha',7),(166,_binary 'pułtuski',_binary 'Pułtusk',7),(167,_binary 'radomski',_binary 'Radom',7),(168,_binary 'siedlecki',_binary 'Siedlce',7),(169,_binary 'sierpecki',_binary 'Sierpc',7),(170,_binary 'sochaczewski',_binary 'Sochaczew',7),(171,_binary 'sokołowski',_binary 'Sokołów Podlaski',7),(172,_binary 'szydłowiecki',_binary 'Szydłowiec',7),(173,_binary 'warszawski zachodni',_binary 'Ożarów Mazowiecki',7),(174,_binary 'węgrowski',_binary 'Węgrów',7),(175,_binary 'wołomiński',_binary 'Wołomin',7),(176,_binary 'wyszkowski',_binary 'Wyszków',7),(177,_binary 'zwoleński',_binary 'Zwoleń',7),(178,_binary 'żuromiński',_binary 'Żuromin',7),(179,_binary 'żyrardowski',_binary 'Żyrardów',7),(180,_binary 'Opole',_binary 'Opole',8),(181,_binary 'brzeski',_binary 'Brzeg',8),(182,_binary 'głubczycki',_binary 'Głubczyce',8),(183,_binary 'kędzierzyńsko-kozielski',_binary 'Kędzierzyn-Koźle',8),(184,_binary 'kluczborski',_binary 'Kluczbork',8),(185,_binary 'krapkowicki',_binary 'Krapkowice',8),(186,_binary 'namysłowski',_binary 'Namysłów',8),(187,_binary 'nyski',_binary 'Nysa',8),(188,_binary 'oleski',_binary 'Olesno',8),(189,_binary 'opolski',_binary 'Opole',8),(190,_binary 'prudnicki',_binary 'Prudnik',8),(191,_binary 'strzelecki',_binary 'Strzelce Opolskie',8),(192,_binary 'Rzeszów',_binary 'Rzeszów',9),(193,_binary 'Krosno',_binary 'Krosno',9),(194,_binary 'Przemyśl',_binary 'Przemyśl',9),(195,_binary 'Tarnobrzeg',_binary 'Tarnobrzeg',9),(196,_binary 'bieszczadzki',_binary 'Ustrzyki Dolne',9),(197,_binary 'brzozowski',_binary 'Brzozów',9),(198,_binary 'dębicki',_binary 'Dębica',9),(199,_binary 'jarosławski',_binary 'Jarosław',9),(200,_binary 'jasielski',_binary 'Jasło',9),(201,_binary 'kolbuszowski',_binary 'Kolbuszowa',9),(202,_binary 'krośnieński',_binary 'Krosno',9),(203,_binary 'leski',_binary 'Lesko',9),(204,_binary 'leżajski',_binary 'Leżajsk',9),(205,_binary 'lubaczowski',_binary 'Lubaczów',9),(206,_binary 'łańcucki',_binary 'Łańcut',9),(207,_binary 'mielecki',_binary 'Mielec',9),(208,_binary 'niżański',_binary 'Nisko',9),(209,_binary 'przemyski',_binary 'Przemyśl',9),(210,_binary 'przeworski',_binary 'Przeworsk',9),(211,_binary 'ropczycko-sędziszowski',_binary 'Ropczyce',9),(212,_binary 'rzeszowski',_binary 'Rzeszów',9),(213,_binary 'sanocki',_binary 'Sanok',9),(214,_binary 'stalowowolski',_binary 'Stalowa Wola',9),(215,_binary 'strzyżowski',_binary 'Strzyżów',9),(216,_binary 'tarnobrzeski',_binary 'Tarnobrzeg',9),(217,_binary 'Białystok',_binary 'Białystok',10),(218,_binary 'Łomża',_binary 'Łomża',10),(219,_binary 'Suwałki',_binary 'Suwałki',10),(220,_binary 'augustowski',_binary 'Augustów',10),(221,_binary 'białostocki',_binary 'Białystok',10),(222,_binary 'bielski',_binary 'Bielsk Podlaski',10),(223,_binary 'grajewski',_binary 'Grajewo',10),(224,_binary 'hajnowski',_binary 'Hajnówka',10),(225,_binary 'kolneński',_binary 'Kolno',10),(226,_binary 'łomżyński',_binary 'Łomża',10),(227,_binary 'moniecki',_binary 'Mońki',10),(228,_binary 'sejneński',_binary 'Sejny',10),(229,_binary 'siemiatycki',_binary 'Siemiatycze',10),(230,_binary 'sokólski',_binary 'Sokółka',10),(231,_binary 'suwalski',_binary 'Suwałki',10),(232,_binary 'wysokomazowiecki',_binary 'Wysokie Mazowieckie',10),(233,_binary 'zambrowski',_binary 'Zambrów',10),(234,_binary 'Gdańsk',_binary 'Gdańsk',11),(235,_binary 'Gdynia',_binary 'Gdynia',11),(236,_binary 'Słupsk',_binary 'Słupsk',11),(237,_binary 'Sopot',_binary 'Sopot',11),(238,_binary 'bytowski',_binary 'Bytów',11),(239,_binary 'chojnicki',_binary 'Chojnice',11),(240,_binary 'człuchowski',_binary 'Człuchów',11),(241,_binary 'kartuski',_binary 'Kartuzy',11),(242,_binary 'kościerski',_binary 'Kościerzyna',11),(243,_binary 'kwidzyński',_binary 'Kwidzyn',11),(244,_binary 'lęborski',_binary 'Lębork',11),(245,_binary 'malborski',_binary 'Malbork',11),(246,_binary 'nowodworski',_binary 'Nowy Dwór',11),(247,_binary 'gdański',_binary 'Pruszcz Gdański',11),(248,_binary 'pucki',_binary 'Puck',11),(249,_binary 'słupski',_binary 'Słupsk',11),(250,_binary 'starogardzki',_binary 'Starogard Gdański',11),(251,_binary 'sztumski',_binary 'Sztum',11),(252,_binary 'tczewski',_binary 'Tczew',11),(253,_binary 'wejherowski',_binary 'Wejherowo',11),(254,_binary 'Katowice',_binary 'Katowice',12),(255,_binary 'Bielsko-Biała',_binary 'Bielsko-Biała',12),(256,_binary 'Bytom',_binary 'Bytom',12),(257,_binary 'Chorzów',_binary 'Chorzów',12),(258,_binary 'Częstochowa',_binary 'Częstochowa',12),(259,_binary 'Dąbrowa Górnicza',_binary 'Dąbrowa Górnicza',12),(260,_binary 'Gliwice',_binary 'Gliwice',12),(261,_binary 'Jastrzębie-Zdrój',_binary 'Jastrzębie-Zdrój',12),(262,_binary 'Jaworzno',_binary 'Jaworzno',12),(263,_binary 'Mysłowice',_binary 'Mysłowice',12),(264,_binary 'Piekary Śląskie',_binary 'Piekary Śląskie',12),(265,_binary 'Ruda Śląska',_binary 'Ruda Śląska',12),(266,_binary 'Rybnik',_binary 'Rybnik',12),(267,_binary 'Siemianowice Śląskie',_binary 'Siemianowice Śląskie',12),(268,_binary 'Sosnowiec',_binary 'Sosnowiec',12),(269,_binary 'Świętochłowice',_binary 'Świętochłowice',12),(270,_binary 'Tychy',_binary 'Tychy',12),(271,_binary 'Zabrze',_binary 'Zabrze',12),(272,_binary 'Żory',_binary 'Żory',12),(273,_binary 'będziński',_binary 'Będzin',12),(274,_binary 'bielski',_binary 'Bielsko-Biała',12),(275,_binary 'bieruńsko-lędziński',_binary 'Bieruń',12),(276,_binary 'cieszyński',_binary 'Cieszyn',12),(277,_binary 'częstochowski',_binary 'Częstochowa',12),(278,_binary 'gliwicki',_binary 'Gliwice',12),(279,_binary 'kłobucki',_binary 'Kłobuck',12),(280,_binary 'lubliniecki',_binary 'Lubliniec',12),(281,_binary 'mikołowski',_binary 'Mikołów',12),(282,_binary 'myszkowski',_binary 'Myszków',12),(283,_binary 'pszczyński',_binary 'Pszczyna',12),(284,_binary 'raciborski',_binary 'Racibórz',12),(285,_binary 'rybnicki',_binary 'Rybnik',12),(286,_binary 'tarnogórski',_binary 'Tarnowskie Góry',12),(287,_binary 'wodzisławski',_binary 'Wodzisław Śląski',12),(288,_binary 'zawierciański',_binary 'Zawiercie',12),(289,_binary 'żywiecki',_binary 'Żywiec',12),(290,_binary 'Kielce',_binary 'Kielce',13),(291,_binary 'buski',_binary 'Busko-Zdrój',13),(292,_binary 'jędrzejowski',_binary 'Jędrzejów',13),(293,_binary 'kazimierski',_binary 'Kazimierza Wielka',13),(294,_binary 'kielecki',_binary 'Kielce',13),(295,_binary 'konecki',_binary 'Końskie',13),(296,_binary 'opatowski',_binary 'Opatów',13),(297,_binary 'ostrowiecki',_binary 'Ostrowiec Świętokrzyski',13),(298,_binary 'pińczowski',_binary 'Pińczów',13),(299,_binary 'sandomierski',_binary 'Sandomierz',13),(300,_binary 'skarżyski',_binary 'Skarżysko-Kamienna',13),(301,_binary 'starachowicki',_binary 'Starachowice',13),(302,_binary 'staszowski',_binary 'Staszów',13),(303,_binary 'włoszczowski',_binary 'Włoszczowa',13),(304,_binary 'Olsztyn',_binary 'Olsztyn',14),(305,_binary 'Elbląg',_binary 'Elbląg',14),(306,_binary 'bartoszycki',_binary 'Bartoszyce',14),(307,_binary 'braniewski',_binary 'Braniewo',14),(308,_binary 'działdowski',_binary 'Działdowo',14),(309,_binary 'elbląski',_binary 'Elbląg',14),(310,_binary 'ełcki',_binary 'Ełk',14),(311,_binary 'giżycki',_binary 'Giżycko',14),(312,_binary 'gołdapski',_binary 'Gołdap',14),(313,_binary 'iławski',_binary 'Iława',14),(314,_binary 'kętrzyński',_binary 'Kętrzyn',14),(315,_binary 'lidzbarski',_binary 'Lidzbark Warmiński',14),(316,_binary 'mrągowski',_binary 'Mrągowo',14),(317,_binary 'nidzicki',_binary 'Nidzica',14),(318,_binary 'nowomiejski',_binary 'Nowe Miasto',14),(319,_binary 'olecki',_binary 'Olecko',14),(320,_binary 'olsztyński',_binary 'Olsztyn',14),(321,_binary 'ostródzki',_binary 'Ostróda',14),(322,_binary 'piski',_binary 'Pisz',14),(323,_binary 'szczycieński',_binary 'Szczytno',14),(324,_binary 'węgorzewski',_binary 'Węgorzewo',14),(325,_binary 'Poznań',_binary 'Poznań',15),(326,_binary 'Kalisz',_binary 'Kalisz',15),(327,_binary 'Konin',_binary 'Konin',15),(328,_binary 'Leszno',_binary 'Leszno',15),(329,_binary 'chodzieski',_binary 'Chodzież',15),(330,_binary 'czarnkowsko-trzcianecki',_binary 'Czarnków',15),(331,_binary 'gnieźnieński',_binary 'Gniezno',15),(332,_binary 'gostyński',_binary 'Gostyń',15),(333,_binary 'grodziski',_binary 'Grodzisk Wielkopolski',15),(334,_binary 'jarociński',_binary 'Jarocin',15),(335,_binary 'kaliski',_binary 'Kalisz',15),(336,_binary 'kępiński',_binary 'Kępno',15),(337,_binary 'kolski',_binary 'Koło',15),(338,_binary 'koniński',_binary 'Konin',15),(339,_binary 'kościański',_binary 'Kościan',15),(340,_binary 'krotoszyński',_binary 'Krotoszyn',15),(341,_binary 'leszczyński',_binary 'Leszno',15),(342,_binary 'międzychodzki',_binary 'Międzychód',15),(343,_binary 'nowotomyski',_binary 'Nowy Tomyśl',15),(344,_binary 'obornicki',_binary 'Oborniki',15),(345,_binary 'ostrowski',_binary 'Ostrów Wielkopolski',15),(346,_binary 'ostrzeszowski',_binary 'Ostrzeszów',15),(347,_binary 'pilski',_binary 'Piła',15),(348,_binary 'pleszewski',_binary 'Pleszew',15),(349,_binary 'poznański',_binary 'Poznań',15),(350,_binary 'rawicki',_binary 'Rawicz',15),(351,_binary 'słupecki',_binary 'Słupca',15),(352,_binary 'szamotulski',_binary 'Szamotuły',15),(353,_binary 'średzki',_binary 'Środa Wielkopolska',15),(354,_binary 'śremski',_binary 'Śrem',15),(355,_binary 'turecki',_binary 'Turek',15),(356,_binary 'wągrowiecki',_binary 'Wągrowiec',15),(357,_binary 'wolsztyński',_binary 'Wolsztyn',15),(358,_binary 'wrzesiński',_binary 'Września',15),(359,_binary 'złotowski',_binary 'Złotów',15),(360,_binary 'Szczecin',_binary 'Szczecin',16),(361,_binary 'Koszalin',_binary 'Koszalin',16),(362,_binary 'Świnoujście',_binary 'Świnoujście',16),(363,_binary 'białogardzki',_binary 'Białogard',16),(364,_binary 'choszczeński',_binary 'Choszczno',16),(365,_binary 'drawski',_binary 'Drawsko Pomorskie',16),(366,_binary 'goleniowski',_binary 'Goleniów',16),(367,_binary 'gryficki',_binary 'Gryfice',16),(368,_binary 'gryfiński',_binary 'Gryfino',16),(369,_binary 'kamieński',_binary 'Kamień Pomorski',16),(370,_binary 'kołobrzeski',_binary 'Kołobrzeg',16),(371,_binary 'koszaliński',_binary 'Koszalin',16),(372,_binary 'łobeski',_binary 'Łobez',16),(373,_binary 'myśliborski',_binary 'Myślibórz',16),(374,_binary 'policki',_binary 'Police',16),(375,_binary 'pyrzycki',_binary 'Pyrzyce',16),(376,_binary 'sławieński',_binary 'Sławno',16),(377,_binary 'stargardzki',_binary 'Stargard Szczeciński',16),(378,_binary 'szczecinecki',_binary 'Szczecinek',16),(379,_binary 'świdwiński',_binary 'Świdwin',16),(380,_binary 'wałecki',_binary 'Wałcz',16);
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help`
--

LOCK TABLES `help` WRITE;
/*!40000 ALTER TABLE `help` DISABLE KEYS */;
INSERT INTO `help` VALUES (50,34,37,1,2,'I need a room for three nights.','https://i.imgur.com/yV5OQht.jpg',2,2),(51,35,NULL,54,4,'Potrzebuję leki przeciwbólowe dla syna.','https://i.imgur.com/yaXNpE6.jpg',2,1),(52,36,NULL,138,1,'I will accept any pasta!','https://i.imgur.com/vU2ajjQ.jpg',2,2),(53,37,36,1,4,'Oddam leki przeciwzapalne widoczne na zdjęciu.','https://images.pexels.com/photos/161449/medical-tablets-pills-drug-161449.jpeg?auto=compress',1,2),(54,38,36,54,3,'I will give away clothes for an adult.','https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress',1,2),(55,39,36,138,5,'I offer help in organizing a visit to a psychologist.','https://images.pexels.com/photos/161449/medical-tablets-pills-drug-161449.jpeg?auto=compress',1,2),(56,37,NULL,142,1,'Oddam 6 kg ryżu i 4 kg makaronu.','https://i.imgur.com/vU2ajjQ.jpg',1,1),(57,41,37,101,1,'Chcę jedzenie.','https://i.imgur.com/vU2ajjQ.jpg',2,3),(58,37,41,199,3,'Oddam ubrania dziecięce.','https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress',1,2),(59,37,NULL,206,4,'Oddam leki przeciwbólowe.','https://images.pexels.com/photos/161449/medical-tablets-pills-drug-161449.jpeg?auto=compress',1,1);
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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `help_id` int NOT NULL,
  `review_value` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `help_id` (`help_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`help_id`) REFERENCES `help` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,6,2,4),(2,6,1,3),(3,6,1,7),(4,6,1,7),(5,6,1,7);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
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
  `password` varchar(64) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `identity_number` varchar(50) DEFAULT NULL,
  `account_status` int DEFAULT NULL,
  `accepted` tinyint DEFAULT NULL,
  `rating_count` int DEFAULT NULL,
  `average_rating` int DEFAULT NULL,
  `reset_password_code` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role` (`role`),
  KEY `account_status` (`account_status`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `role` (`id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`account_status`) REFERENCES `account_status` (`id`),
  CONSTRAINT `uq_user_username` UNIQUE (`username`),
  CONSTRAINT `uq_user_email_adress` UNIQUE (`email_address`),
  CONSTRAINT `uq_user_identity_number` UNIQUE (`identity_number`),
  CONSTRAINT `uq_user_reset_password_code` UNIQUE (`reset_password_code`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Aleksandra','Wojcik','olavv','575fed10280549b8177cdf0274fa104d5df49690c1c871727af990327031c3b4','ola@wojcik.pl',2,'',2,1,0,0),(7,'Aleksandra','Wojcik','test','ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae','w.ola10@interia.pl',1,'XD1234567',1,1,0,0),(8,'Wiktoria','Wiktoria','wiktoria','2d473299d563d12f061fde645764b9ee93475bf7ca7216c2277224544ff73712','wiktoria@mail.pl',3,'AK2972615',1,1,0,0),(9,'aleksandra','aleksandra','aleksandra','85932645925c3455b11b6f7da4c87f4a063e0f128e2a6ff9bc58e6d65a648757','aleksandra@aleksa.pl',1,'ZE1231232',1,1,0,0),(10,'Wiktoria','Wiktoria','wiktoria','2d473299d563d12f061fde645764b9ee93475bf7ca7216c2277224544ff73712','wiktoria@mail.pl',1,'XYZ000000',1,1,0,0),(11,'aleksandra','aleksandra','aleksandra','85932645925c3455b11b6f7da4c87f4a063e0f128e2a6ff9bc58e6d65a648757','aleksandra@aleksa.pl',1,'XYZ123123',1,1,0,0),(13,'admin','admin','admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','admin@admin.pl',3,'XXX111111',1,1,0,0),(34,'Sofia','Rodriguez','sofrod','eff5543e051d32c65ac3761c96a1e9e65d0512f1e469851a3d77b3c55454bd76','Sofia42@gmail.com',1,'JK4884848',1,1,0,0),(35,'Andrei','Ivanov','andiva','a5f15218089065432d992e53323545fed0d9cb3bb0660db6f1592f70bd04609f','Andrei1313@gmail.com',1,'GG4899488',1,1,0,0),(36,'Muhammad','Khan','muhkha','11c5d116ad0e56d6381075bbda6e8c628afdb771f491eef8ac4cdaaf052c5a65','MuhammadK5@gmail.com',1,'AR9409409',1,1,0,0),(37,'Katarzyna','Nowak','katnow','b38145332b50380625facc9b95e4133b536c45caf4b3df8326e7d6890d4a27a9','katarzynow@gmail.com',2,'BJ4891149',1,1,0,0),(38,'Mateusz','Kowalski','matkow','f74b64de96bb0c659933db1c3fbb45a2e42f26146fc5550888b8826694b48bd8','matkowalski@wp.pl',2,'BJ8418040',1,1,0,0),(39,'Jakub','Adamczyk','jakada','421b3118e95698483a5a39e250573f1d19e3b0165dc1bb8a086660c015bcbc1b','adamczykj@wp.pl',2,'NK8341884',1,1,0,0),(41,'Jakub','Nowak','jakub','1a67cddc45360c1964d5a01421b027f884934c6b07ad7a0547ae9cd5ad0b4fc3','jakub@gmail.com',1,'XYZ123235',1,1,0,0),(42,'Jakub','Kowalski','jakubkowalski','1a67cddc45360c1964d5a01421b027f884934c6b07ad7a0547ae9cd5ad0b4fc3','jakub@wp.pl',1,'',1,1,0,0),(43,'test','test','test','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752','test@test.pl',2,'ABC123123',1,1,0,0),(44,'test','test','test23','822e54d37dd37d83776ed8aac05e4578e8b201d8f3fa366bdc60b75228bc835f','test23@test.pl',2,'XYZ123133',1,1,0,0),(45,'test','test','test23','822e54d37dd37d83776ed8aac05e4578e8b201d8f3fa366bdc60b75228bc835f','test23@test.pl',2,'XYZ123133',1,1,0,0),(46,'test','test','test123','ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae','test123@test.pl',2,'XYZ123333',1,1,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification_settings`
--

DROP TABLE IF EXISTS `user_notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification_settings` (
  `user_id` int NOT NULL,
  `new_help_offers` tinyint(1) DEFAULT NULL,
  `new_help_requests` tinyint(1) DEFAULT NULL,
  `accepted_help_offers` tinyint(1) DEFAULT NULL,
  `accepted_help_requests` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_notification_settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification_settings`
--

LOCK TABLES `user_notification_settings` WRITE;
/*!40000 ALTER TABLE `user_notification_settings` DISABLE KEYS */;
INSERT INTO `user_notification_settings` VALUES (6,0,1,0,1),(9,0,1,0,1);
/*!40000 ALTER TABLE `user_notification_settings` ENABLE KEYS */;
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

-- Dump completed on 2023-11-22 20:54:52
