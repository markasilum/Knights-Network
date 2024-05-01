/*
  Warnings:

  - A unique constraint covering the columns `[industryName]` on the table `Industry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Industry_industryName_key` ON `Industry`(`industryName`);
