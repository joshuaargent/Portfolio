import { CVData } from "@/types";

// ============================================
// CV Data - Update with your actual CV info
// ============================================

export const cvData: CVData = {
  summary: `Full-stack developer and content creator with a passion for building products that solve real problems. I combine technical expertise with strong communication skills developed through creating educational content for thousands of viewers. I run 5km every day, read one book per week, and believe in the power of consistency and continuous learning.`,

  experience: [
    {
      id: "1",
      role: "Senior Frontend Developer",
      company: "Tech Company",
      location: "City, Country",
      startDate: "2022-01",
      current: true,
      description:
        "Leading frontend development for a SaaS product used by thousands of customers.",
      highlights: [
        "Architected and built a new dashboard using Next.js and TypeScript, improving load times by 40%",
        "Led a team of 4 developers, establishing code review processes and coding standards",
        "Implemented a design system that reduced UI development time by 30%",
        "Mentored junior developers and conducted technical interviews",
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "PostgreSQL",
      ],
    },
    {
      id: "2",
      role: "Frontend Developer",
      company: "Startup Name",
      location: "City, Country",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description:
        "Built and maintained customer-facing web applications for an early-stage startup.",
      highlights: [
        "Developed the main customer portal from scratch using React and Node.js",
        "Implemented real-time features using WebSockets",
        "Reduced bundle size by 50% through code splitting and optimization",
        "Collaborated with designers to implement pixel-perfect UIs",
      ],
      techStack: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    },
    {
      id: "3",
      role: "Junior Developer",
      company: "Agency Name",
      location: "City, Country",
      startDate: "2018-06",
      endDate: "2020-02",
      current: false,
      description:
        "Worked on various client projects, building websites and web applications.",
      highlights: [
        "Built responsive websites for 20+ clients across different industries",
        "Learned to work with clients and manage project timelines",
        "Developed strong CSS and JavaScript fundamentals",
      ],
      techStack: ["JavaScript", "HTML/CSS", "WordPress", "PHP", "MySQL"],
    },
  ],

  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      location: "City, Country",
      startDate: "2014-09",
      endDate: "2018-06",
      gpa: "3.8",
      highlights: [
        "Dean's List all semesters",
        "Capstone project: Built a machine learning model for predicting student performance",
        "Teaching Assistant for Introduction to Programming course",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Prisma", "tRPC", "GraphQL"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions"],
    },
    {
      category: "Soft Skills",
      items: [
        "Communication",
        "Leadership",
        "Problem Solving",
        "Content Creation",
        "Teaching",
      ],
    },
  ],

  certifications: [
    {
      id: "1",
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "2023-06",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (Coursera)",
      date: "2022-03",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    },
  ],
};

// ============================================
// Helper Functions
// ============================================

export async function getCVData(): Promise<CVData> {
  return cvData;
}
