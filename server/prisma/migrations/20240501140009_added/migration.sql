-- CreateTable
CREATE TABLE `ContactPerson` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NOT NULL,
    `positionName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ContactPerson_companyId_key`(`companyId`),
    UNIQUE INDEX `ContactPerson_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContactPerson` ADD CONSTRAINT `ContactPerson_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactPerson` ADD CONSTRAINT `ContactPerson_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
