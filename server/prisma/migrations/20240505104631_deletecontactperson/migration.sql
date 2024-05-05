/*
  Warnings:

  - You are about to drop the `contactperson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contactperson` DROP FOREIGN KEY `ContactPerson_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `contactperson` DROP FOREIGN KEY `ContactPerson_personId_fkey`;

-- DropTable
DROP TABLE `contactperson`;

-- CreateTable
CREATE TABLE `CompanyContactPerson` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `positionName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CompanyContactPerson_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompanyContactPerson` ADD CONSTRAINT `CompanyContactPerson_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyContactPerson` ADD CONSTRAINT `CompanyContactPerson_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
