-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: codelo-cup
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Dumping data for table categorias
--

/*LOCK TABLES categorias;
/*!40000 ALTER TABLE categorias DISABLE KEYS */;
INSERT INTO categorias VALUES (1,'Exterior','Presentación,Aroma en Flor,Aroma Picado,Sabor Apagado,Sabor Prendido','2022-11-24 18:07:34','2022-11-24 18:07:34'),(2,'Interior','Presentación,Aroma en Flor,Aroma Picado,Sabor Apagado,Sabor Prendido','2022-11-24 18:07:34','2022-11-24 18:07:34'),(3,'Rosin','Presentación,Aroma,Sabor,Residuo','2022-11-24 18:07:34','2022-11-24 18:07:34');
/*!40000 ALTER TABLE categorias ENABLE KEYS */;
/*UNLOCK TABLES;

--
-- Dumping data for table dojos
--

LOCK TABLES dojos;
/*!40000 ALTER TABLE dojos DISABLE KEYS */;
INSERT INTO dojos VALUES (1,'Dublin Institute for Advanced Studies','2022-01-02 03:37:16','2022-01-15 10:00:48'),(2,'Moscow State University of Civil Engineering','2022-10-27 17:30:37','2022-08-15 16:29:23'),(3,'Sul Ross State University','2022-07-20 11:14:51','2022-10-15 08:40:35'),(4,'Universidad Surcolombiana','2022-11-06 18:32:05','2022-10-12 16:55:46'),(5,'University of Canterbury','2022-10-28 04:34:47','2022-03-01 23:58:50'),(6,'Arkansas State University','2022-01-04 03:45:30','2022-09-05 12:02:51');
/*!40000 ALTER TABLE dojos ENABLE KEYS */;
/*UNLOCK TABLES;

--
-- Dumping data for table mesas
--

LOCK TABLES mesas;
/*!40000 ALTER TABLE mesas DISABLE KEYS */;
INSERT INTO mesas VALUES (1,'Mesa 2','2022-11-24 18:07:34','2022-11-24 18:07:34'),(2,'Mesa 1','2022-11-24 18:07:34','2022-11-24 18:07:34'),(3,'Mesa 3','2022-11-24 18:07:34','2022-11-24 18:07:34'),(4,'Mesa 4','2022-11-24 18:07:34','2022-11-24 18:07:34'),(5,'Mesa 5','2022-11-24 18:07:34','2022-11-24 18:07:34'),(6,'Mesa 6','2022-11-24 18:07:34','2022-11-24 18:07:34'),(7,'Mesa 7','2022-11-24 18:07:34','2022-11-24 18:07:34'),(8,'Mesa 8','2022-11-24 18:07:34','2022-11-24 18:07:34'),(9,'Mesa 9','2022-11-24 18:07:34','2022-11-24 18:07:34'),(10,'Mesa 10','2022-11-24 18:07:34','2022-11-24 18:07:34'),(11,'Mesa 11','2022-11-24 18:07:34','2022-11-24 18:07:34'),(12,'Mesa 12','2022-11-24 18:07:34','2022-11-24 18:07:34');
/*!40000 ALTER TABLE mesas ENABLE KEYS */;
/*UNLOCK TABLES;

--
-- Dumping data for table participantes
--

LOCK TABLES participantes;
/*!40000 ALTER TABLE participantes DISABLE KEYS */;
INSERT INTO participantes VALUES (1,1,'Kass Langan','73165412','ed6f9601-5244-4978-bbc8-ac031c485c7d',NULL,1,'2022-07-09 12:32:14','2022-11-24 21:47:44',NULL,NULL,NULL),(2,2,'Nicky Uff','62149075','4ce438ab-2232-4049-8716-b072107fc22d',NULL,1,'2022-08-26 16:16:56','2022-11-24 21:47:47',NULL,NULL,1),(3,3,'Zorine Cerith','58521166','42dfb2ef-70a4-4a20-9de4-dd39485317dd',NULL,1,'2022-01-08 06:53:12','2022-11-24 21:47:53',NULL,NULL,NULL),(4,4,'Phillida Durban','30843210','6ce7d124-ae27-4272-9e79-3cd171800b32',NULL,1,'2022-06-17 13:10:54','2022-11-24 21:47:36',NULL,NULL,6),(5,5,'Ludovika Sparey','55413549','b37eee52-ce7d-4d66-a22b-785c3e399462',NULL,1,'2022-01-06 23:08:54','2022-11-24 21:47:29',NULL,NULL,NULL),(6,6,'Lizbeth Payley','94006269','ca305ddb-be77-44eb-a9c3-2e52e565d402',NULL,1,'2022-07-07 12:53:36','2022-11-24 21:48:12',NULL,NULL,3),(7,7,'Neile Kleinzweig','22521169','eca1f631-5c7e-4a65-a3e9-c4bc6ec72d93',NULL,1,'2022-03-06 09:43:11','2022-11-24 21:47:46',NULL,NULL,NULL),(8,8,'Byrom Lillee','44622934','863e4285-63b7-4763-ad3b-47ba56824966',NULL,1,'2022-11-05 14:19:21','2022-11-24 21:47:43',NULL,NULL,NULL),(9,9,'Odelia Coucher','53970920','a5ad3401-ad02-4dc1-a483-33a66d4df638',NULL,1,'2022-02-22 12:13:50','2022-11-24 21:47:54',NULL,NULL,NULL),(10,10,'Rodney Bordman','57849143','f30f5933-70f0-4a8f-90cf-524619a83a69',NULL,1,'2022-09-16 03:15:33','2022-11-24 21:48:00',NULL,NULL,NULL),(11,11,'Teresa Halewood','82730983','ef0b3dec-c1a8-44c0-96c6-1a08fc98245b',NULL,0,'2022-06-13 22:07:11','2022-11-24 21:47:54',NULL,NULL,NULL),(12,12,'Kippy Severn','20705593','3ce864ef-7679-43bb-8f3d-fde81f84e493',NULL,0,'2022-05-31 13:03:41','2022-11-24 21:48:00',NULL,NULL,1),(13,13,'Anna-diane Houlston','56190080','d6af5674-0398-4407-bd69-0d733793e32a','Chala GrowShop',0,'2022-09-18 03:33:50','2022-11-24 21:47:37',NULL,NULL,NULL),(14,14,'Bridie Johantges','50153635','3fcdb334-e9d8-44da-8632-a03dd6ca3258',NULL,0,'2022-03-31 02:26:19','2022-11-24 21:48:09',NULL,NULL,NULL),(15,15,'Oona Jurkowski','16595955','357bd1f9-d6f4-44d0-88c5-4822d8432684',NULL,0,'2022-05-21 14:56:12','2022-11-24 21:47:30',NULL,NULL,3),(16,16,'Kerrill Rubinfajn','50491951','d883e4df-76b7-4336-a3de-223e5c8c92d3','Cultivo Grow',0,'2022-05-22 19:16:16','2022-11-24 21:47:37',NULL,NULL,NULL),(17,17,'Marissa Chansonne','12567713','9533b2e4-0e02-4501-acc2-919923f12722',NULL,0,'2022-10-18 13:04:16','2022-11-24 21:48:04',NULL,NULL,NULL),(18,18,'Flossi Dinan','20523357','9900b672-f16e-4f9c-b883-65a3f36a45c4','Chala GrowShop',0,'2022-05-08 14:50:21','2022-11-24 21:47:55',NULL,NULL,NULL),(19,19,'Maximilian Buckley','29367061','5be42a3d-e15d-41d8-8b62-6212b7a24d2a',NULL,0,'2022-10-21 06:43:43','2022-11-24 21:47:56',NULL,NULL,3),(20,20,'Morena Hemshall','67721783','25406076-5664-46cd-a65a-23f95cfce238',NULL,0,'2022-11-22 00:41:39','2022-11-24 21:48:10',NULL,NULL,NULL),(21,21,'Brinn OSharkey','89217716','284c2c6d-47ff-4217-a23a-c92b37c5fb54','Bs As Grow',0,'2022-11-01 13:59:46','2022-11-24 21:47:49',NULL,NULL,NULL),(22,22,'Rasia Kloster','77007881','43ff1fae-1386-42ef-9674-a71f35e7490e',NULL,0,'2022-07-24 01:40:11','2022-11-24 21:47:46',NULL,NULL,1),(23,23,'Devland Vannah','57758356','db1032c9-9abd-4fe4-9b64-bafafe7a124a',NULL,0,'2022-02-28 19:30:22','2022-11-24 21:47:38',NULL,NULL,NULL),(24,24,'Collie Conner','19772036','d586b2df-f50d-4d1a-ae3e-be635562fa46','Hemp Grow',0,'2021-12-29 09:15:55','2022-11-24 21:48:05',NULL,NULL,NULL),(25,25,'Jonah Mc Pake','29829994','337bda5b-649a-4e1d-9180-6cd55dd4ade8',NULL,0,'2022-06-13 07:35:15','2022-11-24 21:48:01',NULL,NULL,2),(26,26,'Vittorio Wimsett','17692344','776a6e3a-b42c-4c18-b708-0e294eab5cb0',NULL,0,'2022-03-10 01:28:18','2022-11-24 21:47:56',NULL,NULL,NULL),(27,27,'Nadine Rumbelow','61188878','0921e290-4585-4983-be7e-aaa98ea5e42d',NULL,0,'2022-07-26 20:05:20','2022-11-24 21:48:06',NULL,NULL,5),(28,28,'Alwin Bushe','47895705','edd99088-9404-4c4d-82b6-0e6bcb8768da','Hemp Grow',0,'2022-01-23 06:40:45','2022-11-24 21:48:11',NULL,NULL,NULL),(29,29,'Stacee Zuppa','28866143','e59e0d16-9a2b-48c6-8415-33a006f39659',NULL,0,'2022-09-10 20:49:15','2022-11-24 21:47:49',NULL,NULL,NULL),(30,30,'Dorolice Biggans','77458376','db460388-7569-4f01-86f9-8a90f1efc485',NULL,0,'2022-01-08 21:51:23','2022-11-24 21:47:42',NULL,NULL,NULL),(31,31,'Deborah Alessandretti','89029672','61300440-51fa-48ab-8fb9-2293e937c7cc',NULL,0,'2022-02-18 04:31:12','2022-11-24 21:47:44',NULL,NULL,2),(32,32,'Hercules Beetlestone','11631576','15d6f93b-342b-4127-a7b7-219b210ccaef','Chala GrowShop',0,'2022-09-29 05:35:44','2022-11-24 21:48:01',NULL,NULL,NULL),(33,33,'Waylan Verzey','12202201','2be8afb2-40d7-4d64-878d-6825ce4a12a4',NULL,0,'2022-09-05 07:15:53','2022-11-24 21:48:06',NULL,NULL,NULL),(34,34,'Gilli Deller','54357582','aec97b48-1692-4040-b92d-53cdf0084ad3',NULL,0,'2021-12-27 21:47:34','2022-11-24 21:48:02',NULL,NULL,2),(35,35,'Gabriel Gannon','17687600','3e96700b-91ff-4290-b350-b88bef0d3661','Cultivo Grow',0,'2022-03-04 22:36:17','2022-11-24 21:47:57',NULL,NULL,NULL),(36,36,'Tobin Hoolaghan','92881061','9af26f06-6ed3-4973-a976-001d8cf897cc',NULL,0,'2022-11-12 11:12:39','2022-11-24 21:47:45',NULL,NULL,NULL),(37,37,'Chad Boniface','60136258','2378b5bc-d5de-48f5-a958-d88ff1eb8400',NULL,0,'2022-09-09 01:43:09','2022-11-24 21:47:57',NULL,NULL,NULL),(38,38,'Yves Sear','12492414','5b658583-e6ab-4341-be9c-87ad7fddb911','Cannabis Club',0,'2022-01-30 08:47:29','2022-11-24 21:47:31',NULL,NULL,4),(39,39,'Bev Schowenburg','48510795','3f10d867-7b72-456e-97f0-3041d546bb9e',NULL,0,'2022-06-26 18:28:00','2022-11-24 21:48:02',NULL,NULL,NULL),(40,40,'Wilone Harbar','37017992','b29b88d7-a22e-49e7-9f70-a63cc0ff815e','Bs As Grow',0,'2022-03-15 07:29:23','2022-11-24 21:48:08',NULL,NULL,NULL),(41,41,'Rory Sharram','57825057','c25b0ee4-64eb-4a96-860c-f9a58019218a',NULL,0,'2022-07-11 05:53:08','2022-11-24 21:47:39',NULL,NULL,NULL),(42,42,'Tessa Edgler','27047048','dbe3bfd4-2824-45a9-9faf-5afb05040c8d',NULL,0,'2022-03-13 17:51:59','2022-11-24 21:47:31',NULL,NULL,NULL),(43,43,'Colet Humphris','64774426','bc35d851-5cea-44d9-9cb0-0d17c7b65a96','Cannabis Club',0,'2022-03-07 19:27:22','2022-11-24 21:47:41',NULL,NULL,NULL),(44,44,'Benetta Donett','42731707','f64703d3-0f9d-4c30-894c-bd797e4ffe7d',NULL,0,'2021-12-05 03:47:29','2022-11-24 21:48:12',NULL,NULL,NULL),(45,45,'Laurel Vivyan','53227246','bc84c81e-bd2a-42f2-871a-1d9801b8351f',NULL,0,'2022-08-10 20:17:11','2022-11-24 21:47:50',NULL,NULL,5),(46,46,'Laurene Otham','31937168','c1c5d2b5-5561-407f-8fa8-965caf497f03',NULL,0,'2022-04-05 10:45:38','2022-11-24 21:47:32',NULL,NULL,NULL),(47,47,'Floyd Fust','30340522','24f423aa-9c48-411e-ad19-09bc58eb299a','Zarasa Grow',0,'2022-07-02 10:24:13','2022-11-24 21:48:13',NULL,NULL,NULL),(48,48,'Nissa Paffitt','99116390','74728008-1a31-4ea5-812a-070d7a26d2ce',NULL,0,'2022-01-14 14:12:00','2022-11-24 21:48:07',NULL,NULL,NULL),(49,49,'Sonni Commin','60816641','1643e3c8-dc03-4251-a506-ee3b3d5eaeb1',NULL,0,'2022-10-12 03:23:28','2022-11-24 21:47:51',NULL,NULL,4),(50,50,'Roch Beceril','69795423','b341ceb5-0b8a-4888-b5d3-6d9de93bed2e',NULL,0,'2022-08-25 17:27:35','2022-11-24 21:47:39',NULL,NULL,NULL),(51,51,'Amabel Riall','58790438','0e7b76a8-bd0a-492f-ab8c-e74069e91ee5','Hemp Grow',0,'2022-03-17 23:33:56','2022-11-24 21:47:33',NULL,NULL,NULL),(52,52,'Eben Crux','27709992','7537a904-69b1-4fc0-a8e2-912e4efae844',NULL,0,'2022-07-06 00:35:30','2022-11-24 21:48:08',NULL,NULL,6),(53,53,'Fina Harrismith','66458940','122a5f47-4fcf-442f-a473-187445e1f9a2','Zarasa Grow',0,'2022-01-06 05:40:39','2022-11-24 21:47:40',NULL,NULL,NULL),(54,54,'Welbie Egell','18780109','9633c208-c318-4abd-a98b-d4e278f8f9a3',NULL,0,'2022-04-03 10:38:48','2022-11-24 21:47:34',NULL,NULL,NULL),(55,55,'Silvio Dominelli','91521175','22d4c670-aac3-4ae8-92dc-2cb30e995640',NULL,0,'2022-10-17 15:46:10','2022-11-24 21:47:58',NULL,NULL,5),(56,56,'Berk Ponton','20631155','bbd67447-26ba-4002-9a70-b6cd35b12ea1',NULL,0,'2022-08-11 06:29:18','2022-11-24 21:47:34',NULL,NULL,NULL),(57,57,'Maddalena Cattell','84446578','29348e16-1492-4414-8faf-15104ca62394',NULL,0,'2022-08-22 10:02:16','2022-11-24 21:47:48',NULL,NULL,NULL),(58,58,'Alexine Toffetto','95318027','55c3c6c8-551f-4dfb-9dc8-25186cf63d6e',NULL,0,'2022-04-28 02:48:14','2022-11-24 21:47:50',NULL,NULL,NULL),(59,59,'Zenia Binns','30113729','4bcddf90-45ae-450d-a594-1536caf21ea6',NULL,0,'2022-08-08 23:17:11','2022-11-24 21:47:59',NULL,NULL,NULL),(60,60,'Bronnie Lindop','54773847','ae7cb5e8-013c-4e71-a16d-2dfc17fd65c4',NULL,0,'2022-07-29 05:54:10','2022-11-24 21:47:35',NULL,NULL,4);
/*!40000 ALTER TABLE participantes ENABLE KEYS */;
/*UNLOCK TABLES;

--
-- Dumping data for table muestras
--

LOCK TABLES muestras;
/*!40000 ALTER TABLE muestras DISABLE KEYS */;
INSERT INTO muestras VALUES (1,1,'Nifedipine','McKesson Packaging Services Business Unit of McKesson Corporation','2a617474-79bb-4361-86a7-609da66ba007','2022-02-02 08:32:55','2022-05-04 05:25:14',35,1),(2,2,'Procardia','Pfizer Laboratories Div Pfizer Inc','210ba151-6b7b-4bc4-80db-ac52520850de','2022-04-30 11:27:12','2022-07-20 00:33:04',48,2),(3,3,'Poison Oak Ivy','Liddell Laboratories, Inc.','a0c103e4-73d6-4325-9e94-e2656697dfb0','2022-01-19 20:44:25','2022-09-02 10:59:17',58,2),(4,4,'Acyclovir','Renaissance Pharma, Inc.','8aa103e5-4122-44ed-918e-3cf66cc47a27','2022-08-28 17:39:13','2022-01-30 12:08:04',40,1),(5,5,'Triamterene and Hydrochlorothiazide','KAISER FOUNDATION HOSPITALS','2fa33411-a662-4ba0-9bd7-fc877a25afa7','2022-03-05 20:36:49','2022-11-07 00:30:58',22,1),(6,6,'CareOne Childrens All Day Allergy','American Sales Company','57924500-343a-434a-99b1-c4b786a90bb6','2022-07-26 11:20:35','2022-01-27 05:44:56',56,2),(7,7,'Equisetum cum sulfure tosta 6','Uriel Pharmacy Inc.','050b6309-ebb1-447f-8df0-1133d7b7b2e6','2022-04-16 05:52:09','2022-03-12 08:37:31',40,1),(8,8,'Mirtazapine','Watson Laboratories, Inc.','07d98077-a7a2-4044-a0fd-34a107be4429','2022-10-01 20:37:35','2021-12-31 09:56:12',26,2),(9,9,'No7 Radiant Glow Foundation Sunscreen SPF 15 Buff','Boots Retail USA Inc','fe503c8c-e782-40a9-a029-0c4d914642d8','2022-02-02 02:58:45','2022-05-22 00:11:10',32,2),(10,10,'Axe','Conopco Inc. d/b/a Unilever','b23bf2a3-129a-4c10-84ed-b39d1bee6070','2022-06-07 14:16:00','2022-10-11 19:06:01',41,2),(11,11,'Fluconazole','Proficient Rx LP','34c7ebb4-a650-43c6-be24-0c756d216777','2022-09-26 16:52:25','2022-03-08 22:02:38',45,1),(12,12,'Povidone Iodine Surgical Scrub','Jiangsu Province JianErKang Medical Dressing Co. ,Ltd.','62e52ffb-d431-453d-8f36-684a79e867c4','2022-01-11 12:55:31','2022-10-28 08:10:56',25,1),(13,13,'Isuprel','Hospira, Inc.','727df8d2-7631-460e-b76f-cffb2dbdebd2','2022-10-31 12:20:04','2021-12-12 00:11:01',41,1),(14,14,'Antispetic Mouth Rinse','Onpoint, Inc','8f7930a4-015e-470b-984d-4116cf2b58d3','2022-08-02 21:33:30','2022-05-26 01:20:50',28,1),(15,15,'Calendula Officinalis Kit Refill','Washington Homeopathic Products','f064b53d-dcf0-402d-a5be-9a0a2c0e0c2d','2022-07-25 12:45:02','2022-04-19 20:18:38',50,2),(16,16,'Eye Floaters','Newton Laboratories, Inc.','9693d0eb-f6a7-45dc-a390-8013ec90b9ee','2022-08-15 01:41:15','2021-12-29 08:03:16',56,1),(17,17,'Berberis Viscum','Uriel Pharmacy Inc.','9e124d0c-8de6-40b6-a4f8-7d7a9351c2c2','2022-09-19 12:39:14','2022-02-05 14:18:15',55,2),(18,18,'Furosemide','Cardinal Health','0db86474-f776-4ec0-b121-23caa13304f0','2022-10-30 01:14:51','2022-09-17 19:28:32',42,1),(19,19,'Olanzapine','Major Pharmaceuticals','6196a2f5-c390-4995-b0cc-a9632fd885fe','2022-10-25 00:34:12','2021-11-27 04:51:41',12,1),(20,20,'GAMMAGARD','Baxter Healthcare Corporation','e511314d-dc88-40c5-8079-09909033b01a','2022-02-21 11:23:51','2022-07-01 05:04:05',27,2),(21,21,'Atenolol','Northstar RxLLC','c5b8299a-a7a8-440f-a917-4c73019c5bbb','2022-07-12 23:36:58','2022-01-14 01:44:27',25,2),(22,22,'Carboplatin','Hospira Worldwide, Inc.','3bb27f7e-79d5-4bc9-92ff-dbfc15bb388b','2022-03-01 02:52:02','2021-12-09 15:22:02',27,2),(23,23,'Hay Fever','Home Sweet Homeopathics','ac2297f3-fac7-4226-8344-8ca1e9522f12','2022-11-13 09:45:24','2022-03-03 11:18:18',12,1),(24,24,'Buckwheat Grain','Nelco Laboratories, Inc.','4b06c2cb-b9e3-4b64-8a55-f1c5ee7617ff','2022-06-07 20:41:14','2022-02-15 23:48:58',44,2),(25,25,'Alfuzosin Hydrochloride','Aurobindo Pharma Limited','ef1b7b0e-e2f0-4d03-a433-e9def6a9d444','2022-08-08 20:57:33','2022-05-02 08:53:27',42,1),(26,26,'Perphenazine','REMEDYREPACK INC.','3ec987cc-b634-4750-85f4-dd050cb79e09','2022-01-06 09:08:20','2022-03-01 17:50:36',51,2),(27,27,'Atomy Sunscreen Beige','ATOMY CO., LTD.','49ca4004-b96e-40c6-a8ff-fc34d9d338ff','2022-06-30 04:36:40','2022-01-24 21:43:53',53,2),(28,28,'Oxygen','Shasta Welding Supply, Inc.','59c07cb8-6813-4cb7-8ea5-1dc0bc1b2600','2022-02-23 12:29:22','2022-06-04 19:45:28',48,2),(29,29,'NITROGEN','Cryo Weld Corporation','731940b4-8c3f-48d2-82da-66e8a7a3b3a6','2022-07-04 22:55:02','2022-01-04 14:19:45',44,2),(30,30,'Diltiazem Hydrochloride','Aidarex Pharmaceuticals LLC','e433d21b-ba46-4a29-98a7-b5bc80e45fc7','2022-06-02 07:23:39','2022-10-12 05:36:11',28,2),(31,31,'Youthful Wear Spotless Powder','Physicians Formula Inc','a79e9367-6dad-4256-b19f-a74913ebf94d','2022-10-06 00:14:23','2022-04-01 18:41:15',10,1),(32,32,'VP-Precip','Virtus Pharmaceuticals LLC','903148c1-c6b6-45d6-b61c-9768dd4d108e','2022-01-14 17:34:10','2022-03-23 10:26:01',28,2),(33,33,'Coconut','The Body Shop Wake Forest','1490fea3-8369-45fe-9a11-424e7faa323e','2022-07-05 14:00:48','2022-06-09 23:48:00',32,2),(34,34,'Alprazolam','Actavis Elizabeth LLC','6f335bef-a8a4-47ff-b5f8-ef4bb015772f','2022-01-28 09:22:46','2022-03-21 21:45:11',11,1),(35,35,'Trokendi XR','Supernus Pharmaceuticals, Inc.','e61c417e-8bf1-4b8d-aba7-0a33b9129ccd','2022-02-20 17:32:17','2021-12-07 11:50:16',15,2),(36,36,'Peter Island Sunscreen','Access Business Group LLC','87a21ee8-0152-41ae-8cce-eb0182e79f3a','2021-12-02 13:52:00','2022-02-28 19:51:56',29,2),(37,37,'Instant Foaming Hand Sanitizer','RD Food Service DBA Restaurant Depot','f1793558-c40e-4558-a8dd-bea35b645ec3','2022-06-15 12:12:55','2022-05-20 00:39:54',13,2),(38,38,'Ulta Freshwater Mist Anti-Bacterial Hand Sanitizer','Ulta','59b53f89-1e9b-4625-a9a9-0a69ddf3f75d','2022-08-27 09:45:46','2022-09-19 03:55:13',23,1),(39,39,'Broncotron PED','Seyer Pharmatec, Inc.','afc51d91-12fb-4d57-84ad-1d1de3300c22','2022-06-30 00:52:35','2022-10-22 02:39:24',51,2),(40,40,'Lisinopril','Contract Pharmacy Services-PA','79c63e0c-2447-46a1-936e-54c70943d0ec','2022-09-23 15:52:50','2022-11-05 21:22:22',16,3),(41,41,'Torsemide','Par Pharmaceutical Inc','8437c546-cb33-4039-959d-e16f9bd17454','2022-07-01 02:46:18','2021-12-12 06:12:52',51,2),(42,42,'Secret Clinical Strength','Procter and Gamble Manufacturing Company','628a2ed9-965a-421b-b9a3-82689f817a61','2022-05-21 14:48:33','2022-10-03 00:09:25',16,2),(43,43,'Dr. Cocoa Nighttime Cough and Cold','Pernix Therapeutics, LLC','38c8d9b5-4b3b-46c7-8f03-d117d2ecc807','2022-09-17 00:12:11','2022-10-24 09:57:38',24,3),(44,44,'topiramate','Zydus Pharmaceuticals (USA) Inc.','74999dba-f864-425c-8b71-a167b68a9f0b','2022-05-27 15:57:17','2021-12-09 23:37:57',45,3),(45,45,'Sensitive','Melaleuca, Inc.','41938aaf-4549-4b10-b968-cc79aaf59792','2022-10-23 23:43:17','2022-05-17 03:02:06',31,3),(46,46,'Divalproex Sodium','Cadila Healthcare Limited','7f1b64a6-1117-47b8-85ea-1ff1a5b975a6','2022-09-24 19:34:57','2022-05-19 17:37:25',54,2),(47,47,'ESIKA','Ventura Corporation (San Juan, P.R)','65c09bdf-7b5f-4457-832a-8f69f1170dd2','2022-01-04 22:48:59','2022-08-29 02:55:16',19,2),(48,48,'SYNTHROID','Cardinal Health','9df771ec-0bbd-4a71-a60c-5a925f9603b6','2022-05-25 20:48:22','2021-12-01 09:17:32',52,2),(49,49,'SHISEIDO ADVANCED HYDRO-LIQUID COMPACT (REFILL)','SHISEIDO AMERICAS CORPORATION','35dd12ca-d0ec-4019-9698-50215c61685f','2022-06-21 19:48:41','2022-09-11 06:32:13',58,3),(50,50,'Ibuprofen','Major Pharmaceuticals','b25897b7-5bb6-4b56-a2aa-a59a763814f5','2022-01-17 18:28:36','2022-04-20 23:26:23',34,3),(51,51,'Tea','Antigen Laboratories, Inc.','871fa134-fb86-49e9-b590-d9d2584d7f1b','2022-03-06 06:57:15','2022-04-25 23:16:18',52,2),(52,52,'IOSAT','Anbex Inc.','2406fa83-4c23-4cc2-9328-dfc44f818f5e','2022-01-01 11:08:26','2022-05-01 15:02:08',30,2),(53,53,'Rugby Aspirin','Rugby Laboratories','ddc5ea94-db2d-472e-bc21-d94abbca8c98','2022-03-20 16:25:12','2022-08-27 21:33:33',25,2),(54,54,'ZIAGEN','ViiV Healthcare Company','25a46990-1246-42d0-9630-d2ead3d299ec','2022-06-01 14:21:49','2022-03-09 18:51:30',53,2),(55,55,'AMBROSIA BIDENTATA POLLEN','ALK-Abello, Inc.','75896a84-52e3-4ab1-8a5b-746aa69aa3d8','2021-12-24 12:26:02','2022-09-26 17:05:48',41,2),(56,56,'Trick or Treat Antibacterial Hand','SJ Creations, Inc.','05021a6e-a3b6-46d3-a298-7a18b13cc40d','2022-09-05 03:24:24','2021-11-28 05:40:50',56,2),(57,57,'GABAPENTIN','Greenstone LLC','eb6cbfe1-54be-478c-8b50-490e75427bfa','2022-08-21 16:40:58','2022-07-07 17:08:50',57,2),(58,58,'Cefoxitin','WG Critical Care, LLC','23ed8622-5888-4601-8fd2-4ead2c7e7055','2022-08-10 22:06:11','2022-08-27 01:55:02',14,2),(59,59,'Okyongsoo','Woori Health Promotion Town','2235a418-6296-463a-9a8b-8f1213e44ad6','2022-09-27 11:29:18','2022-09-23 20:48:41',26,3),(60,60,'Flavoxate Hydrochloride','TAGI Pharma, Inc.','2af7df6c-710b-49f4-8bad-821968dc5bb8','2022-05-29 13:47:50','2022-07-12 16:39:55',24,2),(61,61,'Good Neighbor Pharmacy Acid Reducer','Amerisource Bergen','fbb35f39-1a6e-44fe-ab9f-2ee7999b0bad','2022-10-16 18:02:39','2022-04-24 09:39:24',29,2),(62,62,'Ampicillin','GC Hanford Manufacturing Company','af226449-ecaa-45bf-9b67-975f442187dc','2022-08-11 20:23:53','2022-10-09 17:27:30',28,3),(63,63,'Zarontin','Parke-Davis Div of Pfizer Inc','8b2739f1-98e5-45b0-88dd-9e483540721a','2022-06-13 04:47:27','2022-09-03 09:41:57',42,2),(64,64,'up and up childrens ibuprofen','Target Corporation','e2c97b47-4bdd-49fd-99ee-620ce17d9715','2022-02-01 04:56:55','2022-03-24 21:34:34',46,2),(65,65,'Foradil','Merck Sharp & Dohme Corp.','c34335f5-0899-4a7c-a24b-efd7b78b658f','2022-06-24 02:31:03','2022-05-13 00:33:46',36,2),(66,66,'PROMETHEGAN','Physicians Total Care, Inc.','749be281-063b-4783-8b6a-4e56da017a3b','2022-03-02 20:24:08','2022-03-08 11:06:16',40,3),(67,67,'No7 Lift and Luminate Foundation Sunscreen Broad Spectrum SPF 15 Toffee','BCM Cosmetique SAS','46ee22b5-a068-40bc-bc34-9871afbd5c2b','2022-07-19 09:01:47','2022-10-26 11:51:28',18,3),(68,68,'Captopril','State of Florida DOH Central Pharmacy','3029502a-5a4f-4f6b-92c1-75e44dce7c3d','2022-07-05 03:22:12','2022-11-20 08:32:53',17,2),(69,69,'Hydrocortisone','Safetec of America, Inc.','51fd6332-826b-4846-a91e-6361d49ba097','2022-08-10 18:19:45','2022-02-21 10:34:40',34,3),(70,70,'Epionce Active Shield','Episciences, Inc.','35d2788e-08c3-4df4-9fba-51f3e67fadb9','2022-09-07 13:46:30','2022-10-28 07:01:03',50,2),(71,71,'Furosemide','Physicians Total Care, Inc.','eab025ca-0c17-4d93-995b-9b0ea60a0fe7','2022-09-26 10:20:08','2022-09-03 06:32:55',47,2),(72,72,'Western Ragweed','Nelco Laboratories, Inc.','4ee39357-5463-4a95-b3bd-64156cec6db1','2022-07-05 00:46:58','2022-06-29 20:18:03',55,2),(73,73,'Cymbalta','Cardinal Health','0faea7fb-7530-44a6-bc79-ea3ee097b2a3','2022-07-12 06:15:23','2022-06-24 12:07:04',30,3),(74,74,'North Woods Germ Stuff','Whisk Products, Inc.','dac8c760-aff8-4fc0-b81b-4d3883efa2ca','2022-03-14 17:06:44','2022-09-15 11:57:48',37,3),(75,75,'MANGO BUTTER LIPSTICK','ART COSMETICS SRL','eb082d62-3f72-4d36-903b-5e685302776c','2022-02-04 22:28:51','2022-10-20 11:13:02',11,3),(76,76,'FENOFIBRATE','KAISER FOUNDATION HOSPITALS','2639c075-daa2-4edd-97c6-52e3a1419d59','2022-04-28 13:18:21','2022-01-31 16:42:08',15,2),(77,77,'Ibuprofen','REMEDYREPACK INC.','3f35f712-abd2-4b40-8c6e-fc6fc31fdaf6','2022-02-05 03:40:14','2022-04-14 01:16:37',59,3),(78,78,'Paracetamol','RAANI CORPORATION','3d366f06-5294-47d7-9522-cf59ee71ab17','2022-01-08 03:06:33','2022-05-03 16:24:04',29,2),(79,79,'Fluticasone Propionate','Rebel Distributors Corp','7cb165a0-a02e-4c74-94b2-52421687e947','2022-01-30 01:03:03','2022-07-01 16:46:54',29,2),(80,80,'Doxycycline Hyclate','REMEDYREPACK INC.','c98de732-7257-4624-aac4-cf0557ad9915','2022-09-07 04:41:44','2021-12-09 11:29:13',47,2),(81,81,'risedronate sodium','Actavis Pharma, Inc.','4efda0d1-c39c-4ac3-87c8-ca7b155943bc','2022-03-12 20:20:21','2022-03-26 22:55:36',38,2),(82,82,'Arnica 6c','BrandStorm HBC','8eb6d566-2fcd-4cd2-9521-7e0767a99235','2022-07-09 02:13:53','2022-03-18 09:45:19',57,2),(83,83,'NALOXONE HYDROCHLORIDE','General Injectables & Vaccines, Inc.','9125e530-1c87-48e2-888d-8f1e81d143ec','2022-01-14 00:26:40','2022-07-21 15:45:32',39,2),(84,84,'Lidocaine','Hi-Tech Pharmacal Co., Inc.','81be57dd-fbb7-49ea-810d-e385760f3604','2022-05-19 05:40:47','2022-06-08 13:19:12',60,2),(85,85,'butalbital, acetominophen and caffeine','Rising Pharmaceuticals, Inc.','1971ca23-d617-4cf0-a9af-9cc978193d6b','2022-05-10 08:42:48','2022-05-14 13:24:15',22,2),(86,86,'Bethanechol Chloride','Pliva Inc.','b3a408fd-f3fd-485e-99da-4f4adad39da1','2022-01-31 08:05:15','2022-04-13 07:57:30',38,2),(87,87,'Sandostatin','Novartis Pharmaceuticals Corporation','a757695d-2f19-4ca6-8741-ab03040e707b','2022-05-05 18:53:56','2022-11-03 17:36:18',42,2),(88,88,'Oxymetazoline Hydrochloride','Dynamic Pharmaceuticals','70d518c9-70bd-4392-8e5d-0b576cf86a64','2022-04-08 16:09:57','2022-11-20 02:55:04',43,2),(89,89,'Exforge','Physicians Total Care, Inc.','6b4bf826-6a89-47df-97d7-49254f0c3746','2022-10-28 08:56:53','2022-09-12 21:08:28',34,2),(90,90,'Acetaminophen','Cardinal Health','76baf2ec-cc7f-4b62-a309-8ade7f4dfb54','2022-11-23 13:30:50','2022-08-18 07:09:58',21,2),(91,91,'Scrub-In Surgical Scrub Brush/Sponge','Medline Industries, Inc.','63ad4d3d-d701-4e4c-8693-2b9929ce9e26','2022-02-26 19:53:12','2022-04-23 17:13:49',31,2),(92,92,'CARE ONE','AMERICAN SALES COMPANY','db363351-9f2c-4f29-b6f3-2437b809e426','2022-07-12 23:15:48','2022-01-06 16:26:56',15,2),(93,93,'Dove','Conopco Inc. d/b/a Unilever','ca63b6fd-26cd-474e-aa14-421f8f2bdef4','2022-01-31 02:28:29','2022-08-29 09:26:16',49,2),(94,94,'Gelato Topical Anesthetic','Mycone Dental Supply Co., Inc DBA Keystone Industries and Deepak Products Inc','d4c4945f-f415-43c9-8137-e5ffce6dc5ae','2022-09-14 03:16:58','2021-12-23 09:10:55',33,2),(95,95,'Letrozole','Accord Healthcare, Inc.','fdf448f8-51d2-4ade-982d-8c1805049226','2022-09-17 13:21:54','2022-07-14 03:19:26',20,2);
/*!40000 ALTER TABLE muestras ENABLE KEYS */;
/*UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-26  0:06:10
