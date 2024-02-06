/*
  Warnings:

  - Added the required column `licensePic` to the `PersonLicense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseValidity` to the `PersonLicense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personlicense` ADD COLUMN `licensePic` LONGBLOB NOT NULL,
    ADD COLUMN `licenseValidity` DATE NOT NULL;
