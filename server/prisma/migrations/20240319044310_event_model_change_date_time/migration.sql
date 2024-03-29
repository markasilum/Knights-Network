/*
  Warnings:

  - You are about to drop the column `eventDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventTime` on the `events` table. All the data in the column will be lost.
  - Added the required column `eventDateTime` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `eventDate`,
    DROP COLUMN `eventTime`,
    ADD COLUMN `eventDateTime` DATETIME(3) NOT NULL;
