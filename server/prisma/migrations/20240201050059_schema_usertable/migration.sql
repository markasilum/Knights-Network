/*
  Warnings:

  - Made the column `userId` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `person` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
