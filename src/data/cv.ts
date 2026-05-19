import { CVData } from '@/types';

// ============================================
// CV Data - Update with your actual CV info
// ============================================

export const cvData: CVData = {
  summary: `Year 12 student full stack developer, skilled in Next.js, TypeScript, and API driven applications. I am currently developing an AI tool that converts study notes into flashcards and exam questions.

Disciplined and consistent. I run 5km daily and read one book per week. Looking for apprenticeships, junior developer roles, or opportunities where I can contribute, learn fast, and build things that help people.`,

  education: [
    {
      id: '1',
      degree: 'A Levels',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2025-09',
      endDate: '2027-07',
      highlights: ['Computer Science', 'Mathematics', 'Geography'],
    },
    {
      id: '2',
      degree: 'Wheeler Programme',
      institution: 'Wellington College',
      location: 'Crowthorne, Berkshire',
      startDate: '2022-09',
      endDate: '2027-07',
      highlights: [
        'Fully funded 5 year enrichment programme for state school students',
        'Has led to my communication and leadership skills improving massively',
        'Regular study days, academic consolidation, and soft skills development',
      ],
    },
    {
      id: '3',
      degree: 'GCSEs',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2020-09',
      endDate: '2025-07',
      highlights: [
        'Grade 8: Computer Science, Mathematics, Geography, Physics, Psychology',
        'Grade 7: Religious Studies, English Language',
        'Grade 6: Further Mathematics, English Literature, Business, Biology, Chemistry',
        'BTEC: Engineering Manufacture (Distinction D2)',
      ],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frameworks',
      items: ['Next.js', 'React', 'Express.js', 'Node.js'],
    },
    {
      category: 'Databases & Hosting',
      items: ['PostgreSQL', 'Vercel', 'Netlify', 'Render', 'Supabase'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub'],
    },
  ],

  workExperience: [
    {
      id: '1',
      role: 'Head of Sport and Wellbeing',
      company: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2026-04',
      current: true,
      description:
        "Student leadership role representing students and helping organise sports activities and wellbeing initiatives across the college.",
      highlights: [
        'Organising and coordinating sports events for students',
        'Promoting wellbeing initiatives and healthy lifestyle choices',
        'Representing students and communicating with staff',
        'Developing leadership and communication skills',
      ],
      techStack: ['Leadership', 'Event Organisation', 'Communication'],
    },
    {
      id: '2',
      role: 'Lenovo Work Experience',
      company: 'Lenovo',
      location: 'Farnborough, United Kingdom',
      startDate: '2025-11',
      current: false,
      endDate: '2025-11',
      description:
        'Week long work experience shadowing different teams at Lenovo. Gained insight into how a large tech company operates and what to expect in a professional environment.',
      highlights: [
        'Led planning of a hypothetical event which we pitched to the team',
        'Observed professional workplace routines and communication standards',
        'Gained insight into operations at a large tech company',
        'Learned what to expect in a professional and productive environment',
      ],
      techStack: ['Professional Communication', 'Workplace Awareness', 'Planning'],
    },
    {
      id: '3',
      role: 'RAF Virtual Work Experience',
      company: 'Royal Air Force x Springpod',
      location: 'United Kingdom',
      startDate: '2025-04',
      current: true,
      description:
        "First UK Defence virtual work experience programme delivered by Springpod. Exploring the organisation's purpose, history, structure, and the wide range of careers available.",
      highlights: [
        'Exploring RAF structure, careers, values, history and',
        'Insight into life in the RAF including training and career progression',
        'Learning about RAF personnel, stations, and aircraft operations',
        'Discovering apprenticeship and graduate pathways within the RAF',
      ],
      techStack: ['Career Exploration', 'Professional Awareness', 'Defence Sector'],
    },
  ],

  employment: [
    {
      id: '1',
      role: 'Shelf Stocker / Store Assistant',
      company: 'Local Newsagents',
      location: 'Crowthorne, United Kingdom',
      startDate: '2022-09',
      endDate: '2023-09',
      current: false,
      description:
        "Worked at Crowthorne's local newsagents doing customer service and shop floor work. I helped customers find what they needed and kept shelves stocked and tidy.",
      highlights: [
        'Helped customers find what they needed accurately and efficiently',
        'Restocked shelves and kept the shop floor organised',
        'Managed multiple tasks during busy periods',
        "It's built reliability, punctuality, and time management skills",
      ],
      techStack: ['Customer Service', 'Time Management', 'Communication'],
    },
  ],

  projects: [
    {
      id: '1',
      name: 'Personal Portfolio',
      description:
        "This website – I built it with Next.js from scratch. It pulls data from YouTube, GitHub, and Strava APIs. I wanted to create a platform I would actually utilise once I'd finished coding it.",
      techStack: [
        'Next.js',
        'React',
        'TypeScript',
        'YouTube API',
        'GitHub API',
        'Strava API',
        'Vercel',
      ],
      url: 'https://github.com/joshuaargent/portfolio',
      highlights: [
        'Integrated YouTube, GitHub, and Strava APIs for real time data display',
        'Responsive design with modern UI/UX',
        'Dynamic content fetching from multiple external sources',
      ],
    },
    {
      id: '2',
      name: 'Exam Spec Adaptive Revision',
      description:
        "An AI tool that turns your study notes into flashcards and exam questions by comparing them against the exam spec. It's still in development but the code is on GitHub.",
      techStack: ['Next.js', 'AI/ML', 'TypeScript', 'PostgreSQ'],
      url: 'https://github.com/joshuaargent/exam-spec-adaptive-revision',
      highlights: [
        'AI analysis to compare study notes against exam specifications',
        'Automatic flashcard and question generation',
        'Detailed and structured database using PostgreSQL',
      ],
    },
  ],

  additionalSkills: [
    'Reliable and punctual with consistent attendance',
    'Quick learner who adapts well to new tasks and systems',
    'Comfortable following written and verbal instructions',
    'Able to manage tasks independently and stay organised',
    'Clear communicator with customers, colleagues, and supervisors',
    'Logical and analytical approach to problem solving',
  ],

  certifications: [],
};

// ============================================
// Helper Functions
// ============================================

export async function getCVData(): Promise<CVData> {
  return cvData;
}
