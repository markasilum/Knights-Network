/*
  Warnings:

  - Made the column `endDate` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `education` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `education` MODIFY `endDate` DATE NOT NULL,
    MODIFY `startDate` DATE NOT NULL;
