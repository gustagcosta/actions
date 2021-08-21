CREATE DATABASE `actions` CHARACTER SET UTF8;

CREATE TABLE `actions`.`users` 
  ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `name` VARCHAR(255) NOT NULL , 
    `email` VARCHAR(255) NOT NULL , 
    `password` VARCHAR(255) NOT NULL , 
    `role` VARCHAR(255) NOT NULL , 
      PRIMARY KEY (`id`)
  ) ENGINE = InnoDB;

ALTER TABLE users ADD CONSTRAINT email_unique UNIQUE (email);

INSERT INTO `users`(`name`, `email`, `password`, `role`) VALUES 
  (
    'admin',
    'admin@admin.com',
    '$2a$10$XIhA7AjYILsEQXlINS3cueDKEJyeyOe2ZZ8GGlYJNkF3tgiJpwKpG',
    'admin'
  );
