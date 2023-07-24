-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2023 at 09:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `typeorm`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `fullname` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `message` text NOT NULL,
  `yacht_name` text NOT NULL,
  `price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `count_adult` int(11) NOT NULL DEFAULT 0,
  `count_children` int(11) NOT NULL DEFAULT 0,
  `from_date` datetime NOT NULL,
  `to_date` datetime NOT NULL,
  `yacht_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `created_at`, `updated_at`, `deleted_at`, `fullname`, `phone`, `email`, `message`, `yacht_name`, `price`, `total_price`, `count_adult`, `count_children`, `from_date`, `to_date`, `yacht_id`) VALUES
(1, '2023-06-05 01:12:07.208715', '2023-06-05 01:12:07.208715', NULL, 'Pervin Pashazade', '+994552790634', 'pervin@gmail.com', 'message', 'Eva', 2500, 28200, 10, 4, '2023-06-05 00:00:00', '2023-06-05 03:00:00', 6),
(2, '2023-06-05 10:20:05.996602', '2023-06-05 10:20:05.996602', NULL, 'Ramil Huseynov', '+994556667788', 'ramil@gmail.com', 'trst', 'Majesty 60', 1500, 152900, 2, 0, '2023-06-01 00:30:00', '2023-06-05 01:30:00', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2c2d14769d32c5af7ea4f9aea83` (`yacht_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_2c2d14769d32c5af7ea4f9aea83` FOREIGN KEY (`yacht_id`) REFERENCES `yachts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
