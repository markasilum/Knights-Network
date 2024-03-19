/*
  Warnings:

  - You are about to alter the column `certPhoto` on the `certification` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `certification` MODIFY `certPhoto` VARCHAR(191) NOT NULL;
