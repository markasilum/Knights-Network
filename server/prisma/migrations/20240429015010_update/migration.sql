-- AlterTable
ALTER TABLE `events` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL,
    MODIFY `eventDateTime` DATETIME(3) NULL;
