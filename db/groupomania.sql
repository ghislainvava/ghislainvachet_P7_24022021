-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 07 mai 2021 à 09:29
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE database test;
use test;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `CommentGroupomania`
--

CREATE TABLE `CommentGroupomania` (
  `Id_commentaire` int(11) NOT NULL,
  `id_PostComment` int(11) DEFAULT NULL,
  `date_commentaire` timestamp NOT NULL DEFAULT current_timestamp(),
  `commentaire` varchar(500) DEFAULT NULL,
  `createur` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `CommentGroupomania`
--

INSERT INTO `CommentGroupomania` (`Id_commentaire`, `id_PostComment`, `date_commentaire`, `commentaire`, `createur`) VALUES
(5, 6, '2021-05-05 08:44:07', 'je commente ton post', 7),
(7, 7, '2021-05-05 09:38:41', 't\'es pas le seul', 8);

-- --------------------------------------------------------

--
-- Structure de la table `PostGroupomania`
--

CREATE TABLE `PostGroupomania` (
  `id_Post` int(11) NOT NULL,
  `id_User` int(11) DEFAULT NULL,
  `SujetPost` varchar(500) DEFAULT NULL,
  `date_post` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `PostGroupomania`
--

INSERT INTO `PostGroupomania` (`id_Post`, `id_User`, `SujetPost`, `date_post`, `image`) VALUES
(3, 4, 'il fait beau aujourd\'hui', '2021-05-05 08:26:59', NULL),
(4, 4, 'j\'aime ecrire des post\n', '2021-05-05 08:27:22', NULL),
(6, 4, 'lulu écrit pour vous', '2021-05-05 08:34:52', NULL),
(7, 7, 'moi aussi j\'écris un post\n', '2021-05-05 08:43:54', NULL),
(8, 8, 'Un post pour un jour, un post pour toujours\n', '2021-05-05 09:38:28', NULL),
(9, 9, 'dsfsdf', '2021-05-05 15:30:57', NULL),
(10, 9, 'ok', '2021-05-05 15:33:14', NULL),
(11, 9, 'des', '2021-05-05 16:04:02', NULL),
(13, 9, 'gsdfh', '2021-05-05 16:09:04', 'patate'),
(36, 3, 'wgrsnqgrqbr', '2021-05-05 18:12:27', 'http://localhost:3000/images/'),
(37, 3, 'swdfbsqnset', '2021-05-05 18:13:38', 'http://localhost:3000/images/'),
(38, 3, 'newtest', '2021-05-06 08:12:41', NULL),
(39, 3, 'newtestwhis', '2021-05-06 08:13:30', NULL),
(40, 3, 'newtestwhisImage', '2021-05-06 08:15:06', NULL),
(41, NULL, NULL, '2021-05-06 08:45:27', NULL),
(42, NULL, NULL, '2021-05-06 08:45:31', NULL),
(43, 3, 'lolo', '2021-05-06 08:50:29', NULL),
(44, 3, 'sdgf', '2021-05-06 09:06:02', NULL),
(45, 3, 'sdfsfd', '2021-05-06 09:06:39', NULL),
(46, 3, 'sdfsdfsd', '2021-05-06 11:16:15', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `userGroupamania`
--

CREATE TABLE `userGroupamania` (
  `id` int(11) NOT NULL,
  `InputPseudo` varchar(100) DEFAULT NULL,
  `InputName` varchar(100) DEFAULT NULL,
  `InputLastName` varchar(100) DEFAULT NULL,
  `InputEmail` varchar(255) DEFAULT NULL,
  `InputPassword` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `userGroupamania`
--

INSERT INTO `userGroupamania` (`id`, `InputPseudo`, `InputName`, `InputLastName`, `InputEmail`, `InputPassword`, `isAdmin`) VALUES
(3, 'ghis', 'ghis', 'ghis', 'ghis@free.fr', '$2b$10$xwe5F3ar6TTwIj23r1FdUewV9XqGdMd6QjfZ.ngKMRO9cdjCw4cOi', 1),
(4, 'lulu', 'lulu', 'lulu', 'lulu@free.fr', '$2b$10$Ns8wVB15j/HT1QBKv/YTs.HSUa07.QbFXhuXUFkkDkmUkyT2dTtBS', 0),
(6, 'lulu', 'lu', 'lulu', 'lulu@free.fr', '$2b$10$7rNSKEwLtY2ppMaOLSlgtuzDn1X90jRI7qlL5quGLENtZflbx7hLq', 0),
(7, 'titi', 'titi', 'itti', 'titi@free.Fr', '$2b$10$IzHJdUn/7/lCGCmx6xZWIuHoJxyF33Mk2ILEYZNdrkOXb.OM.Mniq', 0),
(8, 'jojoj', 'jojo', 'jojo', 'jojo@free.fr', '$2b$10$dDMYejYYWnG6qcOfYH22Ae0GXXpBS5J6H7ZG.8MEQvO94.UNd2ZOK', 0),
(9, 'coco', 'ococ', 'coco', 'coco@free.fr', '$2b$10$VRB43BUJ3pg4NO9e8FC85.OvXeA11qTH3AHUdF.rU.ykICHrYO4sS', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `CommentGroupomania`
--
ALTER TABLE `CommentGroupomania`
  ADD PRIMARY KEY (`Id_commentaire`),
  ADD KEY `createur` (`createur`);

--
-- Index pour la table `PostGroupomania`
--
ALTER TABLE `PostGroupomania`
  ADD PRIMARY KEY (`id_Post`),
  ADD KEY `Id_User` (`id_User`);

--
-- Index pour la table `userGroupamania`
--
ALTER TABLE `userGroupamania`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `CommentGroupomania`
--
ALTER TABLE `CommentGroupomania`
  MODIFY `Id_commentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `PostGroupomania`
--
ALTER TABLE `PostGroupomania`
  MODIFY `id_Post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `userGroupamania`
--
ALTER TABLE `userGroupamania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `CommentGroupomania`
--
ALTER TABLE `CommentGroupomania`
  ADD CONSTRAINT `commentgroupomania_ibfk_1` FOREIGN KEY (`createur`) REFERENCES `PostGroupomania` (`Id_User`) ON DELETE CASCADE;

--
-- Contraintes pour la table `PostGroupomania`
--
ALTER TABLE `PostGroupomania`
  ADD CONSTRAINT `postgroupomania_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `userGroupamania` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
