

CREATE TABLE `travels_db`.`followers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `travel_id` INT NOT NULL,
  PRIMARY KEY (`id`));


ALTER TABLE `travels_db`.`followers` 
ADD INDEX `travel_id_idx` (`travel_id` ASC) VISIBLE;
;
ALTER TABLE `travels_db`.`followers` 
ADD CONSTRAINT `travel_id`
  FOREIGN KEY (`travel_id`)
  REFERENCES `travels_db`.`travels` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


INSERT INTO `travels_db`.`followers` (`id`, `user_id`, `travel_id`) VALUES ('188', '2', '12');
