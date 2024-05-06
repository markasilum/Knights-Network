-- AlterTable
ALTER TABLE `user` ADD COLUMN `isBanned` BOOLEAN NULL DEFAULT false,
    MODIFY `streetAddress` VARCHAR(191) NULL,
    MODIFY `cityName` VARCHAR(191) NULL,
    MODIFY `countryName` VARCHAR(191) NULL,
    MODIFY `zipCode` VARCHAR(191) NULL;
