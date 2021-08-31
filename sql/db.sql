-- MYSQL
CREATE DATABASE actions CHARACTER SET UTF8;

CREATE TABLE actions.users
  (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL ,
    role VARCHAR(255) NOT NULL ,
      PRIMARY KEY (id)
  ) ENGINE = InnoDB;

ALTER TABLE actions.users ADD CONSTRAINT email_unique UNIQUE (email);

INSERT INTO actions.users(name, email, password, role) VALUES
  (
    'admin',
    'admin@admin.com',
    '$2a$10$XIhA7AjYILsEQXlINS3cueDKEJyeyOe2ZZ8GGlYJNkF3tgiJpwKpG',
    'admin'
  );

CREATE TABLE actions.tasks (
  id int NOT NULL,
  description varchar(255) NOT NULL,
  deadline date NOT NULL,
  id_manager int NOT NULL,
  id_target int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

ALTER TABLE actions.tasks
  ADD PRIMARY KEY (id),
  ADD KEY id_manager (id_manager),
  ADD KEY id_target (id_target);

ALTER TABLE actions.tasks
  MODIFY id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE actions.tasks
  ADD CONSTRAINT tasks_ibfk_1
  FOREIGN KEY (id_manager)
  REFERENCES actions.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT tasks_ibfk_2
  FOREIGN KEY (id_target)
  REFERENCES actions.users (id) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

ALTER TABLE actions.tasks ADD COLUMN status varchar(255) not null default 'WIP';

-- POSTGRESQL
CREATE TABLE public.users
(
    id       SERIAL,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO public.users (id, name, email, password, role) 
VALUES (
  DEFAULT, 
  'admin', 
  'admin@admin.com', 
  '$2a$10$XIhA7AjYILsEQXlINS3cueDKEJyeyOe2ZZ8GGlYJNkF3tgiJpwKpG', 
  'admin'
  )

