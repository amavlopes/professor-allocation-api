/*
  Warnings:

  - Added the required column `professorId` to the `allocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `allocations` ADD COLUMN `professorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `allocations` ADD CONSTRAINT `allocations_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `professors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
