-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: marshall
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `description` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `banner` longtext,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'LOA NGHE TRONG NHÀ','marshall-loatrongnha','LOA MARSHALL'),(2,'TAI NGHE MARSHALL','marshall-tainghe',''),(3,'LOA DI ĐỘNG','marshall-loadidong','LOA MARSHALL');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `media_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `source` longtext NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`media_id`),
  KEY `fk_constrainst_product3_idx` (`product_id`),
  CONSTRAINT `fk_constrainst_product3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-01.webp',10),(2,'image','http://res.cloudinary.com/dzrtiatsj/image/upload/v1698913156/nm1nau22gqqzwtqih0nn.webp',10),(3,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-03.webp',10),(4,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-04.webp',10),(5,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-05.webp',10),(6,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-02.webp',10),(7,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Tang-ngay-01-goi-Marshall-16.png',11),(8,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-03.png',11),(9,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-01.png',11),(10,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-03.png',11),(11,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-02.png',11),(12,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-01.png',11),(13,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-stanmore-iii-black-01.webp',12),(14,'image','http://res.cloudinary.com/dzrtiatsj/image/upload/v1698910571/ovfbweqxyatrladikuta.webp',12),(15,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-stanmore-iii-black-03.webp',12),(16,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-stanmore-iii-black-04.webp',12),(17,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-stanmore-iii-black-05.webp',12),(18,'image','http://res.cloudinary.com/dzrtiatsj/image/upload/v1698910649/nyj2galli3arki6oogng.webp',12),(19,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-01.webp',13),(20,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-02.webp',13),(21,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-03.webp',13),(22,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-04.webp',13),(23,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-05.webp',13),(24,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-acton-iii-black-02.webp',13),(25,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-01-1.png',14),(26,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-03.png',14),(27,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-02.png',14),(28,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-01-1.png',14),(29,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-03.png',14),(30,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-woburn-ii-bt-black-02.png',14),(31,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton-2_BlacknBrass.png',15),(32,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton-1_BlacknBrass.png',15),(33,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton_large-4.png',15),(34,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton-3_BlacknBrass.png',15),(35,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton_large-2.png',15),(36,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Emberton-4_BlacknBrass.png',15),(37,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-01.webp',16),(38,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-02.webp',16),(39,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-03.webp',16),(40,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-04.webp',16),(41,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-02.webp',16),(42,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-01.webp',16),(43,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-kilburn-ii-black-brass-01.png',17),(44,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-kilburn-ii-black-brass-03.png',17),(45,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-kilburn-ii-black-brass-02-1.png',17),(46,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/new-pos-marshall-kilburn-ii-black-01.png',17),(47,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/new-pos-marshall-kilburn-ii-black-02.png',17),(48,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Kilburn-II_POS-4.png',17),(49,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-01.webp',18),(50,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-04.webp',18),(51,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-05.webp',18),(52,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-01.webp',18),(53,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-04.webp',18),(54,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-05.webp',18),(55,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-speakers-tufton-black-01.png',19),(56,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-tufton-black-brass-03.png',19),(57,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-speakers-tufton-black-01.png',19),(58,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-speakers-tufton-black-02.png',19),(59,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-tufton-black-brass-03.png',19),(60,'image','https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-speakers-tufton-black-01.png',19),(169,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911131/ho6wkljyx79g7gbcx3ua.png',73),(170,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911143/wh5znmfmzay22cm3jnyw.png',73),(171,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911155/rvpoijupolde3upibzvj.png',73),(172,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911178/zljhjywpg2fuqrcrjcgu.png',73),(173,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911177/mjxaq7cslmxc7uxsp51t.png',73),(174,NULL,'http://res.cloudinary.com/dzrtiatsj/image/upload/v1698911189/v3ttm3s2jraiv4z8k4gy.png',73);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_name` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `ward` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_constrainst_user_idx` (`user_id`),
  CONSTRAINT `fk_constrainst_user2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (77,'Phạm Thanh Lâm',NULL,'2023-09-22 23:30:59','pending','lam@gmail.com','0338657212','thai nguyen','Tỉnh Thái Nguyên','Thành phố Thái Nguyên','Phường Quán Triều'),(87,'vinhsoooooo',NULL,'2023-10-18 10:39:26','pending','vinh@gmail.com','0868741814','','Tỉnh Lai Châu','Huyện Mường Tè','Xã Nậm Khao'),(88,'phamthanhlam',NULL,'2023-10-18 16:38:35','pending','lam@gmail.com','0868741814','','Tỉnh Vĩnh Phúc','Thành phố Phúc Yên','Phường Phúc Thắng'),(89,'phamlam',NULL,'2023-10-30 14:57:22','pending','lp76500@gmail.com','0868741814','','Tỉnh Thái Nguyên','Thành phố Thái Nguyên','Phường Quán Triều'),(90,'vinhsooooo',NULL,'2023-10-30 15:02:18','pending','vinh11@gmail.com','0866741814','','Tỉnh Thái Nguyên','Thành phố Sông Công','Phường Cải Đan'),(91,'Phạm Thanh Lâm',NULL,'2023-11-03 08:21:37','pending','lam29@gmail.com','0868741814','','Thành phố Hà Nội','Quận Cầu Giấy','Phường Nghĩa Đô'),(92,'fghd',NULL,'2023-11-15 16:29:13','pending','lam@gmail.com','0868741814','','Tỉnh Vĩnh Phúc','Thành phố Phúc Yên','Phường Phúc Thắng');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(45) DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `fk_constrainst_order_idx` (`order_id`),
  KEY `fk_constrainst_product_idx` (`product_id`),
  CONSTRAINT `fk_constrainst_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_constrainst_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (103,'2',87,10),(104,'1',87,11),(105,'1',87,12),(106,'1',87,13),(107,'1',87,17),(108,'1',88,11),(109,'2',89,15),(110,'2',90,15),(111,'3',91,17),(112,'6',92,11);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `number` int NOT NULL,
  `price` bigint NOT NULL,
  `sale` double DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_constrainst_category_idx` (`category_id`),
  CONSTRAINT `fk_constrainst_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (10,'MARSHALL WOBURN 3',101,14890000,37,2),(11,'MARSHALL MAJOR 4',10,3890000,23,2),(12,'MARSHALL STANMORE 3',10,9990000,31,1),(13,'MARSHALL ACTON 3',11,6900000,15,1),(14,'MARSHALL WOBURN 2',11,10390000,31,1),(15,'MARSHALL EMBERTON',11,4690000,34,3),(16,'MARSHALL EMBER 2',11,4290000,16,3),(17,'MARSHALL KILBURN 2',11,6690000,17,3),(18,'MARSHALL MIDDLETON',11,8990000,20,3),(19,'MARSHALL TUFTON',11,9590000,20,3),(73,'MARSHALL STANMORE 2',10,7490000,21,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `user_id` int NOT NULL,
  `street` varchar(45) DEFAULT NULL,
  `suite` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_constrainst_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) DEFAULT NULL,
  `wattage` int NOT NULL,
  `frequency` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `weight` varchar(100) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,NULL,150,'50 Hz-20kHz','400 x 317 x 203','7.5'),(2,NULL,80,'50 Hz-20kHz','350 x 203 x 188 ','4.25 '),(3,NULL,60,'50 Hz-20kHz','260 x 170 x 150','2.85 '),(4,NULL,120,'50 Hz-20kHz','400 x 310 x 200','8.55'),(5,NULL,20,'60 Hz-20kHz','68mm x 160mm x 76','0.7'),(6,NULL,20,'60 Hz-20kHz','68 x 160 x 76','0.7'),(7,NULL,36,'52 Hz-20kHz','243x162x140','2.5'),(8,NULL,60,'50 Hz-20kHz','109 x 230 x 95','1.8'),(9,NULL,80,'40 Hz-20kHz','229x163x350','4.9'),(16,NULL,80,'50 Hz-20kHz','350 x 195 x 185 ','4.65');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_product`
--

DROP TABLE IF EXISTS `tag_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_product` (
  `tag_product_id` int NOT NULL AUTO_INCREMENT,
  `tag_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`tag_product_id`),
  KEY `fk_constrainst_tag_idx` (`tag_id`),
  KEY `fk_constrainst_product2_idx` (`product_id`),
  CONSTRAINT `fk_constrainst_product2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_constrainst_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_product`
--

LOCK TABLES `tag_product` WRITE;
/*!40000 ALTER TABLE `tag_product` DISABLE KEYS */;
INSERT INTO `tag_product` VALUES (1,1,10),(2,2,12),(3,3,13),(4,4,14),(5,5,15),(6,6,16),(7,7,17),(8,8,18),(9,9,19),(16,16,73);
/*!40000 ALTER TABLE `tag_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'admin@gmail.com','$2b$10$vnGIHGJcDY8RapBUum4Obu8XWxLAK3hQmy6U06kF3tvsiLQL5BH82','admin',1),(17,'lam123@gmail.com','$2b$10$LJp9l0UzM.RKal4ssbJogegyzRhz40I/7qjHgW4cz7X7/UZB1Npu6','pham thanh lam',NULL),(18,'lam11@gmail.com','$2b$10$FiL7l1wL.gwT.1UXGCSCTuc0DlU.BViAHmQYNtDJPf4efSJrINE8G','lamm',NULL),(19,'lam123@gmail.co','$2b$10$JVSa5abuBT35l5SSUP3WROW1SSK3JYLxNEa6TFDl2VdTj2tlZQrtC','phamlam',NULL),(20,'lam29@gmail.com','$2b$10$dzcZYgDhAZvU4c03Esxbg.m/hsmY7TmYlVKP65.I3d2c0o3CQIPli','Phạm Thanh Lâm',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-19  0:16:56
