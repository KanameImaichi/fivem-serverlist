/*
  Warnings:

  - Added the required column `is_used` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "is_used" BOOLEAN NOT NULL;
