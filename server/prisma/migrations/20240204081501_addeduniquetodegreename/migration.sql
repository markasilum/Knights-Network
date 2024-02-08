/*
  Warnings:

  - A unique constraint covering the columns `[degreeName]` on the table `Degree` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Degree_degreeName_key` ON `Degree`(`degreeName`);
