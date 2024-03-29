/*
  Warnings:

  - You are about to alter the column `eventPhoto` on the `events` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `eventPhoto` VARCHAR(191) NOT NULL;
