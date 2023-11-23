-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inzynierka
-- ------------------------------------------------------
-- Server version	8.1.0

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
INSERT INTO `county` VALUES (1,_binary 'Kłodzko',1),(2,_binary 'Świdnica',1),(3,_binary 'Wrocław',1),(4,_binary 'Oleśnica',1),(5,_binary 'Lubin',1),(6,_binary 'Dzierżoniów',1),(7,_binary 'Zgorzelec',1),(8,_binary 'Bolesławiec',1),(9,_binary 'Głogów',1),(10,_binary 'Trzebnica',1),(11,_binary 'Oława',1),(12,_binary 'Ząbkowice Śląskie',1),(13,_binary 'Jelenia Góra',1),(14,_binary 'Polkowice',1),(15,_binary 'Wałbrzych',1),(16,_binary 'Legnica',1),(17,_binary 'Lubań',1),(18,_binary 'Środa Śląska',1),(19,_binary 'Jawor',1),(20,_binary 'Wołów',1),(21,_binary 'Lwówek Śląski',1),(22,_binary 'Złotoryja',1),(23,_binary 'Strzelin',1),(24,_binary 'Kamienna Góra',1),(25,_binary 'Milicz',1),(26,_binary 'Góra',1),(27,_binary 'Aleksandrów Kujawski',2),(28,_binary 'Brodnica',2),(29,_binary 'Bydgoszcz',2),(30,_binary 'Chełmno',2),(31,_binary 'Golub-Dobrzyń',2),(32,_binary 'Grudziądz',2),(33,_binary 'Inowrocław',2),(34,_binary 'Lipno',2),(35,_binary 'Mogilno',2),(36,_binary 'Nakło nad Notecią',2),(37,_binary 'Radziejów',2),(38,_binary 'Rypin',2),(39,_binary 'Sępólno Krajeńskie',2),(40,_binary 'Świecie',2),(41,_binary 'Toruń',2),(42,_binary 'Tuchola',2),(43,_binary 'Wąbrzeźno',2),(44,_binary 'Włocławek',2),(45,_binary 'Żnin',2),(46,_binary 'Biała Podlaska',3),(47,_binary 'Biłgoraj',3),(48,_binary 'Chełm',3),(49,_binary 'Hrubieszów',3),(50,_binary 'Janów Lubelski',3),(51,_binary 'Krasnystaw',3),(52,_binary 'Kraśnik',3),(53,_binary 'Lubartów',3),(54,_binary 'Lublin',3),(55,_binary 'Łęczna',3),(56,_binary 'Łuków',3),(57,_binary 'Opole Lubelskie',3),(58,_binary 'Parczew',3),(59,_binary 'Puławy',3),(60,_binary 'Radzyń Podlaski',3),(61,_binary 'Ryki',3),(62,_binary 'Świdnik',3),(63,_binary 'Tomaszów Lubelski',3),(64,_binary 'Włodawa',3),(65,_binary 'Zamość',3),(66,_binary 'Gorzów Wielkopolski',4),(67,_binary 'Krosno Odrzańskie',4),(68,_binary 'Międzyrzecz',4),(69,_binary 'Nowa Sól',4),(70,_binary 'Słubice',4),(71,_binary 'Strzelce Krajeńskie',4),(72,_binary 'Sulęcin',4),(73,_binary 'Świebodzin',4),(74,_binary 'Wschowa',4),(75,_binary 'Zielona Góra',4),(76,_binary 'Żagań',4),(77,_binary 'Żary',4),(78,_binary 'Bełchatów',5),(79,_binary 'Brzeziny',5),(80,_binary 'Kutno',5),(81,_binary 'Łask',5),(82,_binary 'Łęczyca',5),(83,_binary 'Łowicz',5),(84,_binary 'Łódź',5),(85,_binary 'Opoczno',5),(86,_binary 'Pabianice',5),(87,_binary 'Pajęczno',5),(88,_binary 'Piotrków Trybunalski',5),(89,_binary 'Poddębice',5),(90,_binary 'Radomsko',5),(91,_binary 'Rawa Mazowiecka',5),(92,_binary 'Sieradz',5),(93,_binary 'Skierniewice',5),(94,_binary 'Tomaszów Mazowiecki',5),(95,_binary 'Wieluń',5),(96,_binary 'Wieruszów',5),(97,_binary 'Zduńska Wola',5),(98,_binary 'Zgierz',5),(99,_binary 'Bochnia',6),(100,_binary 'Brzesko',6),(101,_binary 'Chrzanów',6),(102,_binary 'Dąbrowa Tarnowska',6),(103,_binary 'Gorlice',6),(104,_binary 'Kraków',6),(105,_binary 'Limanowa',6),(106,_binary 'Miechów',6),(107,_binary 'Myślenice',6),(108,_binary 'Nowy Sącz',6),(109,_binary 'Nowy Targ',6),(110,_binary 'Olkusz',6),(111,_binary 'Oświęcim',6),(112,_binary 'Proszowice',6),(113,_binary 'Sucha Beskidzka',6),(114,_binary 'Wadowice',6),(115,_binary 'Wieliczka',6),(116,_binary 'Zakopane',6),(117,_binary 'Warszawa',7),(118,_binary 'Radom',7),(119,_binary 'Płock',7),(120,_binary 'Siedlce',7),(121,_binary 'Pruszków',7),(122,_binary 'Legionowo',7),(123,_binary 'Ostrołęka',7),(124,_binary 'Piaseczno',7),(125,_binary 'Otwock',7),(126,_binary 'Ciechanów',7),(127,_binary 'Żyrardów',7),(128,_binary 'Mińsk Mazowiecki',7),(129,_binary 'Wołomin',7),(130,_binary 'Sochaczew',7),(131,_binary 'Ząbki',7),(132,_binary 'Mława',7),(133,_binary 'Grodzisk Mazowiecki',7),(134,_binary 'Marki',7),(135,_binary 'Nowy Dwór Mazowiecki',7),(136,_binary 'Wyszków',7),(137,_binary 'Piastów',7),(138,_binary 'Ostrów Mazowiecka',7),(139,_binary 'Płońsk',7),(140,_binary 'Kobyłka',7),(141,_binary 'Józefów',7),(142,_binary 'Sulejówek',7),(143,_binary 'Pionki',7),(144,_binary 'Pułtusk',7),(145,_binary 'Gostynin',7),(146,_binary 'Sokołów Podlaski',7),(147,_binary 'Sierpc',7),(148,_binary 'Kozienice',7),(149,_binary 'Zielonka',7),(150,_binary 'Konstancin-Jeziorna',7),(151,_binary 'Przasnysz',7),(152,_binary 'Garwolin',7),(153,_binary 'Łomianki',7),(154,_binary 'Grójec',7),(155,_binary 'Milanówek',7),(156,_binary 'Brwinów',7),(157,_binary 'Węgrów',7),(158,_binary 'Błonie',7),(159,_binary 'Szydłowiec',7),(160,_binary 'Warka',7),(161,_binary 'Góra Kalwaria',7),(162,_binary 'Ożarów Mazowiecki',7),(163,_binary 'Karczew',7),(164,_binary 'Maków Mazowiecki',7),(165,_binary 'Żuromin',7),(166,_binary 'Zwoleń',7),(167,_binary 'Tłuszcz',7),(168,_binary 'Nasielsk',7),(169,_binary 'Białobrzegi',7),(170,_binary 'Łosice',7),(171,_binary 'Łochów',7),(172,_binary 'Przysucha',7),(173,_binary 'Lipsko',7),(174,_binary 'Iłża',7),(175,_binary 'Łaskarzew',7),(176,_binary 'Raciąż',7),(177,_binary 'Pilawa',7),(178,_binary 'Skaryszew',7),(179,_binary 'Gąbin',7),(180,_binary 'Serock',7),(181,_binary 'Tarczyn',7),(182,_binary 'Żelechów',7),(183,_binary 'Jedlnia-Letnisko',7),(184,_binary 'Nowe Miasto nad Pilicą',7),(185,_binary 'Podkowa Leśna',7),(186,_binary 'Halinów',7),(187,_binary 'Mrozy',7),(188,_binary 'Myszyniec',7),(189,_binary 'Zakroczym',7),(190,_binary 'Glinojeck',7),(191,_binary 'Drobin',7),(192,_binary 'Chorzele',7),(193,_binary 'Kałuszyn',7),(194,_binary 'Różan',7),(195,_binary 'Wyszogród',7),(196,_binary 'Mogielnica',7),(197,_binary 'Cegłów',7),(198,_binary 'Kosów Lacki',7),(199,_binary 'Sanniki',7),(200,_binary 'Sochocin',7),(201,_binary 'Brok',7),(202,_binary 'Bieżuń',7),(203,_binary 'Mordy',7),(204,_binary 'Lubowidz',7),(205,_binary 'Nowe Miasto',7),(206,_binary 'Wiskitki',7),(207,_binary 'Latowicz',7),(208,_binary 'Bodzanów',7),(209,_binary 'Czerwińsk nad Wisłą',7),(210,_binary 'Jastrząb',7),(211,_binary 'Solec nad Wisłą',7),(212,_binary 'Jadów',7),(213,_binary 'Wyśmierzyce',7),(214,_binary 'Opole',8),(215,_binary 'Kędzierzyn-Koźle',8),(216,_binary 'Nysa',8),(217,_binary 'Brzeg',8),(218,_binary 'Kluczbork',8),(219,_binary 'Prudnik',8),(220,_binary 'Strzelce Opolskie',8),(221,_binary 'Namysłów',8),(222,_binary 'Krapkowice',8),(223,_binary 'Głuchołazy',8),(224,_binary 'Głubczyce',8),(225,_binary 'Zdzieszowice',8),(226,_binary 'Olesno',8),(227,_binary 'Ozimek',8),(228,_binary 'Grodków',8),(229,_binary 'Praszka',8),(230,_binary 'Paczków',8),(231,_binary 'Zawadzkie',8),(232,_binary 'Gogolin',8),(233,_binary 'Otmuchów',8),(234,_binary 'Niemodlin',8),(235,_binary 'Kietrz',8),(236,_binary 'Wołczyn',8),(237,_binary 'Lewin Brzeski',8),(238,_binary 'Głogówek',8),(239,_binary 'Tułowice',8),(240,_binary 'Dobrodzień',8),(241,_binary 'Byczyna',8),(242,_binary 'Kolonowskie',8),(243,_binary 'Baborów',8),(244,_binary 'Prószków',8),(245,_binary 'Leśnica',8),(246,_binary 'Gorzów Śląski',8),(247,_binary 'Biała',8),(248,_binary 'Korfantów',8),(249,_binary 'Ujazd',8),(250,_binary 'Ustrzyki Dolne',9),(251,_binary 'Brzozów',9),(252,_binary 'Dębica',9),(253,_binary 'Jarosław',9),(254,_binary 'Jasło',9),(255,_binary 'Kolbuszowa',9),(256,_binary 'Krosno',9),(257,_binary 'Lesko',9),(258,_binary 'Leżajsk',9),(259,_binary 'Lubaczów',9),(260,_binary 'Łańcut',9),(261,_binary 'Mielec',9),(262,_binary 'Nisko',9),(263,_binary 'Przemyśl',9),(264,_binary 'Przeworsk',9),(265,_binary 'Ropczyce',9),(266,_binary 'Rzeszów',9),(267,_binary 'Sanok',9),(268,_binary 'Stalowa Wola',9),(269,_binary 'Strzyżów',9),(270,_binary 'Tarnobrzeg',9),(271,_binary 'Przemyśl',9),(272,_binary 'Rzeszów',9),(273,_binary 'Tarnobrzeg',9),(274,_binary 'Białystok',10),(275,_binary 'Sokółka',10),(276,_binary 'Augustów',10),(277,_binary 'Wysokie Mazowieckie',10),(278,_binary 'Bielsk Podlaski',10),(279,_binary 'Łomża',10),(280,_binary 'Grajewo',10),(281,_binary 'Siemiatycze',10),(282,_binary 'Zambrów',10),(283,_binary 'Hajnówka',10),(284,_binary 'Mońki',10),(285,_binary 'Kolno',10),(286,_binary 'Suwałki',10),(287,_binary 'Sejny',10),(288,_binary 'Gdańsk',11),(289,_binary 'Gdynia',11),(290,_binary 'Słupsk',11),(291,_binary 'Sopot',11),(292,_binary 'Wejherowo',11),(293,_binary 'Kartuzy',11),(294,_binary 'Starogard Gdański',11),(295,_binary 'Pruszcz Gdański',11),(296,_binary 'Tczew',11),(297,_binary 'Słupsk',11),(298,_binary 'Chojnice',11),(299,_binary 'Puck',11),(300,_binary 'Kwidzyn',11),(301,_binary 'Bytów',11),(302,_binary 'Kościerzyna',11),(303,_binary 'Lębork',11),(304,_binary 'Malbork',11),(305,_binary 'Człuchów',11),(306,_binary 'Sztum',11),(307,_binary 'Nowy Dwór Gdański',11),(308,_binary 'Bielsko-Biała',12),(309,_binary 'Bytom',12),(310,_binary 'Chorzów',12),(311,_binary 'Częstochowa',12),(312,_binary 'Dąbrowa Górnicza',12),(313,_binary 'Gliwice',12),(314,_binary 'Jastrzębie-Zdrój',12),(315,_binary 'Jaworzno',12),(316,_binary 'Katowice',12),(317,_binary 'Mysłowice',12),(318,_binary 'Piekary Śląskie',12),(319,_binary 'Ruda Śląska',12),(320,_binary 'Rybnik',12),(321,_binary 'Siemianowice Śląskie',12),(322,_binary 'Sosnowiec',12),(323,_binary 'Świętochłowice',12),(324,_binary 'Tychy',12),(325,_binary 'Zabrze',12),(326,_binary 'Żory',12),(327,_binary 'Kielce',13),(328,_binary 'Ostrowiec Świętokrzyski',13),(329,_binary 'Starachowice',13),(330,_binary 'Skarżysko-Kamienna',13),(331,_binary 'Sandomierz',13),(332,_binary 'Końskie',13),(333,_binary 'Busko-Zdrój',13),(334,_binary 'Jędrzejów',13),(335,_binary 'Staszów',13),(336,_binary 'Pińczów',13),(337,_binary 'Włoszczowa',13),(338,_binary 'Opatów',13),(339,_binary 'Kazimierza Wielka',13),(340,_binary 'Olsztyn',14),(341,_binary 'Elbląg',14),(342,_binary 'Ełk',14),(343,_binary 'Iława',14),(344,_binary 'Ostróda',14),(345,_binary 'Giżycko',14),(346,_binary 'Kętrzyn',14),(347,_binary 'Szczytno',14),(348,_binary 'Bartoszyce',14),(349,_binary 'Mrągowo',14),(350,_binary 'Działdowo',14),(351,_binary 'Pisz',14),(352,_binary 'Olecko',14),(353,_binary 'Lidzbark Warmiński',14),(354,_binary 'Gołdap',14),(355,_binary 'Nidzica',14),(356,_binary 'Morąg',14),(357,_binary 'Pasłęk',14),(358,_binary 'Węgorzewo',14),(359,_binary 'Nowe Miasto Lubawskie',14),(360,_binary 'Lubawa',14),(361,_binary 'Braniewo',14),(362,_binary 'Chodzież',15),(363,_binary 'Czarnków',15),(364,_binary 'Gniezno',15),(365,_binary 'Gostyń',15),(366,_binary 'Grodzisk Wielkopolski',15),(367,_binary 'Jarocin',15),(368,_binary 'Kalisz',15),(369,_binary 'Kępno',15),(370,_binary 'Koło',15),(371,_binary 'Konin',15),(372,_binary 'Kościan',15),(373,_binary 'Krotoszyn',15),(374,_binary 'Leszno',15),(375,_binary 'Międzychód',15),(376,_binary 'Nowy Tomyśl',15),(377,_binary 'Ostrów Wielkopolski',15),(378,_binary 'Ostrzeszów',15),(379,_binary 'Piła',15),(380,_binary 'Pleszew',15),(381,_binary 'Poznań',15),(382,_binary 'Rawicz',15),(383,_binary 'Słupca',15),(384,_binary 'Szamotuły',15),(385,_binary 'Środa Wielkopolska',15),(386,_binary 'Śrem',15),(387,_binary 'Turek',15),(388,_binary 'Wągrowiec',15),(389,_binary 'Wolsztyn',15),(390,_binary 'Września',15),(391,_binary 'Złotów',15),(392,_binary 'Białogard',16),(393,_binary 'Choszczno',16),(394,_binary 'Drawsko Pomorskie',16),(395,_binary 'Goleniów',16),(396,_binary 'Gryfice',16),(397,_binary 'Gryfino',16),(398,_binary 'Kamień Pomorski',16),(399,_binary 'Kołobrzeg',16),(400,_binary 'Łobez',16),(401,_binary 'Myślibórz',16),(402,_binary 'Police',16),(403,_binary 'Pyrzyce',16),(404,_binary 'Sławno',16),(405,_binary 'Szczecinek',16),(406,_binary 'Świdwin',16),(407,_binary 'Wałcz',16);
/*!40000 ALTER TABLE `county` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22  0:37:23