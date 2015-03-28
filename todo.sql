/*
SQLyog Community v11.27 (64 bit)
MySQL - 5.6.21-log : Database - todo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `projects` */

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `projects` */

insert  into `projects`(`id`,`name`,`description`,`created`) values (1,'TheTribez','TheTribez game','2014-10-01 16:29:07'),(2,'Castlez','Castlez game','2014-10-01 16:17:43');

/*Table structure for table `task_hours` */

DROP TABLE IF EXISTS `task_hours`;

CREATE TABLE `task_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `key` date NOT NULL,
  `value` float(3,1) NOT NULL,
  `note` text NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_id` (`task_id`,`key`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

/*Data for the table `task_hours` */

insert  into `task_hours`(`id`,`task_id`,`key`,`value`,`note`,`created`,`updated`) values (6,1,'2014-10-14',6.0,'','2014-10-02 14:35:03','2014-11-12 17:47:07'),(12,1,'2014-10-15',2.0,'11','2014-10-03 11:07:14','2014-10-06 14:40:10'),(58,1,'2014-10-17',4.0,'1233','2014-10-03 15:54:02','2014-10-21 18:04:22'),(60,1,'2014-10-18',3.0,'1','2014-10-03 15:55:49','2014-10-06 14:26:59'),(61,1,'2014-10-19',2.0,'1','2014-10-03 15:56:04','2014-10-06 13:41:16'),(70,1,'2014-10-20',8.0,'2','2014-10-03 16:05:29','2014-10-06 14:43:59'),(74,1,'2014-10-13',3.0,'1sdsd','2014-10-03 16:16:56','2014-10-21 18:02:56'),(93,1,'2014-03-11',3.0,'1','2014-10-06 13:55:11','2014-10-06 14:54:01'),(112,1,'2014-03-12',3.0,'','2014-10-06 14:54:10','2014-10-06 15:39:35'),(113,1,'2014-01-10',1.0,'','2014-10-06 14:54:21','2014-10-06 14:54:21'),(115,1,'2014-10-22',1.0,'','2014-10-21 18:03:07','2014-10-21 18:03:10'),(119,2,'2014-10-14',2.0,'','2014-10-22 14:59:08','2014-10-22 14:59:08'),(120,1,'2014-10-09',2.0,'','2014-11-07 16:44:19','2014-11-07 16:44:19'),(121,1,'2014-10-10',1.0,'','2014-11-07 16:44:23','2014-11-07 16:44:23');

/*Table structure for table `tasks` */

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `labor` float(3,1) NOT NULL,
  `status` enum('new','accepted','complited') NOT NULL DEFAULT 'new',
  `priority` enum('low','medium','hight','veryhight') NOT NULL DEFAULT 'low',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tasks` */

insert  into `tasks`(`id`,`project_id`,`user_id`,`name`,`description`,`created`,`updated`,`labor`,`status`,`priority`,`enabled`) values (1,1,1,'Support Develop','<p>develop support info system111</p>\n','2014-10-02 09:33:14','2014-11-12 17:47:07',23.5,'new','veryhight',1),(2,1,7,'Payment fb','','2014-10-22 14:56:16','2014-10-22 14:59:44',0.5,'accepted','medium',1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(25) DEFAULT NULL,
  `filters` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`role`,`filters`,`username`,`email`,`password`,`created`,`updated`) values (1,'ADMIN','{\"status\":[\"new\",\"accepted\",\"complited\"]}','Алексей Павлов','pavlov@divo-games.com','123','2014-10-02 09:32:33','2014-11-12 16:12:01'),(7,'PM','','Денис Петров','petrov@divo-games.com','123','2014-10-22 14:50:18','2014-11-12 18:22:30');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
