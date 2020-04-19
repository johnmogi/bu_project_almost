-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 19, 2020 at 01:45 PM
-- Server version: 10.3.20-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourist`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `userID` int(10) NOT NULL,
  `vacationID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationID`) VALUES
(13, 2),
(13, 2),
(13, 8),
(13, 2),
(23, 21),
(23, 17),
(13, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` int(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`, `role`) VALUES
(8, 'test', '1', '1', '1', 1, 'Admin'),
(13, '2', '2', '2', '2', 0, 'User'),
(14, '4', '4', '4', '4', 0, 'user'),
(15, '5', '5', '5', '5', 0, 'user'),
(16, '6', '6', '6', '6', 0, 'user'),
(17, '88', '888', '888', '88', 0, 'user'),
(18, '45', '45', '45', '45', 0, 'user'),
(19, '21', '21', '21', '21', 0, 'user'),
(20, '33', '33', '33', '33', 0, 'user'),
(21, 'ayelet', 'ayelet', 'ayelet', 'ayelet', 0, 'user'),
(22, '5', '5', '5', '5', 0, 'user'),
(23, 'or', 'or', 'or', 'or', 0, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
CREATE TABLE `vacations` (
  `vacationID` int(10) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `destination` varchar(80) NOT NULL,
  `picFileName` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(65,0) NOT NULL,
  `followed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `picFileName`, `startDate`, `endDate`, `price`, `followed`) VALUES
(1, 'Located in Stone Town within a short walk of Shangani Beach, Garden Lodge is within a few miles (5 km) of other popular sights such as Nakupenda Beach. This 18-room hotel has free breakfast along with conveniences like free in-room WiFi and a rooftop terrace. ', 'zanzibar', '1.jpeg', '2020-04-15', '2020-04-29', '1600', 0),
(2, 'Located in Stone Town within a short walk of Shangani Beach, Garden Lodge is within a few miles (5 km) of other popular sights such as Nakupenda Beach. This 18-room hotel has free breakfast along with conveniences like free in-room WiFi and a rooftop terrace. ', 'zanzibar', '2.jpeg', '2020-04-15', '2020-04-29', '1579', 0),
(4, 'bug gig me up', 'Madagaskar', '3.jpeg', '2020-03-18', '2020-03-25', '1900', 0),
(6, 'DJ drezland', 'Europe', '4.jpeg', '2018-03-18', '2020-03-25', '3000', 0),
(7, 'kjhkjhbknkhnkjnkjcgdfhfgnhmkjhgttr4w4y77655', 'aefsqef', '5.jpeg', '2020-03-17', '2020-03-03', '868685', 0),
(8, 'lorem ipsum', 'Germany', '6.jpeg', '2020-03-24', '2020-03-31', '200', 0),
(9, 'lorem ipsum', 'Pacific', '7.jpeg', '2020-03-24', '2020-03-31', '350', 0),
(10, 'lorem ipsum', 'China', '8.jpeg', '2020-03-24', '2020-03-31', '25', 0),
(11, 'Call the police', 'Mexico', '9.jpeg', '2020-03-24', '2020-03-31', '3500', 0),
(12, 'Worst city in the world', 'Israel', '10.jpeg', '2020-03-24', '2020-03-31', '45000', 0),
(17, 'bug gig me up', 'Madagaskar', '3.jpeg', '2020-03-25', '2020-03-13', '1900', 0),
(21, 'Jurrassic Journey', '100000 BC', '11.jpg', '0001-04-01', '0002-04-01', '350000', 0),
(32, 'Visit Gengis Khna as he emerges victorious upon hordes of attacks on ancient Europe, in comparison to those times, contamination seems like a solid idea....', 'Prehystoric Asia', '7.jpeg', '2020-04-29', '2020-04-30', '45000', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
