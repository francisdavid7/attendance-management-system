/*
  Warnings:

  - A unique constraint covering the columns `[tutorId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_tutorId_key" ON "Course"("tutorId");
