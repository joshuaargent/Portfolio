import { CVData } from "@/types";

// ============================================
// CV Data - Update with your actual CV info
// ============================================

export const cvData: CVData = {
  summary: `Year 12 student with practical experience in full-stack web development and over a year of retail work. Reliable, quick to learn, and able to follow instructions and contribute effectively in both technical and non-technical environments. Currently building web projects and learning Python and machine learning concepts.`,

  experience: [
    {
      id: "1",
      role: "Shelf Stocker / Store Assistant",
      company: "Local Newsagents",
      location: "Surrey, United Kingdom",
      startDate: "2024-01",
      current: true,
      description:
        "Assisted customers and maintained store operations.",
      highlights: [
        "Assisted customers and responded to requests accurately and efficiently",
        "Restocked shelves and maintained an organised shop floor",
        "Worked reliably during busy periods while managing multiple tasks",
        "Developed punctuality, consistency, and time-management skills",
      ],
      techStack: ["Customer Service", "Time Management", "Communication"],
    },
    {
      id: "2",
      role: "Work Experience (School Placement)",
      company: "Lenovo",
      location: "United Kingdom",
      startDate: "2024-09",
      endDate: "2024-09",
      current: false,
      description:
        "Observed professional workplace routines and communication standards at a large technology company.",
      highlights: [
        "Observed professional workplace routines and communication standards",
        "Gained insight into operations within a large technology company",
        "Developed understanding of expectations in a professional environment",
      ],
      techStack: ["Professional Communication", " workplace Awareness"],
    },
  ],

  education: [
    {
      id: "1",
      degree: "A Levels (Current)",
      institution: "Collingwood College",
      location: "Surrey, United Kingdom",
      startDate: "2024-09",
      endDate: "2025-07",
      highlights: [
        "Computer Science",
        "Mathematics",
        "Geography",
      ],
    },
    {
      id: "2",
      degree: "GCSEs",
      institution: "Secondary School",
      location: "Surrey, United Kingdom",
      startDate: "2019-09",
      endDate: "2024-07",
      highlights: [
        "Computer Science (8)",
        "Mathematics (8)",
        "Further Mathematics (8)",
        "Physics (8)",
        "Geography (8)",
        "Psychology (8)",
        "English Language (7)",
        "Religious Studies (7)",
        "English Literature (6)",
        "Biology (6)",
        "Chemistry (6)",
        "Business (6)",
        "Engineering Manufacture (Distinction D2)",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Python"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["Next.js", "React", "Express.js", "Node.js"],
    },
    {
      category: "Databases & Hosting",
      items: ["PostgreSQL (Supabase)", "Vercel", "Netlify", "Render"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub"],
    },
    {
      category: "Currently Learning",
      items: ["Python", "Machine Learning"],
    },
    {
      category: "Soft Skills",
      items: [
        "Reliability",
        "Punctuality",
        "Communication",
        "Problem Solving",
        "Time Management",
        "Quick Learner",
      ],
    },
  ],

  certifications: [],
};

// ============================================
// Helper Functions
// ============================================

export async function getCVData(): Promise<CVData> {
  return cvData;
}
