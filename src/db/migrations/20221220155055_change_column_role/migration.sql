/*
  Warnings:

  - You are about to drop the column `roles` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roles",
ADD COLUMN     "role" VARCHAR(15) NOT NULL DEFAULT 'basic';
