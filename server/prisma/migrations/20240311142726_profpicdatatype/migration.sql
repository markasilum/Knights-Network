/*
  Warnings:

  - You are about to alter the column `profPic` on the `user` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `profPic` VARCHAR(191) NULL;
