/*
  Warnings:

  - You are about to alter the column `startHour` on the `allocations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.
  - You are about to alter the column `endHour` on the `allocations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE `allocations` MODIFY `startHour` VARCHAR(8) NOT NULL,
    MODIFY `endHour` VARCHAR(8) NOT NULL;
