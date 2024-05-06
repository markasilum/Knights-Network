/*
  Warnings:

  - You are about to alter the column `appLetterFile` on the `applicationletter` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `applicationletter` MODIFY `appLetterFile` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `JobRecommendation` (
    `id` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NOT NULL,
    `jobPostId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobRecommendation` ADD CONSTRAINT `JobRecommendation_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobRecommendation` ADD CONSTRAINT `JobRecommendation_jobPostId_fkey` FOREIGN KEY (`jobPostId`) REFERENCES `JobPost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
