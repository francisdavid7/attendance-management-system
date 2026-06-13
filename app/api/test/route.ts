// import { prisma } from "@/lib/prisma";
// import { faker } from "@faker-js/faker";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { Role } from "@prisma/client";

// export async function POST() {
//   try {
//     const users = await Promise.all(
//       Array.from({ length: 40 }).map(async () => ({
//         fullName: faker.person.fullName(),
//         email: faker.internet.email(),
//         password: await bcrypt.hash("password123", 10),
//         role: Role.STUDENT,
//       })),
//     );

//     const user = await prisma.user.createMany({
//       data: users,
//     });

//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
