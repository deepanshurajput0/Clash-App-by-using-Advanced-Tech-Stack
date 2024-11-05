/*
  Warnings:

  - Added the required column `image` to the `Clash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clash" ADD COLUMN     "image" TEXT NOT NULL;
