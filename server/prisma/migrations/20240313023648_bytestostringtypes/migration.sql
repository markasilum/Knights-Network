/*
  Warnings:

  - You are about to alter the column `secRegistration` on the `companyverificationreqs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `dtiRegistration` on the `companyverificationreqs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `businessPermit` on the `companyverificationreqs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `idPhoto` on the `personverificationreqs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `companyverificationreqs` MODIFY `secRegistration` VARCHAR(191) NOT NULL,
    MODIFY `dtiRegistration` VARCHAR(191) NOT NULL,
    MODIFY `businessPermit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personverificationreqs` MODIFY `idPhoto` VARCHAR(191) NOT NULL;
