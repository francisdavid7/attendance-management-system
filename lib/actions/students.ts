"use server";

import { prisma } from "../prisma";

export async function getStudents() {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
  });

  return students;
}
