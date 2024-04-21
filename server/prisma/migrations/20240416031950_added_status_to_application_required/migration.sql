/*
  Warnings:

  - Made the column `status` on table `application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `application` MODIFY `status` VARCHAR(191) NOT NULL;
