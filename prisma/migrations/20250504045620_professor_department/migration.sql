/*
  Warnings:

  - Added the required column `departmentId` to the `professors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professors` ADD COLUMN `departmentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `professors` ADD CONSTRAINT `professors_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
