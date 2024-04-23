-- CreateTable
CREATE TABLE `AccountSettings` (
    `id` VARCHAR(191) NOT NULL,
    `receiveJobReco` BOOLEAN NOT NULL DEFAULT true,
    `isJobSearching` BOOLEAN NOT NULL DEFAULT true,
    `allowViewResume` BOOLEAN NOT NULL DEFAULT true,
    `allowDownloadResume` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
