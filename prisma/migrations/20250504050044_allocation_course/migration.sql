/*
  Warnings:

  - Added the required column `courseId` to the `allocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `allocations` ADD COLUMN `courseId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `allocations` ADD CONSTRAINT `allocations_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
