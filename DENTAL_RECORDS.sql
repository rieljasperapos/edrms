-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 15, 2023 at 10:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DENTAL_RECORDS`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_deactivated` tinyint(1) NOT NULL DEFAULT 0,
  `super_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `birthdate`, `is_admin`, `is_deactivated`, `super_admin`) VALUES
(1, 'jericho', '$2b$10$VCuwxWLkyGqRTGND747Tl.1wrHXEV7Y.mgci3Hest.L9I.rB0k0Au', 'Pasco', 'Jericho', 'Clam', '2000-12-31', 1, 0, 1),
(2, 'naruto', '$2b$10$Zs2F83NisMzprMdZBNsaQe0.Qu241K7hSHJYMfEZlRTvtINPNODHW', 'Apos', 'Riel', 'Jasper', '2003-07-08', 0, 0, 0),
(3, 'isa', '$2b$10$ZZSqMiWivw1ElkpAhBhzF.Q8VJlAzHp7W5wwQXs9WqzPb6oA2yMQy', 'Isa', 'Isabel', 'Adriatico', '2000-10-26', 0, 0, 0),
(4, 'john', '$2b$10$apgtoweapbUEkGAB12F1hOU2Hzv8h7ZlohLlvfT1IkM7jdngF46xS', 'Doe', 'John', 'Cena', '1994-11-15', 0, 0, 0),
(5, 'marc', '$2b$10$WksALYCkwkBH/rzH4ybyGuRzcEsHOg87llSk2DgliyTXHRP.ZbijS', 'Ochavo', 'Marc', 'Berina', '2023-12-03', 0, 1, 0),
(6, 'jose', '$2b$10$4d1f4.fDzEyucvWajAvDKeA.wZeS5AUw499yw7AdxaMOf/oOBTkTu', 'Rizal', 'Jose', 'Mercado', '2023-11-01', 0, 0, 0),
(7, 'mark', '$2b$10$7LWbVSjyaQX9P2godzsd5.3Bc.tiIpixpyVmjVH8DAw.RkKkUDYUe', 'Pacheco', 'Mark', 'Casius', '2023-12-06', 0, 0, 0),
(8, 'james', '$2b$10$PAwx6Qc/9HNQl6FEl4Z.Mu4HhlPOYiFCci4QTYl2ytuo1r9dGZ69y', 'James', 'James', 'James', '2009-06-15', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `date_schedule` date NOT NULL,
  `time_schedule` time NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact_number` varchar(11) NOT NULL,
  `purpose` text NOT NULL,
  `status` enum('confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
  `is_previous_patient` tinyint(1) NOT NULL DEFAULT 0,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `date_schedule`, `time_schedule`, `name`, `contact_number`, `purpose`, `status`, `is_previous_patient`, `patient_id`) VALUES
(1, '2023-12-09', '16:33:00', 'Pasco, Jericho', '09267384543', 'Check up', 'confirmed', 1, 1),
(2, '2023-12-14', '14:21:00', 'Park, Jihyo', '09267384545', 'Cleaning', 'cancelled', 0, NULL),
(3, '2023-12-09', '14:24:00', 'Im, Nayeon', '09121215555', 'Simple tooth extraction', 'confirmed', 0, NULL),
(4, '2023-12-09', '15:52:00', 'Pasco, Jericho', '09123123133', 'Checkup', 'confirmed', 1, 1),
(5, '2023-12-09', '18:16:00', 'Pasco, Jericho', '09232131233', 'Checkup', 'cancelled', 1, 1),
(6, '2023-12-14', '09:19:00', 'Park, Jihyo', '08926789745', 'check up', 'confirmed', 1, 4),
(7, '2023-12-15', '19:57:00', 'Shippuden, Naruto', '09526325555', 'test', 'cancelled', 1, 12),
(8, '2023-12-15', '21:57:00', 'James, Lebron', '09454654564', 'Check\n', 'confirmed', 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `health_history`
--

CREATE TABLE `health_history` (
  `health_history_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `diabetic` tinyint(1) NOT NULL DEFAULT 0,
  `hypertensive` tinyint(1) NOT NULL DEFAULT 0,
  `other_health_conditions` text NOT NULL DEFAULT 'None',
  `allergies` text NOT NULL DEFAULT 'None',
  `maintenance_medicines` text NOT NULL DEFAULT 'None',
  `notes` text NOT NULL DEFAULT 'None',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_history`
--

INSERT INTO `health_history` (`health_history_id`, `patient_id`, `diabetic`, `hypertensive`, `other_health_conditions`, `allergies`, `maintenance_medicines`, `notes`, `is_deleted`) VALUES
(1, 1, 1, 0, 'Lack of Sleep', 'di mo tabang', 'None', 'None', 0),
(2, 2, 0, 0, 'None', 'None', 'None', 'None', 0),
(3, 3, 0, 0, 'None', 'None', 'None', 'None', 0),
(4, 4, 0, 0, 'None', 'None', 'None', 'None', 0),
(5, 5, 0, 0, 'None', 'None', 'None', 'None', 0),
(6, 6, 0, 0, 'None', 'None', 'None', 'None', 0),
(7, 7, 0, 0, 'None', 'None', 'None', 'None', 0),
(8, 8, 0, 0, 'None', 'None', 'None', 'None', 0),
(9, 9, 0, 0, 'None', 'None', 'None', 'None', 0),
(10, 10, 0, 0, 'None', 'None', 'None', 'None', 0),
(11, 11, 0, 0, 'None', 'None', 'None', 'None', 0),
(12, 12, 0, 0, 'None', 'None', 'None', 'None', 1),
(13, 13, 0, 0, 'None', 'None', 'None', 'None', 0),
(14, 14, 0, 1, 'None', 'Peanuts', 'None', 'None', 0),
(15, 15, 0, 0, 'None', 'None', 'None', 'None', 0);

-- --------------------------------------------------------

--
-- Table structure for table `insurance_info`
--

CREATE TABLE `insurance_info` (
  `insurance_info_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `insurance_company` varchar(500) NOT NULL,
  `insurance_id_num` varchar(100) NOT NULL,
  `expiration_date` date NOT NULL,
  `company_employed` varchar(500) NOT NULL DEFAULT 'None',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insurance_info`
--

INSERT INTO `insurance_info` (`insurance_info_id`, `patient_id`, `insurance_company`, `insurance_id_num`, `expiration_date`, `company_employed`, `is_deleted`) VALUES
(1, 1, 'Medicard', '12345679', '2024-01-30', 'USC', 0),
(2, 1, 'Sunlife', '123654987', '2023-11-07', 'Personal', 0),
(3, 1, 'Sunlife', '123123231', '2023-11-02', 'USC', 0),
(4, 1, 'dsadasd', '21321312321', '2024-01-18', 'test', 0),
(5, 14, 'Intellicare', '213212311', '2023-12-29', 'Karasuno', 0),
(6, 15, 'Medicard', '23132121321', '2023-10-05', 'Lakers', 0);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `sex` varchar(11) NOT NULL,
  `contact_number` varchar(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `street_address` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `last_name`, `first_name`, `middle_name`, `birthdate`, `sex`, `contact_number`, `email`, `street_address`, `city`, `is_deleted`) VALUES
(1, 'Pasko', 'Jericho', 'Clam', '2000-12-31', 'male', '09267384545', 'jericho@gmail.com', 'Dungguan, Basak', 'Mandaue', 0),
(2, 'Apos', 'Jasper', 'Riel', '2003-01-21', 'male', '09325745856', 'jasper@gmail.com', 'Consolacion', 'Consolacion', 0),
(3, 'Adriatico', 'Isabel', 'Isa', '2001-10-09', 'female', '09688267585', 'isa@gmail.com', 'Talamban', 'Cebu', 0),
(4, 'Park', 'Jihyo', '', '1997-02-01', 'female', '09545454555', 'jihyo@gmail.com', 'Korea', 'Cebu', 0),
(5, 'Cena', 'John', 'Doe', '1995-05-08', 'male', '09657355695', 'johncena@gmail.com', 'You cant see me', 'Cebu', 0),
(6, 'test', 'test', 'test', '2006-10-01', 'male', '09879878977', '', 'test city', 'test', 0),
(7, 'Stark', 'Tony', 'Ironman', '1985-12-01', 'male', '09545456798', 'ironman@gmail.com', 'new york', 'Cebu', 0),
(8, 'Ackerman', 'Levi', 'AOT', '1966-12-31', 'male', '09668788788', '', 'Eldia', 'Ceb', 0),
(9, 'Jaeger', 'Eren', '', '2001-06-02', 'male', '09545455463', 'eren@gmail.com', 'Eldia', 'Cebu', 0),
(10, 'Hirai', 'Momo', 'Twice', '1996-08-10', 'female', '09456465222', 'twice@gmail.com', 'Korea', 'Cebu', 0),
(11, 'Minatozaki', 'Sana', 'isLife', '1996-07-08', 'female', '09554654656', 'shyshyshy@gmail.com', 'Twiceland', 'Cebu', 0),
(12, 'Shippuden', 'Naruto', 'Uzumaki', '1996-05-04', 'male', '09456454444', 'hokage@gmail.com', 'Konoha', 'Cebu', 1),
(13, 'Ochavo', 'Marc', '', '2023-12-14', 'male', '09172727272', '', 'Talamban', 'Cebu', 0),
(14, 'Shoyo', 'Hinata', 'Haikyuu', '2001-05-31', 'male', '09568655565', 'littlegiant@gmail.com', 'Japan', 'Kyoto', 0),
(15, 'James', 'Lebron', 'Bronny', '1984-12-30', 'male', '09454545444', 'lakers@gmail.com', 'Los Angeles', 'California', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teeth_status`
--

CREATE TABLE `teeth_status` (
  `teeth_status_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `tooth_number` tinyint(4) NOT NULL,
  `status` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teeth_status`
--

INSERT INTO `teeth_status` (`teeth_status_id`, `patient_id`, `tooth_number`, `status`, `is_deleted`) VALUES
(1, 1, 13, 'Veneer', 0),
(2, 1, 38, 'Extracted', 0),
(3, 1, 23, 'Veneer', 0),
(4, 13, 13, 'Filling', 0),
(5, 1, 14, 'Missing', 0),
(6, 14, 13, 'Filled', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tooth`
--

CREATE TABLE `tooth` (
  `tooth_number` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tooth`
--

INSERT INTO `tooth` (`tooth_number`) VALUES
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(31),
(32),
(33),
(34),
(35),
(36),
(37),
(38),
(41),
(42),
(43),
(44),
(45),
(46),
(47),
(48),
(51),
(52),
(53),
(54),
(55),
(61),
(62),
(63),
(64),
(65),
(71),
(72),
(73),
(74),
(75),
(81),
(82),
(83),
(84),
(85);

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `treatment_id` int(11) NOT NULL,
  `treatment_name` varchar(255) NOT NULL,
  `treatment_fee` decimal(10,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`treatment_id`, `treatment_name`, `treatment_fee`, `is_deleted`) VALUES
(1, 'Simple Tooth Extraction (Front)', 1000.00, 0),
(2, 'Oral Prophylaxis (Simple)', 1000.00, 0),
(3, 'Oral Prophylaxis (Deep Scaling)', 1500.00, 0),
(4, 'Tooth Extraction (Molar Simple) ', 1500.00, 0),
(5, 'Tooth Extraction (3rd Molar - Simple)', 5000.00, 0),
(6, 'Root Canal (per canal)', 5000.00, 0),
(7, 'Permanent Filling ', 1000.00, 0),
(8, 'Jacket Crown (Porcelain fused to Metal) - anterior', 10000.00, 0),
(9, 'Jacket Crown (Porcelain fused to Metal) - posterior', 15000.00, 0),
(10, 'Jacket Crown (Zirconia) ', 25000.00, 0),
(11, 'Surgery - third molar ', 15000.00, 0),
(12, 'Xray - Periapical', 400.00, 0),
(13, 'Test to delete', 0.00, 1),
(14, 'Test to delete 2', 0.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `treatment_rendered`
--

CREATE TABLE `treatment_rendered` (
  `treatment_rendered_id` int(11) NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `visit_id` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment_rendered`
--

INSERT INTO `treatment_rendered` (`treatment_rendered_id`, `treatment_id`, `visit_id`, `is_deleted`) VALUES
(1, 2, 1, 0),
(2, 7, 2, 0),
(3, 4, 3, 0),
(4, 6, 3, 0),
(5, 2, 3, 0),
(6, 2, 3, 0),
(7, 12, 4, 0),
(8, 4, 4, 0),
(9, 3, 5, 0),
(10, 7, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `visit`
--

CREATE TABLE `visit` (
  `visit_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `visit_purpose` text NOT NULL,
  `date_visit` date NOT NULL,
  `additional_fees` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `prescription` text NOT NULL DEFAULT 'None',
  `notes` text NOT NULL DEFAULT 'None',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visit`
--

INSERT INTO `visit` (`visit_id`, `patient_id`, `visit_purpose`, `date_visit`, `additional_fees`, `amount_paid`, `discount`, `prescription`, `notes`, `is_deleted`) VALUES
(1, 1, 'Check up', '2023-10-26', 0.00, 1000.00, 0.00, 'None', 'None', 0),
(2, 1, 'Tooth Filling', '2023-04-06', 0.00, 800.00, 200.00, 'None', 'Need to comback for cleaning', 0),
(3, 1, 'Checkup', '2023-12-07', 0.00, 0.00, 0.00, 'None', 'None', 0),
(4, 14, 'Check up', '2023-12-13', 0.00, 1400.00, 500.00, 'Paracetamol', '', 0),
(5, 15, 'Check', '2023-12-13', 0.00, 2500.00, 0.00, 'NOne', 'none', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vital_signs`
--

CREATE TABLE `vital_signs` (
  `vital_signs_id` int(11) NOT NULL,
  `visit_id` int(11) NOT NULL,
  `temperature` int(11) DEFAULT NULL,
  `pulse_rate` int(11) DEFAULT NULL,
  `systolic_bp` int(11) DEFAULT NULL,
  `diastolic_bp` int(11) DEFAULT NULL,
  `time_taken` time NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `xray`
--

CREATE TABLE `xray` (
  `xray_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `image_path` varchar(1024) NOT NULL,
  `type` enum('panoramic','periapical','others') NOT NULL,
  `date_taken` date NOT NULL,
  `notes` text DEFAULT 'None',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `xray`
--

INSERT INTO `xray` (`xray_id`, `patient_id`, `image_path`, `type`, `date_taken`, `notes`, `is_deleted`) VALUES
(1, 1, 'xray_1702080848390_Xray1.jpeg', 'panoramic', '2023-10-11', 'for braces', 0),
(2, 1, 'xray_update_1702107440323_Xray7.jpeg', 'periapical', '2023-11-24', '3rd molar extraction', 0),
(3, 13, 'xray_update_1702097297707_Xray3.jpeg', 'periapical', '2023-12-07', 'kjgghj', 0),
(4, 14, 'xray_1702627555849_Xray4.jpeg', 'panoramic', '2023-12-12', 'braces', 0),
(5, 15, 'xray_1702630389429_Xray3.jpeg', 'panoramic', '2023-12-07', 'third molar', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `fk_appointment_patient_id` (`patient_id`);

--
-- Indexes for table `health_history`
--
ALTER TABLE `health_history`
  ADD PRIMARY KEY (`health_history_id`),
  ADD KEY `fk_health_history_patient` (`patient_id`);

--
-- Indexes for table `insurance_info`
--
ALTER TABLE `insurance_info`
  ADD PRIMARY KEY (`insurance_info_id`),
  ADD KEY `fk_insurance_info_patient` (`patient_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `teeth_status`
--
ALTER TABLE `teeth_status`
  ADD PRIMARY KEY (`teeth_status_id`),
  ADD KEY `fk_teeth_status_patient` (`patient_id`),
  ADD KEY `fk_teeth_status_tooth_number` (`tooth_number`);

--
-- Indexes for table `tooth`
--
ALTER TABLE `tooth`
  ADD PRIMARY KEY (`tooth_number`);

--
-- Indexes for table `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`treatment_id`);

--
-- Indexes for table `treatment_rendered`
--
ALTER TABLE `treatment_rendered`
  ADD PRIMARY KEY (`treatment_rendered_id`),
  ADD KEY `fk_treatment_rendered_treatment` (`treatment_id`),
  ADD KEY `fk_treatment_rendered_visit` (`visit_id`);

--
-- Indexes for table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`visit_id`),
  ADD KEY `fk_visit_patient` (`patient_id`);

--
-- Indexes for table `vital_signs`
--
ALTER TABLE `vital_signs`
  ADD PRIMARY KEY (`vital_signs_id`),
  ADD KEY `fk_vital_signs_visit` (`visit_id`);

--
-- Indexes for table `xray`
--
ALTER TABLE `xray`
  ADD PRIMARY KEY (`xray_id`),
  ADD KEY `fk_xray_patient` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `health_history`
--
ALTER TABLE `health_history`
  MODIFY `health_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `insurance_info`
--
ALTER TABLE `insurance_info`
  MODIFY `insurance_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `teeth_status`
--
ALTER TABLE `teeth_status`
  MODIFY `teeth_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `treatment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `treatment_rendered`
--
ALTER TABLE `treatment_rendered`
  MODIFY `treatment_rendered_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `visit`
--
ALTER TABLE `visit`
  MODIFY `visit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vital_signs`
--
ALTER TABLE `vital_signs`
  MODIFY `vital_signs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `xray`
--
ALTER TABLE `xray`
  MODIFY `xray_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_appointment_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `health_history`
--
ALTER TABLE `health_history`
  ADD CONSTRAINT `fk_health_history_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `insurance_info`
--
ALTER TABLE `insurance_info`
  ADD CONSTRAINT `fk_insurance_info_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `teeth_status`
--
ALTER TABLE `teeth_status`
  ADD CONSTRAINT `fk_teeth_status_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `fk_teeth_status_tooth_number` FOREIGN KEY (`tooth_number`) REFERENCES `tooth` (`tooth_number`);

--
-- Constraints for table `treatment_rendered`
--
ALTER TABLE `treatment_rendered`
  ADD CONSTRAINT `fk_treatment_rendered_treatment` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`treatment_id`),
  ADD CONSTRAINT `fk_treatment_rendered_visit` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`visit_id`);

--
-- Constraints for table `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `fk_visit_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `vital_signs`
--
ALTER TABLE `vital_signs`
  ADD CONSTRAINT `fk_vital_signs_visit` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`visit_id`);

--
-- Constraints for table `xray`
--
ALTER TABLE `xray`
  ADD CONSTRAINT `fk_xray_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
