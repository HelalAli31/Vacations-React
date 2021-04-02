

CREATE TABLE `travels_db`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `userType` VARCHAR(45) NOT NULL DEFAULT 'user',
  `followingTravels_id` VARCHAR(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`));

INSERT INTO `travels_db`.`users` (`id`, `firstName`, `lastName`, `userName`, `password`, `userType`) VALUES ('1', 'helal', 'ali', 'helal', '123', 'Admin');
INSERT INTO `travels_db`.`users` (`id`, `firstName`, `lastName`, `userName`, `password`) VALUES ('2', 'gal', 'amouyal', 'gal', '123');
