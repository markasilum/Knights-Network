/*
  Warnings:

  - A unique constraint covering the columns `[skillName]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Skills_skillName_key` ON `Skills`(`skillName`);
