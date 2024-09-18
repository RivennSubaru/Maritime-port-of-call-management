-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 18 sep. 2024 à 13:02
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestionescale`
--

-- --------------------------------------------------------

--
-- Structure de la table `changements`
--

DROP TABLE IF EXISTS `changements`;
CREATE TABLE IF NOT EXISTS `changements` (
  `idChange` int NOT NULL AUTO_INCREMENT,
  `idNav` int NOT NULL,
  `idQuai` int NOT NULL,
  `typeChange` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `dateChange` datetime NOT NULL,
  PRIMARY KEY (`idChange`),
  KEY `idNav` (`idNav`),
  KEY `idQuai` (`idQuai`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `changements`
--

INSERT INTO `changements` (`idChange`, `idNav`, `idQuai`, `typeChange`, `dateChange`) VALUES
(3, 3, 3, 'escale', '2024-09-13 09:57:17'),
(4, 3, 4, 'escale', '2024-08-15 09:59:25'),
(5, 3, 4, 'escale', '2024-08-16 06:57:16'),
(19, 1, 2, 'escale', '2024-09-06 04:11:07'),
(21, 3, 4, 'escale', '2024-09-06 05:07:21'),
(22, 1, 8, 'escale', '2024-09-06 05:29:35');

-- --------------------------------------------------------

--
-- Structure de la table `escales`
--

DROP TABLE IF EXISTS `escales`;
CREATE TABLE IF NOT EXISTS `escales` (
  `idEscale` int NOT NULL AUTO_INCREMENT,
  `idNav` int NOT NULL,
  `idQuai` int NOT NULL,
  `numEscale` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `ETD` datetime DEFAULT NULL,
  `ETA` datetime DEFAULT NULL,
  `provenance` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `destination` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ATA` datetime DEFAULT NULL,
  `ATD` datetime DEFAULT NULL,
  `typeMouvement` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `etatEscale` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `dateCreationEscale` datetime NOT NULL,
  PRIMARY KEY (`idEscale`),
  KEY `escale_ibfk_1` (`idNav`),
  KEY `escale_ibfk_2` (`idQuai`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `escales`
--

INSERT INTO `escales` (`idEscale`, `idNav`, `idQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `ATA`, `ATD`, `typeMouvement`, `etatEscale`, `dateCreationEscale`) VALUES
(1, 2, 3, '2420240800083004', '2024-08-07 00:00:00', '2024-08-15 00:00:00', 'Diego', 'Toamasina', '2024-08-22 14:47:09', NULL, 'Entrant', 'Terminé', '2024-08-01 15:04:43'),
(3, 3, 3, '242024080008523314', '2024-08-07 16:40:00', '2024-08-11 00:10:00', 'Diego', 'Toamasina', '2024-09-13 15:08:48', '2024-08-07 20:15:00', 'Entrant', 'Terminé', '2024-08-03 15:04:43'),
(4, 3, 4, '2420240300031245', '2024-08-08 16:03:24', '2024-08-31 16:03:24', 'Diego', 'Toamasina', '2024-08-15 16:03:24', '2024-08-08 16:03:24', 'Entrant', 'Terminé', '2024-08-13 13:03:24'),
(5, 3, 4, '2420240300031245', '2024-08-08 16:03:24', '2024-08-31 16:03:24', 'Diego', 'Toamasina', '2024-08-16 16:03:24', '2024-08-08 16:03:24', 'Entrant', 'Terminé', '2024-08-13 13:03:24'),
(8, 5, 6, '2420240800082241', '2024-08-16 14:17:45', '2024-08-30 14:17:45', 'Toamasina', 'USA', NULL, '2024-08-16 14:19:39', 'Sortant', 'Actif', '2024-08-16 11:17:45'),
(12, 1, 3, '242024080008330256', '2024-08-23 02:10:00', '2024-08-23 00:00:00', 'Antananarivo Province', 'Balkh', '2024-08-23 21:56:46', '2024-08-23 21:51:38', 'Entrant', 'Terminé', '2024-08-23 21:15:43'),
(16, 1, 2, '242024080008330256', '2024-08-20 00:00:00', '2024-09-06 00:00:00', 'Badghis', 'Balkh', '2024-09-06 04:11:06', '2024-08-27 14:20:08', 'Entrant', 'Terminé', '2024-08-27 14:17:41'),
(17, 1, 3, '242024080008330256', '2024-08-13 00:00:00', '2024-08-27 00:00:00', 'Badakhshan', 'Badghis', '2024-08-27 14:27:27', NULL, 'Entrant', 'Terminé', '2024-08-27 14:26:41'),
(18, 1, 1, '242024080008330256', '2024-08-20 00:00:00', '2024-08-27 00:00:00', 'Badghis', 'Badghis', '2024-08-27 17:47:51', NULL, 'Entrant', 'Terminé', '2024-08-27 17:47:40'),
(20, 3, 3, '242024080008523314', '2024-08-28 00:00:00', '2024-08-31 00:00:00', 'City of London', 'Toamasina Province', NULL, NULL, 'Entrant', 'Prévu', '2024-08-28 03:52:13'),
(21, 2, 4, '2420240900093004', '2024-09-06 00:00:00', '2024-09-20 00:00:00', 'Badghis', 'Faryab', NULL, '2024-09-06 04:06:21', 'Entrant', 'Actif', '2024-09-06 04:05:58'),
(22, 3, 4, '242024090009523314', '2024-09-01 00:00:00', '2024-09-06 00:00:00', 'Balkh', 'Baghlan', '2024-09-06 05:07:21', '2024-09-06 05:02:13', 'Entrant', 'Terminé', '2024-09-06 04:50:35'),
(23, 1, 8, '242024090009330256', '2024-09-01 00:00:00', '2024-09-06 00:00:00', 'Devoll District', 'Bamyan', '2024-09-06 05:29:35', '2024-09-06 05:28:31', 'Entrant', 'Terminé', '2024-09-06 05:28:04');

-- --------------------------------------------------------

--
-- Structure de la table `navires`
--

DROP TABLE IF EXISTS `navires`;
CREATE TABLE IF NOT EXISTS `navires` (
  `idNav` int NOT NULL AUTO_INCREMENT,
  `idPilote` int NOT NULL,
  `typeNav` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `numNav` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `nomNav` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `tirantEau` int NOT NULL,
  `longueursNav` int NOT NULL,
  `situationNav` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parti',
  PRIMARY KEY (`idNav`),
  UNIQUE KEY `numNav` (`numNav`),
  KEY `navire_ibfk_2` (`idPilote`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `navires`
--

INSERT INTO `navires` (`idNav`, `idPilote`, `typeNav`, `numNav`, `nomNav`, `tirantEau`, `longueursNav`, `situationNav`) VALUES
(1, 3, 'passager', '330256', 'Mercy Ships', 100, 200, 'Amarré'),
(2, 12, 'marchandise diverse', '3004', 'VOLAZARA', 20, 20, 'parti'),
(3, 9, 'passager', '523314', 'Logos Hope', 100, 20000, 'Amarré'),
(5, 13, 'marchandise diverse', '007', 'Sunny', 100, 20000, 'Amarré');

-- --------------------------------------------------------

--
-- Structure de la table `pilotes`
--

DROP TABLE IF EXISTS `pilotes`;
CREATE TABLE IF NOT EXISTS `pilotes` (
  `idPilote` int NOT NULL AUTO_INCREMENT,
  `nomPilote` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenomPilote` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telPilote` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `emailPilote` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idPilote`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pilotes`
--

INSERT INTO `pilotes` (`idPilote`, `nomPilote`, `prenomPilote`, `telPilote`, `emailPilote`) VALUES
(1, 'RAMIARAKA', 'Jesse Kristopher', '0324578945', 'inosukerami@gmail.com'),
(2, 'MAHAFENO', 'Robert Theresien', '0328485163', 'theresienrobert@gmail.com'),
(3, 'MIANDRA', 'Roberto', '0324325796', 'miandraricardo@gmail.com'),
(6, 'RAKOTOARIVELO', 'Ando ', '0335486524', 'andorak@gmail.com'),
(9, 'NOMENJANAHARY', 'Euphremino Roméo', '0334477755', 'romeoeuphrem@gmail.com'),
(10, 'ANDRIAMIHAJA', 'Antsotiana Giovanni', '0385249547', 'nixangel@gmail.com'),
(11, 'Lorem', 'Upsum', '0329999999', 'loremipsum@gmail.com'),
(12, 'Red', 'Eric', '0331122355', 'rederic@gmail.com'),
(13, 'Harifetra', 'Anthony', '0341100232', 'anthony@gmail.com'),
(14, 'VOAHIRANA', 'Bloom', '0324478952', 'bloom@gmail.com'),
(15, 'GREYRAT', 'Rudeus', '0324578945', 'grey@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `quais`
--

DROP TABLE IF EXISTS `quais`;
CREATE TABLE IF NOT EXISTS `quais` (
  `idQuai` int NOT NULL AUTO_INCREMENT,
  `nomQuai` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `emplacementQuai` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `profondeurQuai` int NOT NULL,
  `longueursQuai` int NOT NULL,
  PRIMARY KEY (`idQuai`),
  UNIQUE KEY `nomQuai` (`nomQuai`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `quais`
--

INSERT INTO `quais` (`idQuai`, `nomQuai`, `emplacementQuai`, `profondeurQuai`, `longueursQuai`) VALUES
(1, 'Mole A-Est', 'emplacement 1', 50, 100),
(2, 'Mole A-Ouest', 'emplacement 2', 100, 100),
(3, 'Mole B', 'emplacement 3', 150, 200),
(4, 'Mole C1', 'emplacement 4', 250, 500),
(5, 'Mole C2', 'emplacement 5', 250, 500),
(6, 'Mole C3', 'emplacement 6', 250, 500),
(7, 'Quai sherrite', 'emplacement 7', 200, 400),
(8, 'Quai plage', 'emplacement 8', 50, 100);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `srcImg` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idUser`, `pseudo`, `password`, `role`, `srcImg`) VALUES
(7, 'Kristopher Jesse', '$2a$10$EFTgoVqbCaN08i4rlgkgVu2Mdctu6Uu2Cgvk9HS5.x06/MpqZDirm', 'user', NULL),
(9, 'Riven', '$2a$10$Cw0UKCNQGd3gVCn90Edkb.We.1AhRry7kl3QeVWyioJYvUQh4XYEi', 'admin', NULL),
(11, 'Anthony', '$2a$10$ysRgYLO/8ElsksPJ2tqpj.xdyTh.mFTlFO/uuWjwjwd/q1I9ej5Ha', 'user', NULL),
(12, 'Jean', '$2a$10$y8bX27la3Hp4MusuGwJeOef/wdfBBT80KiFB3nHeS5UT9ZCOOrmm2', 'user', NULL),
(13, 'Ando', '$2a$10$ZNaPD.yrPa743ZsWQW6.zuLnQ1InEljak4AHEypxI3Uf.IogGwg.e', 'user', NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `changements`
--
ALTER TABLE `changements`
  ADD CONSTRAINT `changements_ibfk_1` FOREIGN KEY (`idNav`) REFERENCES `navires` (`idNav`),
  ADD CONSTRAINT `changements_ibfk_2` FOREIGN KEY (`idQuai`) REFERENCES `quais` (`idQuai`);

--
-- Contraintes pour la table `escales`
--
ALTER TABLE `escales`
  ADD CONSTRAINT `escales_ibfk_1` FOREIGN KEY (`idNav`) REFERENCES `navires` (`idNav`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `escales_ibfk_2` FOREIGN KEY (`idQuai`) REFERENCES `quais` (`idQuai`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `navires`
--
ALTER TABLE `navires`
  ADD CONSTRAINT `navires_ibfk_2` FOREIGN KEY (`idPilote`) REFERENCES `pilotes` (`idPilote`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
