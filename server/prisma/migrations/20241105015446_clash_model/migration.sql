/*
  Warnings:

  - Added the required column `expire_at` to the `Clash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clash" ADD COLUMN     "expire_at" TIMESTAMP(3) NOT NULL;
