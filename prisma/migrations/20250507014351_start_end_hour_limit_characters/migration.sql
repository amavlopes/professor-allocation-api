/*
  Warnings:

  - You are about to alter the column `startHour` on the `allocations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `VarChar(5)`.
  - You are about to alter the column `endHour` on the `allocations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE `allocations` MODIFY `startHour` VARCHAR(5) NOT NULL,
    MODIFY `endHour` VARCHAR(5) NOT NULL;
