/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AccountSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AccountSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accountsettings` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AccountSettings_userId_key` ON `AccountSettings`(`userId`);

-- AddForeignKey
ALTER TABLE `AccountSettings` ADD CONSTRAINT `AccountSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
