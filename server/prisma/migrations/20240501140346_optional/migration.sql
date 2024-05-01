-- DropForeignKey
ALTER TABLE `person` DROP FOREIGN KEY `Person_userId_fkey`;

-- AlterTable
ALTER TABLE `person` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
