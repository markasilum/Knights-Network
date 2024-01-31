-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_personId_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_supervisorId_fkey`;

-- AlterTable
ALTER TABLE `roles` MODIFY `personId` VARCHAR(191) NULL,
    MODIFY `companyId` VARCHAR(191) NULL,
    MODIFY `supervisorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Supervisor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
