-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2026 at 08:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hahahihi`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(50) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` enum('Tops','Bottoms','Accessories','Shoes') NOT NULL,
  `gender` enum('Boy','Girl','Unisex') NOT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `gender`, `price`, `description`, `image`) VALUES
(1, 'Flanel Shirt', 'Tops', 'Boy', 130000, 'A timeless checkered/plaid pattern.', '../asset/img/product/flanel/flanel1.jpg'),
(2, 'Legends Bomber Jacket', 'Tops', 'Boy', 200000, 'A stylish and durable bomber jacket featuring a classic silhouette and premium materials for a legendary look.', '../asset/img/product/bomber/bomber.jpg'),
(3, 'Camo Puffer Jack', 'Tops', 'Boy', 150000, 'Keep warm and stay hidden with this rugged camo puffer jacket, designed for maximum insulation and outdoor style.', '../asset/img/product/puffer/puffer.jpg'),
(4, 'Camo Pants', 'Bottoms', 'Unisex', 80000, 'The Urban Explorer Camo Joggers Add an edge to the daily wardrobe with these unisex camo joggers. Combining a relaxed fit with a bold monochromatic print, these pants are built for comfort and style. The zip-up pockets ensure small essentials stay safe during play.', '../asset/img/product/camo/camo.jpg'),
(5, 'Blue Jeans Pants', 'Bottoms', 'Unisex', 135000, 'Versatile and durable, these jogger-style jeans feature an elasticated waistband and cuffs for a perfect fit all day long. Made from soft, breathable denim, they are ideal for active play and everyday adventures.', '../asset/img/product/bluejeans/a001.jpg'),
(6, 'Technical Sandals', 'Shoes', 'Boy', 60000, 'Technical sandals with wide straps. Adjustable with two adhesive straps on the instep and ankle, with rubber soles.', '../asset/img/product/techsandals/1.jpg'),
(7, 'Floral Print Dress', 'Tops', 'Girl', 115000, 'Round neck dress with short sleeves and elastic cuffs. Floral print. Back button teardrop closure.', '../asset/img/product/floral/1.jpg\r\n'),
(8, 'Cable-Knit Cotton V-Neck Sweater', 'Tops', 'Girl', 168000, 'A classic cable-knit sweater made from soft cotton, featuring a stylish V-neck design for a timeless look.', '../asset/img/product/sweater-cable-knit/1.avif'),
(9, 'PEANUTS UV Protection Cap', 'Accessories', 'Unisex', 40000, 'Stay protected and stylish with this PEANUTS themed cap, featuring UV protection for sunny days.', '../asset/img/product/peanutcap/1.avif'),
(10, 'Stitch Bucket Hat', 'Accessories', 'Unisex', 92000, 'Adorable and comfortable bucket hat featuring everyone\'s favorite Stitch character.', '../asset/img/product/stitch-bucket-hat/1.jpg'),
(11, 'Square Plastic Sunglasses', 'Accessories', 'Unisex', 30000, 'Square plastic frame sunglasses.\r\n100% UV PROTECTION.', '../asset/img/product/square-plastic-sunglass/1.jpg'),
(12, 'Fruit Charms ', 'Accessories', 'Girl', 25000, 'Fun and colorful fruit-themed charms, perfect for personalizing your favorite accessories.', '../asset/img/product/fruit-charms/1.avif'),
(13, 'Cotton Maxi Skirt', 'Bottoms', 'Girl', 125000, 'Breezy and elegant cotton maxi skirt, designed for comfort and a graceful silhouette.', '../asset/img/product/cotton-maxi-skirt/1.avif'),
(14, 'UEFA Champions League Sandals', 'Shoes', 'Unisex', 35000, 'Sporty and comfortable sandals featuring the official UEFA Champions League branding.', '../asset/img/product/uefa-sandals/1.jpg'),
(15, 'Gingham Flower Pink Legging Pants', 'Bottoms', 'Girl', 75000, 'Introducing the Girls Gingham Flower Pink Leggings , the quintessence of spring-summer chic for SS2026. Designed to elevate the elegance of every young lady\'s wardrobe, these leggings offer unparalleled style and comfort.', '../asset/img/product/gingham-legging/1.webp'),
(16, 'Rainbow Unicorn Crocs', 'Shoes', 'Girl', 45000, 'Let her imagination shine with the Rainbow Unicorn Crocs ', '../asset/img/product/unicorn-crocs/1.webp'),
(17, 'Office Straps Blue Trainer Shoes', 'Shoes', 'Unisex', 155000, 'Introducing the Office Straps Blue Trainers, a quintessential piece for your child\'s SS2026 wardrobe. Seamlessly blending style with comfort, these trainers will set your little one apart from the crowd.', '../asset/img/product/blue-strap-trainers/1.webp'),
(18, 'Classic Brown Cotton Polo Shirt', 'Tops', 'Boy', 110000, 'A timeless and clean cotton polo shirt in rich brown, featuring a soft collar and comfortable premium knit. Perfect for casual weekend outings and smart-casual events.', '../asset/img/product/brown-polo/produk3.jpg'),
(19, 'California Graphic Print Tee', 'Tops', 'Unisex', 85000, 'Super soft crewneck cotton t-shirt with a vintage California graphic print on the front. Relaxed fit, breathable fabric, and high-quality print that stays vibrant after washing.', '../asset/img/product/california-t-shirt/produk 4.jpg'),
(20, 'Urban Cross Streetwear Hoodie', 'Tops', 'Boy', 185000, 'A warm and stylish oversized streetwear hoodie made from premium heavy fleece, detailed with a bold chest cross design. Features a cozy hood, pocket pouch, and ribbed cuffs.', '../asset/img/product/cross-hoodie/produk1.jpg'),
(21, 'Freedom Two-Tone Double Sleeve Shirt', 'Tops', 'Boy', 125000, 'Get a layered streetwear look without the bulk! This comfortable two-tone tee features a short-sleeve over long-sleeve styling with an urban \"Freedom\" typography print.', '../asset/img/product/freedom-double-sleeve/produk 6.jpg'),
(22, 'Jack Premium Utility Shirt Jacket', 'Tops', 'Boy', 195000, 'A highly versatile corduroy jacket-shirt (shacket) made of durable thick-wale corduroy. Can be worn buttoned up as a shirt or open as a light outer layer.', '../asset/img/product/jackoff-shirt/produk 5.jpg'),
(23, 'Marvel Spider-Man Action Print T-Shirt', 'Tops', 'Boy', 90000, 'Bring action to your child\'s day with this official style Spider-Man graphic tee. Crafted in soft breathable jersey cotton to ensure comfort during active superhero playtime.', '../asset/img/product/spiderman-shirt/BAJU1.jpg'),
(24, 'Ballet Flat Shoes', 'Shoes', 'Girl', 150000, 'Beautiful ballet flat shoes for girls.', '../asset/img/product/balet-flat-shoes/G311.jpg'),
(25, 'Blue Headband', 'Accessories', 'Girl', 25000, 'Cute blue headband.', '../asset/img/product/blue-headband/G421.jpg'),
(26, 'Brown Parachute Jacket', 'Tops', 'Boy', 200000, 'Cool brown parachute jacket.', '../asset/img/product/brown-parachute-jacket/foto produk.jpg'),
(27, 'Cream Denim Shacket', 'Tops', 'Boy', 180000, 'Stylish cream denim shacket.', '../asset/img/product/cream-denim-shacket/foto produk.jpg'),
(28, 'Cream Short Skirt', 'Bottoms', 'Girl', 120000, 'Comfortable cream short skirt.', '../asset/img/product/cream-short-skirt/G221.jpg'),
(29, 'Dino Winter Jacket', 'Tops', 'Boy', 250000, 'Warm winter jacket with dinosaur pattern.', '../asset/img/product/dino-winter-jacket/0f903687e09547717e4175c5dd86b85e.jpg'),
(30, 'Gray Polo Sweater', 'Tops', 'Unisex', 160000, 'Classic gray polo sweater.', '../asset/img/product/gray-polo-sweater/foto produk.jpg'),
(31, 'Green Bomber Jacket', 'Tops', 'Boy', 220000, 'Trendy green bomber jacket.', '../asset/img/product/green-bomber-jacket/foto produk.jpg'),
(32, 'Green Wool Jacket', 'Tops', 'Unisex', 240000, 'Elegant green wool jacket.', '../asset/img/product/green-wool-jacket/foto produk.jpg'),
(33, 'Pink Wideleg Pants', 'Bottoms', 'Girl', 170000, 'Fashionable pink wide leg pants.', '../asset/img/product/pink-wideleg/G211.jpg'),
(34, 'Yellow Hair Scrunchie', 'Accessories', 'Girl', 15000, 'Bright yellow hair scrunchie.', '../asset/img/product/yellow-hair-scrunch/G411.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_path`) VALUES
(1, 1, '../asset/img/product/flanel/flanel1.jpg'),
(2, 1, '../asset/img/product/flanel/flanel2.jpg'),
(3, 1, '../asset/img/product/flanel/flanel3.jpg'),
(4, 1, '../asset/img/product/flanel/flanel4.jpg'),
(5, 1, '../asset/img/product/flanel/flanel5.jpg'),
(6, 1, '../asset/img/product/flanel/flanel6.jpg'),
(7, 5, '../asset/img/product/bluejeans/a001.jpg\r\n'),
(8, 5, '../asset/img/product/bluejeans/a002.jpg\r\n'),
(9, 5, '../asset/img/product/bluejeans/a003.jpg\r\n'),
(10, 5, '../asset/img/product/bluejeans/a004.jpg\r\n'),
(11, 5, '../asset/img/product/bluejeans/a005.jpg\r\n'),
(12, 5, '../asset/img/product/bluejeans/a006.jpg\r\n'),
(13, 6, '../asset/img/product/techsandals/1.jpg'),
(14, 6, '../asset/img/product/techsandals/2.jpg'),
(15, 6, '../asset/img/product/techsandals/3.jpg'),
(16, 6, '../asset/img/product/techsandals/4.jpg'),
(17, 6, '../asset/img/product/techsandals/5.jpg'),
(18, 6, '../asset/img/product/techsandals/6.jpg'),
(19, 7, '../asset/img/product/floral/1.jpg'),
(20, 7, '../asset/img/product/floral/2.jpg'),
(21, 7, '../asset/img/product/floral/3.jpg'),
(22, 7, '../asset/img/product/floral/4.jpg'),
(23, 8, '../asset/img/product/sweater-cable-knit/1.avif'),
(24, 8, '../asset/img/product/sweater-cable-knit/2.avif'),
(25, 8, '../asset/img/product/sweater-cable-knit/3.avif'),
(26, 8, '../asset/img/product/sweater-cable-knit/4.avif'),
(27, 9, '../asset/img/product/peanutcap/1.avif'),
(28, 9, '../asset/img/product/peanutcap/2.avif'),
(29, 9, '../asset/img/product/peanutcap/3.avif'),
(30, 9, '../asset/img/product/peanutcap/4.avif'),
(31, 10, '../asset/img/product/stitch-bucket-hat/1.jpg'),
(32, 10, '../asset/img/product/stitch-bucket-hat/2.jpg'),
(33, 11, '../asset/img/product/square-plastic-sunglass/1.jpg'),
(34, 11, '../asset/img/product/square-plastic-sunglass/2.jpg'),
(35, 11, '../asset/img/product/square-plastic-sunglass/3.jpg'),
(36, 11, '../asset/img/product/square-plastic-sunglass/4.jpg'),
(37, 12, '../asset/img/product/fruit-charms/1.avif'),
(38, 12, '../asset/img/product/fruit-charms/2.avif'),
(39, 13, '../asset/img/product/cotton-maxi-skirt/1.avif'),
(40, 13, '../asset/img/product/cotton-maxi-skirt/2.avif'),
(41, 13, '../asset/img/product/cotton-maxi-skirt/3.avif'),
(42, 13, '../asset/img/product/cotton-maxi-skirt/4.avif'),
(43, 14, '../asset/img/product/uefa-sandals/1.jpg'),
(44, 14, '../asset/img/product/uefa-sandals/2.jpg'),
(45, 14, '../asset/img/product/uefa-sandals/3.jpg'),
(46, 14, '../asset/img/product/uefa-sandals/4.jpg'),
(47, 14, '../asset/img/product/uefa-sandals/5.jpg'),
(48, 14, '../asset/img/product/uefa-sandals/6.jpg'),
(49, 15, '../asset/img/product/gingham-legging/1.webp'),
(50, 15, '../asset/img/product/gingham-legging/2.webp'),
(51, 15, '../asset/img/product/gingham-legging/3.webp'),
(52, 15, '../asset/img/product/gingham-legging/4.webp'),
(53, 16, '../asset/img/product/unicorn-crocs/1.webp'),
(54, 16, '../asset/img/product/unicorn-crocs/2.webp'),
(55, 16, '../asset/img/product/unicorn-crocs/3.webp'),
(56, 16, '../asset/img/product/unicorn-crocs/4.webp'),
(57, 17, '../asset/img/product/blue-strap-trainers/1.webp'),
(58, 17, '../asset/img/product/blue-strap-trainers/2.webp'),
(59, 17, '../asset/img/product/blue-strap-trainers/3.webp'),
(60, 17, '../asset/img/product/blue-strap-trainers/4.webp'),
(61, 18, '../asset/img/product/brown-polo/produk3.jpg'),
(62, 18, '../asset/img/product/brown-polo/pose.jpg'),
(63, 18, '../asset/img/product/brown-polo/pose (1).jpg'),
(64, 18, '../asset/img/product/brown-polo/pose (2).jpg'),
(65, 18, '../asset/img/product/brown-polo/pose (3).jpg'),
(66, 18, '../asset/img/product/brown-polo/pose (4).jpg'),
(67, 19, '../asset/img/product/california-t-shirt/produk 4.jpg'),
(68, 19, '../asset/img/product/california-t-shirt/pose 1.jpg'),
(69, 19, '../asset/img/product/california-t-shirt/pose 2.jpg'),
(70, 19, '../asset/img/product/california-t-shirt/pose3.jpg'),
(71, 19, '../asset/img/product/california-t-shirt/pose 4.jpg'),
(72, 19, '../asset/img/product/california-t-shirt/pose 5.jpg'),
(73, 20, '../asset/img/product/cross-hoodie/produk1.jpg'),
(74, 20, '../asset/img/product/cross-hoodie/pose.jpg'),
(75, 20, '../asset/img/product/cross-hoodie/pose(1).jpg'),
(76, 20, '../asset/img/product/cross-hoodie/pose(2).jpg'),
(77, 20, '../asset/img/product/cross-hoodie/pooosse.jpg'),
(78, 21, '../asset/img/product/freedom-double-sleeve/produk 6.jpg'),
(79, 21, '../asset/img/product/freedom-double-sleeve/pose1.jpg'),
(80, 21, '../asset/img/product/freedom-double-sleeve/pose2.jpg'),
(81, 22, '../asset/img/product/jackoff-shirt/produk 5.jpg'),
(82, 22, '../asset/img/product/jackoff-shirt/pose 1.jpg'),
(83, 22, '../asset/img/product/jackoff-shirt/pose3.jpg'),
(84, 22, '../asset/img/product/jackoff-shirt/pose4.jpg'),
(85, 22, '../asset/img/product/jackoff-shirt/pose5.jpg'),
(86, 22, '../asset/img/product/jackoff-shirt/pose6.jpg'),
(87, 23, '../asset/img/product/spiderman-shirt/BAJU1.jpg'),
(88, 23, '../asset/img/product/spiderman-shirt/pose.jpg'),
(89, 23, '../asset/img/product/spiderman-shirt/pose (1).jpg'),
(90, 23, '../asset/img/product/spiderman-shirt/pose (2).jpg'),
(91, 23, '../asset/img/product/spiderman-shirt/pose (3).jpg'),
(92, 24, '../asset/img/product/balet-flat-shoes/G311.jpg'),
(93, 24, '../asset/img/product/balet-flat-shoes/G312.jpg'),
(94, 24, '../asset/img/product/balet-flat-shoes/G313.jpg'),
(95, 24, '../asset/img/product/balet-flat-shoes/G314.jpg'),
(96, 24, '../asset/img/product/balet-flat-shoes/G315.jpg'),
(97, 24, '../asset/img/product/balet-flat-shoes/G316.jpg'),
(98, 25, '../asset/img/product/blue-headband/G421.jpg'),
(99, 25, '../asset/img/product/blue-headband/G422.jpg'),
(100, 25, '../asset/img/product/blue-headband/G423.jpg'),
(101, 25, '../asset/img/product/blue-headband/G424.jpg'),
(102, 25, '../asset/img/product/blue-headband/G425.jpg'),
(103, 25, '../asset/img/product/blue-headband/G426.jpg'),
(104, 26, '../asset/img/product/brown-parachute-jacket/foto produk.jpg'),
(105, 26, '../asset/img/product/brown-parachute-jacket/pose 1.png'),
(106, 26, '../asset/img/product/brown-parachute-jacket/pose 2.png'),
(107, 26, '../asset/img/product/brown-parachute-jacket/pose 3.png'),
(108, 26, '../asset/img/product/brown-parachute-jacket/pose 4.png'),
(109, 26, '../asset/img/product/brown-parachute-jacket/pose 5.png'),
(110, 27, '../asset/img/product/cream-denim-shacket/foto produk.jpg'),
(111, 27, '../asset/img/product/cream-denim-shacket/Gemini_Generated_Image_vz6952vz6952vz69.png'),
(112, 27, '../asset/img/product/cream-denim-shacket/pose 1.png'),
(113, 27, '../asset/img/product/cream-denim-shacket/pose 2.png'),
(114, 27, '../asset/img/product/cream-denim-shacket/pose 3.png'),
(115, 27, '../asset/img/product/cream-denim-shacket/pose4.png'),
(116, 28, '../asset/img/product/cream-short-skirt/G221.jpg'),
(117, 28, '../asset/img/product/cream-short-skirt/G222.jpg'),
(118, 28, '../asset/img/product/cream-short-skirt/G223.jpg'),
(119, 28, '../asset/img/product/cream-short-skirt/G224.jpg'),
(120, 28, '../asset/img/product/cream-short-skirt/G225.jpg'),
(121, 28, '../asset/img/product/cream-short-skirt/G226.jpg'),
(122, 29, '../asset/img/product/dino-winter-jacket/0f903687e09547717e4175c5dd86b85e.jpg'),
(123, 29, '../asset/img/product/dino-winter-jacket/pose 1.png'),
(124, 29, '../asset/img/product/dino-winter-jacket/pose 2(1).png'),
(125, 29, '../asset/img/product/dino-winter-jacket/pose 2.png'),
(126, 29, '../asset/img/product/dino-winter-jacket/pose 4.png'),
(127, 29, '../asset/img/product/dino-winter-jacket/pose 5.png'),
(128, 30, '../asset/img/product/gray-polo-sweater/foto produk.jpg'),
(129, 30, '../asset/img/product/gray-polo-sweater/pose 1.png'),
(130, 30, '../asset/img/product/gray-polo-sweater/pose 2.png'),
(131, 30, '../asset/img/product/gray-polo-sweater/pose 3.png'),
(132, 30, '../asset/img/product/gray-polo-sweater/pose 4.png'),
(133, 30, '../asset/img/product/gray-polo-sweater/pose 5.png'),
(134, 31, '../asset/img/product/green-bomber-jacket/foto produk.jpg'),
(135, 31, '../asset/img/product/green-bomber-jacket/pose 1.png'),
(136, 31, '../asset/img/product/green-bomber-jacket/pose 2.png'),
(137, 31, '../asset/img/product/green-bomber-jacket/pose 3.png'),
(138, 31, '../asset/img/product/green-bomber-jacket/pose 4.png'),
(139, 31, '../asset/img/product/green-bomber-jacket/pose 5.png'),
(140, 32, '../asset/img/product/green-wool-jacket/foto produk.jpg'),
(141, 32, '../asset/img/product/green-wool-jacket/pose 1.png'),
(142, 32, '../asset/img/product/green-wool-jacket/pose 2.png'),
(143, 32, '../asset/img/product/green-wool-jacket/pose 3.png'),
(144, 32, '../asset/img/product/green-wool-jacket/pose 4.png'),
(145, 32, '../asset/img/product/green-wool-jacket/pose 5.png'),
(146, 33, '../asset/img/product/pink-wideleg/G211.jpg'),
(147, 33, '../asset/img/product/pink-wideleg/G212.jpg'),
(148, 33, '../asset/img/product/pink-wideleg/G213.jpg'),
(149, 33, '../asset/img/product/pink-wideleg/G214.jpg'),
(150, 33, '../asset/img/product/pink-wideleg/G215.jpg'),
(151, 33, '../asset/img/product/pink-wideleg/G216.jpg'),
(152, 34, '../asset/img/product/yellow-hair-scrunch/G411.jpg'),
(153, 34, '../asset/img/product/yellow-hair-scrunch/G412.jpg'),
(154, 34, '../asset/img/product/yellow-hair-scrunch/G413.jpg'),
(155, 34, '../asset/img/product/yellow-hair-scrunch/G414.jpg'),
(156, 34, '../asset/img/product/yellow-hair-scrunch/G415.jpg'),
(157, 34, '../asset/img/product/yellow-hair-scrunch/G416.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `size_name` varchar(10) DEFAULT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `size_name`, `stock`) VALUES
(1, 1, 'S', 10),
(2, 1, 'M', 15),
(3, 1, 'L', 5),
(4, 1, 'XL', 2),
(5, 5, 'S', 19),
(6, 5, 'M', 20),
(7, 5, 'L', 13),
(8, 5, 'XL', 7),
(25, 9, '#F4E1EB', 15),
(26, 9, '#FFFFFF', 14),
(28, 10, '#D6D1CB', 15),
(29, 10, '#EAEAEA', 15),
(30, 11, '#000000', 15),
(31, 11, '#404684', 13),
(36, 12, '5pcs', 99),
(37, 7, 'S', 20),
(38, 7, 'M', 20),
(39, 7, 'L', 20),
(40, 7, 'XL', 20),
(41, 8, 'S', 20),
(42, 8, 'M', 20),
(43, 8, 'L', 20),
(44, 8, 'XL', 20),
(45, 13, 'S', 20),
(46, 13, 'M', 20),
(47, 13, 'L', 20),
(48, 13, 'XL', 20),
(57, 15, 'S', 20),
(58, 15, 'M', 20),
(59, 15, 'L', 20),
(60, 15, 'XL', 20),
(77, 6, '35', 20),
(78, 6, '36', 20),
(79, 6, '37', 20),
(80, 6, '38', 20),
(81, 6, '39', 20),
(82, 6, '40', 20),
(83, 6, '41', 20),
(84, 6, '42', 20),
(85, 6, '43', 20),
(86, 14, '35', 20),
(87, 14, '36', 20),
(88, 14, '37', 19),
(89, 14, '38', 20),
(90, 14, '39', 20),
(91, 14, '40', 20),
(92, 14, '41', 20),
(93, 14, '42', 20),
(94, 14, '43', 20),
(95, 16, '35', 20),
(96, 16, '36', 20),
(97, 16, '37', 20),
(98, 16, '38', 20),
(99, 16, '39', 20),
(100, 16, '40', 20),
(101, 16, '41', 20),
(102, 16, '42', 20),
(103, 16, '43', 20),
(104, 17, '35', 20),
(105, 17, '36', 20),
(106, 17, '37', 20),
(107, 17, '38', 20),
(108, 17, '39', 20),
(109, 17, '40', 20),
(110, 17, '41', 19),
(111, 17, '42', 20),
(112, 17, '43', 19),
(113, 18, 'S', 12),
(114, 18, 'M', 15),
(115, 18, 'L', 8),
(116, 18, 'XL', 4),
(117, 19, 'S', 20),
(118, 19, 'M', 25),
(119, 19, 'L', 14),
(120, 19, 'XL', 8),
(121, 20, 'S', 10),
(122, 20, 'M', 12),
(123, 20, 'L', 8),
(124, 20, 'XL', 5),
(125, 21, 'S', 15),
(126, 21, 'M', 18),
(127, 21, 'L', 10),
(128, 21, 'XL', 6),
(129, 22, 'S', 8),
(130, 22, 'M', 14),
(131, 22, 'L', 6),
(132, 22, 'XL', 3),
(133, 23, 'S', 22),
(134, 23, 'M', 20),
(135, 23, 'L', 13),
(136, 23, 'XL', 7),
(145, 26, 'S', 10),
(146, 26, 'M', 10),
(147, 26, 'L', 10),
(148, 26, 'XL', 10),
(149, 27, 'S', 10),
(150, 27, 'M', 10),
(151, 27, 'L', 10),
(152, 27, 'XL', 10),
(153, 28, 'S', 10),
(154, 28, 'M', 10),
(155, 28, 'L', 10),
(156, 28, 'XL', 10),
(157, 29, 'S', 10),
(158, 29, 'M', 10),
(159, 29, 'L', 10),
(160, 29, 'XL', 10),
(161, 30, 'S', 10),
(162, 30, 'M', 10),
(163, 30, 'L', 10),
(164, 30, 'XL', 10),
(165, 31, 'S', 10),
(166, 31, 'M', 10),
(167, 31, 'L', 10),
(168, 31, 'XL', 10),
(169, 32, 'S', 10),
(170, 32, 'M', 10),
(171, 32, 'L', 10),
(172, 32, 'XL', 10),
(173, 33, 'S', 10),
(174, 33, 'M', 10),
(175, 33, 'L', 10),
(176, 33, 'XL', 10),
(181, 25, '#677BB0', 10),
(182, 34, '#F9DF92', 10),
(183, 24, '35', 10),
(184, 24, '36', 9),
(185, 24, '37', 10),
(186, 24, '38', 10),
(187, 24, '39', 10),
(188, 24, '40', 10),
(189, 24, '41', 10),
(190, 24, '42', 10),
(191, 24, '43', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'sururiardanz', 'ardan@mail.com', '$2b$10$BZ.6UUIdukD50esTGudbI.hTroNTni9sNAa2nEGrYUCd36frykay6', '2026-05-15 14:01:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
