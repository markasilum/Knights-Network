/*
  Warnings:

  - A unique constraint covering the columns `[licenseName]` on the table `PRCLicenses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PRCLicenses_licenseName_key` ON `PRCLicenses`(`licenseName`);
