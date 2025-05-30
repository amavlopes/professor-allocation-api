/*
  Warnings:

  - You are about to alter the column `cpf` on the `professors` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(11)`.

*/
-- AlterTable
ALTER TABLE `professors` MODIFY `cpf` CHAR(11) NOT NULL;
