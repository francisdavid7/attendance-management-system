/*
  Warnings:

  - You are about to drop the column `verificationTokenString` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationTokenString",
ADD COLUMN     "verificationToken" TEXT;
