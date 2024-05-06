/*
  Warnings:

  - Added the required column `email` to the `ContactPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ContactPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contactperson` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
