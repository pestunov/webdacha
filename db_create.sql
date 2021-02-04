CREATE TABLE IF NOT EXISTS `db_create` (
	`id` INT(11) PRIMARY KEY AUTOINCREMENT,
	`unit_num` INT(11) NOT NULL,
	`unit_name` TEXT(65535) NOT NULL,
	`unit_category` TEXT(65535) NULL DEFAULT NULL,
	`unit_desc` TEXT(65535) NULL DEFAULT NULL
);