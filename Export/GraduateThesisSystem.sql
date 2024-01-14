-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 14 Oca 2024, 21:23:02
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `GraduateThesisSystem`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Institute`
--

CREATE TABLE `Institute` (
  `InstituteID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `UniversityID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Institute`
--

INSERT INTO `Institute` (`InstituteID`, `Name`, `UniversityID`) VALUES
(1, 'Computer Science Department', 1),
(2, 'Art and Design School', 2),
(3, 'Business Management', 3),
(4, 'Medical Research Institute', 4),
(5, 'Language Studies Institute', 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Keyword`
--

CREATE TABLE `Keyword` (
  `KeywordID` int(11) NOT NULL,
  `ThesisNo` int(11) DEFAULT NULL,
  `Word` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Keyword`
--

INSERT INTO `Keyword` (`KeywordID`, `ThesisNo`, `Word`) VALUES
(24, 12, 'machine'),
(27, 17, 'firstkey'),
(28, 17, 'secondkey'),
(29, 17, 'newkey');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Login`
--

CREATE TABLE `Login` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Login`
--

INSERT INTO `Login` (`ID`, `username`, `password`) VALUES
(1, 'admin', '123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Person`
--

CREATE TABLE `Person` (
  `PersonID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Person`
--

INSERT INTO `Person` (`PersonID`, `Name`) VALUES
(1, 'Boris Brejcha'),
(2, 'Carl C'),
(3, 'Charlie Sparks'),
(4, 'Jan Blomqvist'),
(5, 'Chris Avantgarde');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Subject`
--

CREATE TABLE `Subject` (
  `SubjectID` int(11) NOT NULL,
  `Topic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Subject`
--

INSERT INTO `Subject` (`SubjectID`, `Topic`) VALUES
(1, 'Artificial Intelligence'),
(2, 'Marketing'),
(3, 'Cancer Research'),
(4, 'Abstract Art'),
(5, 'Language Acquisition'),
(6, 'NEW SUBJECTTT');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Supervisor`
--

CREATE TABLE `Supervisor` (
  `SupervisorID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `PersonID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Supervisor`
--

INSERT INTO `Supervisor` (`SupervisorID`, `Name`, `PersonID`) VALUES
(3, 'Prof. Argyy', 1),
(4, 'Dr. Lilly', 2),
(5, 'Dr. Kevin', 3),
(6, 'Prof. Charlotte', 4),
(7, 'Dr. Ash', 5),
(8, 'NewSupervisor', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Thesis`
--

CREATE TABLE `Thesis` (
  `ThesisNo` int(11) NOT NULL,
  `Title` varchar(500) NOT NULL,
  `Abstract` varchar(5000) NOT NULL,
  `AuthorID` int(11) DEFAULT NULL,
  `Year` int(11) DEFAULT NULL,
  `Type` enum('Master','Doctorate','Specialization in Medicine','Proficiency in Art') DEFAULT NULL,
  `UniversityID` int(11) DEFAULT NULL,
  `InstituteID` int(11) DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `Language` enum('Turkish','English','French') DEFAULT NULL,
  `SubmissionDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `Thesis`
--

INSERT INTO `Thesis` (`ThesisNo`, `Title`, `Abstract`, `AuthorID`, `Year`, `Type`, `UniversityID`, `InstituteID`, `Pages`, `Language`, `SubmissionDate`) VALUES
(12, 'The Impact of Machine Learning on Society', 'This thesis examines the societal impact of machine learning technologies.', 1, 2022, 'Doctorate', 1, 1, 150, 'English', '2022-05-10'),
(13, 'Marketing Strategies in the Digital Age', 'Analyzing the shift in marketing strategies with the advent of digital technologies.', 2, 2021, 'Master', 3, 3, 120, 'English', '2021-12-15'),
(14, 'Advancements in Cancer Research', 'This thesis reviews the recent advancements in cancer research and treatment.', 3, 2023, 'Doctorate', 4, 4, 200, 'English', '2023-03-20'),
(15, 'Exploring Abstract Art Techniques', 'An in-depth exploration of abstract art techniques and their cultural significance.', 4, 2022, 'Proficiency in Art', 2, 2, 80, 'French', '2022-08-05'),
(16, 'Comparative Study of Language Acquisition', 'A comparative study of language acquisition in multilingual environments.', 5, 2023, 'Master', 5, 5, 100, 'Turkish', '2023-01-18'),
(17, 'Thesis title', 'thesis abstract', 1, 2019, 'Doctorate', 1, 1, 111, 'English', '2024-01-08');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ThesisSubject`
--

CREATE TABLE `ThesisSubject` (
  `ID` int(11) NOT NULL,
  `ThesisNo` int(11) NOT NULL,
  `SubjectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `ThesisSubject`
--

INSERT INTO `ThesisSubject` (`ID`, `ThesisNo`, `SubjectID`) VALUES
(9, 12, 1),
(12, 17, 5),
(13, 17, 2),
(14, 17, 6);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `University`
--

CREATE TABLE `University` (
  `UniversityID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `University`
--

INSERT INTO `University` (`UniversityID`, `Name`) VALUES
(1, 'University of Oxford'),
(2, 'Harvard University'),
(3, 'Stanford University'),
(4, 'Princeton University'),
(5, 'Columbia University');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `Institute`
--
ALTER TABLE `Institute`
  ADD PRIMARY KEY (`InstituteID`),
  ADD KEY `UniversityID` (`UniversityID`);

--
-- Tablo için indeksler `Keyword`
--
ALTER TABLE `Keyword`
  ADD PRIMARY KEY (`KeywordID`),
  ADD KEY `ThesisNo` (`ThesisNo`);

--
-- Tablo için indeksler `Login`
--
ALTER TABLE `Login`
  ADD PRIMARY KEY (`ID`);

--
-- Tablo için indeksler `Person`
--
ALTER TABLE `Person`
  ADD PRIMARY KEY (`PersonID`);

--
-- Tablo için indeksler `Subject`
--
ALTER TABLE `Subject`
  ADD PRIMARY KEY (`SubjectID`);

--
-- Tablo için indeksler `Supervisor`
--
ALTER TABLE `Supervisor`
  ADD PRIMARY KEY (`SupervisorID`),
  ADD KEY `PersonID` (`PersonID`);

--
-- Tablo için indeksler `Thesis`
--
ALTER TABLE `Thesis`
  ADD PRIMARY KEY (`ThesisNo`),
  ADD KEY `AuthorID` (`AuthorID`),
  ADD KEY `UniversityID` (`UniversityID`),
  ADD KEY `InstituteID` (`InstituteID`);

--
-- Tablo için indeksler `ThesisSubject`
--
ALTER TABLE `ThesisSubject`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ThesisNo` (`ThesisNo`),
  ADD KEY `SubjectID` (`SubjectID`);

--
-- Tablo için indeksler `University`
--
ALTER TABLE `University`
  ADD PRIMARY KEY (`UniversityID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `Institute`
--
ALTER TABLE `Institute`
  MODIFY `InstituteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `Keyword`
--
ALTER TABLE `Keyword`
  MODIFY `KeywordID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Tablo için AUTO_INCREMENT değeri `Login`
--
ALTER TABLE `Login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `Person`
--
ALTER TABLE `Person`
  MODIFY `PersonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `Subject`
--
ALTER TABLE `Subject`
  MODIFY `SubjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `Supervisor`
--
ALTER TABLE `Supervisor`
  MODIFY `SupervisorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `Thesis`
--
ALTER TABLE `Thesis`
  MODIFY `ThesisNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Tablo için AUTO_INCREMENT değeri `ThesisSubject`
--
ALTER TABLE `ThesisSubject`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Tablo için AUTO_INCREMENT değeri `University`
--
ALTER TABLE `University`
  MODIFY `UniversityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `Institute`
--
ALTER TABLE `Institute`
  ADD CONSTRAINT `institute_ibfk_1` FOREIGN KEY (`UniversityID`) REFERENCES `University` (`UniversityID`);

--
-- Tablo kısıtlamaları `Keyword`
--
ALTER TABLE `Keyword`
  ADD CONSTRAINT `keyword_ibfk_1` FOREIGN KEY (`ThesisNo`) REFERENCES `Thesis` (`ThesisNo`);

--
-- Tablo kısıtlamaları `Supervisor`
--
ALTER TABLE `Supervisor`
  ADD CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`PersonID`) REFERENCES `Person` (`PersonID`);

--
-- Tablo kısıtlamaları `Thesis`
--
ALTER TABLE `Thesis`
  ADD CONSTRAINT `thesis_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `Person` (`PersonID`),
  ADD CONSTRAINT `thesis_ibfk_2` FOREIGN KEY (`UniversityID`) REFERENCES `University` (`UniversityID`),
  ADD CONSTRAINT `thesis_ibfk_3` FOREIGN KEY (`InstituteID`) REFERENCES `Institute` (`InstituteID`);

--
-- Tablo kısıtlamaları `ThesisSubject`
--
ALTER TABLE `ThesisSubject`
  ADD CONSTRAINT `thesissubject_ibfk_1` FOREIGN KEY (`ThesisNo`) REFERENCES `Thesis` (`ThesisNo`),
  ADD CONSTRAINT `thesissubject_ibfk_2` FOREIGN KEY (`SubjectID`) REFERENCES `Subject` (`SubjectID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
