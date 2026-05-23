import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const pass = "password123";
    const password = await hashPassword(pass);

    // const users = Array.from({ length: 15 }).map(() => ({
    //   fullName: faker.person.fullName(),
    //   email: faker.internet.email().toLowerCase(),
    //   password: password,
    //   role: Role.TUTOR,
    //   isVerified: true,
    // }));

    const createdUsers = await prisma.course.createMany({
      data: [
        {
          name: "Introduction to Computer Science",
          description:
            "Learn the fundamentals of programming, algorithms, and computational thinking.",
        },
        {
          name: "Web Development",
          description:
            "Build responsive and interactive web applications using modern technologies.",
        },
        {
          name: "Database Management Systems",
          description:
            "Understand database design, SQL, normalization, and data relationships.",
        },
        {
          name: "Software Engineering",
          description:
            "Explore software development principles, testing, and agile workflows.",
        },
        {
          name: "Artificial Intelligence",
          description:
            "Introduction to intelligent systems, machine learning, and AI applications.",
        },
        {
          name: "Cybersecurity Fundamentals",
          description:
            "Learn how to secure networks, systems, and applications from cyber threats.",
        },
        {
          name: "Mobile App Development",
          description:
            "Create mobile applications for Android and iOS using modern frameworks.",
        },
        {
          name: "Cloud Computing",
          description:
            "Understand cloud services, deployment models, and scalable infrastructure.",
        },
        {
          name: "Data Structures and Algorithms",
          description:
            "Master efficient problem-solving techniques using common data structures.",
        },
        {
          name: "Computer Networks",
          description:
            "Study communication systems, protocols, and internet architecture.",
        },
        {
          name: "Operating Systems",
          description:
            "Learn how operating systems manage hardware, memory, and processes.",
        },
        {
          name: "Human Computer Interaction",
          description:
            "Design user-friendly interfaces and improve digital user experiences.",
        },
        {
          name: "Digital Marketing",
          description:
            "Explore online branding, SEO, social media, and advertising strategies.",
        },
        {
          name: "Graphic Design",
          description:
            "Learn visual communication, typography, and modern design principles.",
        },
        {
          name: "UI/UX Design",
          description:
            "Create intuitive user interfaces and engaging user experiences.",
        },
        {
          name: "Blockchain Technology",
          description:
            "Understand decentralized systems, cryptocurrencies, and smart contracts.",
        },
        {
          name: "DevOps Engineering",
          description:
            "Learn CI/CD pipelines, automation, deployment, and infrastructure management.",
        },
        {
          name: "Machine Learning",
          description:
            "Build predictive models and learn supervised and unsupervised learning.",
        },
        {
          name: "Game Development",
          description:
            "Develop interactive games using game engines and programming concepts.",
        },
        {
          name: "Embedded Systems",
          description:
            "Study microcontrollers, hardware programming, and IoT systems.",
        },
        {
          name: "Computer Graphics",
          description:
            "Learn image rendering, animation, and graphical computing techniques.",
        },
        {
          name: "Project Management",
          description:
            "Understand project planning, execution, monitoring, and delivery.",
        },
        {
          name: "Ethical Hacking",
          description:
            "Learn penetration testing and methods used to identify system vulnerabilities.",
        },
        {
          name: "Big Data Analytics",
          description:
            "Analyze massive datasets using modern big data tools and frameworks.",
        },
        {
          name: "Internet of Things",
          description:
            "Connect devices and systems for smart automation and real-time monitoring.",
        },
        {
          name: "E-Commerce Systems",
          description:
            "Understand online business systems, payment gateways, and digital commerce.",
        },
        {
          name: "Computer Vision",
          description:
            "Learn how machines process and interpret visual information from images.",
        },
        {
          name: "Natural Language Processing",
          description:
            "Explore text analysis, language models, and AI-driven communication systems.",
        },
        {
          name: "Advanced JavaScript",
          description:
            "Master asynchronous programming, APIs, and advanced JavaScript concepts.",
        },
        {
          name: "React Development",
          description:
            "Build dynamic frontend applications using React and component architecture.",
        },
      ],
    });

    return NextResponse.json({ message: "Users created!", createdUsers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
