import { CVData } from "@/types";

// ============================================
// CV Data - Update with your actual CV info
// ============================================

export const cvData: CVData = {
  summary: `I'm a Year 12 student who builds things with code. I run 5km every day, read a lot, and create stuff that helps people.

This portfolio is something I built from scratch with Next.js. It pulls real data from YouTube, GitHub, and Strava APIs – I wanted to build something that actually works, not just something that looks nice.

Currently working on Exam Spec Adaptive Revision – an AI tool that turns your study notes into flashcards and exam questions. More on that soon.

I'm open to apprenticeships and junior dev roles where I can build things, not just talk about them. But I'm also not closing myself off to other opportunities either.`,

  experience: [
    {
      id: "1",
      role: "Head of Sport and Wellbeing",
      company: "Collingwood College",
      location: "Surrey, United Kingdom",
      startDate: "2024-09",
      current: true,
      description:
        "It's a student leadership role where I represent students and help organise sports activities and wellbeing initiatives across the college.",
      highlights: [
        "Organise and co-ordinate sports events for students",
        "Promote wellbeing initiatives and healthy lifestyle choices",
        "Represent students and communicate with staff",
        "It's helped me develop leadership and communication skills",
      ],
      techStack: ["Leadership", "Event Organisation", "Communication"],
    },
    {
      id: "2",
      role: "Shelf Stocker / Store Assistant",
      company: "Local Newsagents",
      location: "Surrey, United Kingdom",
      startDate: "2024-01",
      current: true,
      description:
        "Customer service and shop floor work. It's pretty straightforward – help customers find what they need and keep shelves stocked.",
      highlights: [
        "Helped customers find what they needed accurately and efficiently",
        "Restocked shelves and kept the shop floor organised",
        "Managed multiple tasks during busy periods",
        "It's built reliability, punctuality, and time-management skills",
      ],
      techStack: ["Customer Service", "Time Management", "Communication"],
    },
    {
      id: "3",
      role: "RAF Work Experience",
      company: "Royal Air Force",
      location: "United Kingdom",
      startDate: "2025-03",
      current: false,
      endDate: "2025-03",
      description:
        "One-week virtual work experience placement at RAF. It was good to see what a professional environment looks like and understand how things work in bigger organisations.",
      highlights: [
        "Virtual placement",
        "SpringPod programme",
      ],
      techStack: [],
    },
    {
      id: "4",
      role: "Wheeler Programme",
      company: "Wellington College",
      location: "Berkshire, UK",
      startDate: "2020-09",
      endDate: "2022-07",
      current: false,
      description:
        "Wheeler Programme at Wellington College - a fully funded educational programme for state school students. Took part in various academic and enrichment activities.",
      highlights: [
        "Selected student",
        " Widening Access programme",
      ],
      techStack: [],
    },
    {
      id: "5",
      role: "Work Experience (School Placement)",
      company: "Lenovo",
      location: "United Kingdom",
      startDate: "2024-09",
      endDate: "2024-09",
      current: false,
      description:
        "Week at Lenovo shadowing different teams. It gave me insight into how a large tech company operates and what to expect in a professional environment.",
      highlights: [
        "Observed professional workplace routines and communication standards",
        "Gained insight into operations at a large tech company",
        "Learned what to expect in a professional environment",
      ],
      techStack: ["Professional Communication", "Workplace Awareness"],
    },
  ],

  education: [
    {
      id: "1",
      degree: "A Levels (Year 12 - 13)",
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
      category: "Frameworks",
      items: ["Next.js", "React", "Express.js", "Node.js"],
    },
    {
      category: "APIs",
      items: ["YouTube Data API", "GitHub API", "Strava API"],
    },
    {
      category: "Hosting",
      items: ["Vercel", "Netlify", "Render"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub"],
    },
    {
      category: "Soft Skills",
      items: [
        "Leadership",
        "Reliability",
        "Punctuality",
        "Communication",
        "Problem Solving",
        "Consistency",
      ],
    },
  ],

  projects: [
    {
      id: "1",
      name: "Personal Portfolio",
      description: "This website – I built it with Next.js from scratch. It pulls real data from YouTube, GitHub, and Strava APIs. I wanted something that actually works, not just something that looks nice.",
      techStack: ["Next.js", "React", "TypeScript", "YouTube API", "GitHub API", "Strava API", "Vercel"],
      url: "https://github.com/joshuaargent/portfolio",
      highlights: [
        "Integrated YouTube, GitHub, and Strava APIs for real-time data display",
        "Responsive design with modern UI/UX",
        "Dynamic content fetching from multiple external sources",
      ],
    },
    {
      id: "2",
      name: "Exam Spec Adaptive Revision",
      description: "An AI tool that turns your study notes into flashcards and exam questions by comparing them against the exam spec. It's still in development but the code is on GitHub.",
      techStack: ["Next.js", "AI/ML", "TypeScript"],
      url: "https://github.com/joshuaargent/exam-spec-adaptive-revision",
      highlights: [
        "AI analysis to compare study notes against exam specifications",
        "Automatic flashcard and question generation",
        "Building in public – codebase on GitHub",
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
