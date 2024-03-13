/*
  Warnings:

  - You are about to alter the column `licensePic` on the `personlicense` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `personlicense` MODIFY `licensePic` VARCHAR(191) NULL;
