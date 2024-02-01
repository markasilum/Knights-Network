/*
  Warnings:

  - You are about to drop the column `biography` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `cityName` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `contactNum` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `profPic` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `biography` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `cityName` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `contactNum` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `profPic` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `contactNum` on the `supervisor` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `supervisor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `supervisor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `supervisor` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `supervisor` table. All the data in the column will be lost.
  - You are about to drop the column `suffix` on the `supervisor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `Supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_personId_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_supervisorId_fkey`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `biography`,
    DROP COLUMN `cityName`,
    DROP COLUMN `contactNum`,
    DROP COLUMN `countryName`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `password`,
    DROP COLUMN `profPic`,
    DROP COLUMN `streetAddress`,
    DROP COLUMN `username`,
    DROP COLUMN `verified`,
    DROP COLUMN `zipCode`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `person` DROP COLUMN `biography`,
    DROP COLUMN `cityName`,
    DROP COLUMN `contactNum`,
    DROP COLUMN `countryName`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `password`,
    DROP COLUMN `profPic`,
    DROP COLUMN `streetAddress`,
    DROP COLUMN `username`,
    DROP COLUMN `verified`,
    DROP COLUMN `zipCode`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `companyId`,
    DROP COLUMN `personId`,
    DROP COLUMN `supervisorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `supervisor` DROP COLUMN `contactNum`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `suffix`,
    ADD COLUMN `personId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `streetAddress` VARCHAR(191) NOT NULL,
    `cityName` VARCHAR(191) NOT NULL,
    `countryName` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `contactNum` VARCHAR(191) NOT NULL,
    `emailAddress` VARCHAR(191) NOT NULL,
    `profPic` LONGBLOB NULL,
    `biography` TEXT NOT NULL,
    `verified` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Roles_userId_key` ON `Roles`(`userId`);

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supervisor` ADD CONSTRAINT `Supervisor_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
