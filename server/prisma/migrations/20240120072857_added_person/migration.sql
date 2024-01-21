-- CreateTable
CREATE TABLE `Person` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `suffix` VARCHAR(191) NOT NULL,
    `maindenLastName` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(0) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `streetAddress` VARCHAR(191) NOT NULL,
    `cityName` VARCHAR(191) NOT NULL,
    `countryName` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `contactNum` VARCHAR(191) NOT NULL,
    `emailAddress` VARCHAR(191) NOT NULL,
    `profPic` LONGBLOB NOT NULL,
    `biography` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
