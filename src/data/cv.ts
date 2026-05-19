import { CVData } from '@/types';

// ============================================
// CV Data - Update with your actual CV info
// ============================================

export const cvData: CVData = {
  summary: `I'm a Year 12 student who builds websites. I run 5km every day, read a lot, and im to be as literate as possible in each of my endeavours. This portfolio is built from scratch with Next.js. It pulls real data from YouTube, GitHub, and Strava APIs – I wanted to create a platform I would actually utilise once I'd finished coding it. I'm currently working on Exam Spec Adaptive Revision – an AI tool that turns your study notes into flashcards and exam questions. I'm open to apprenticeships, junior dev roles and any new experiences, especially where there is active passion for greatness and that actually helps others.`,

  education: [
    {
      id: '1',
      degree: 'GCSEs',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2020-09',
      endDate: '2025-07',
      highlights: [
        'Computer Science (8)',
        'Mathematics (8)',
        'Geography (8)',
        'Physics (8)',
        'Psychology (8)',
        'Religious Studies (7)',
        'English Language (7)',
        'Further Mathematics (6)',
        'English Literature (6)',
        'Business (6)',
        'Biology (6)',
        'Chemistry (6)',
        'Engineering Manufacture (Distinction D2)',
      ],
    },
    {
      id: '2',
      degree: 'Wheeler Programme',
      institution: 'Wellington College',
      location: 'Crowthorne, Berkshire',
      startDate: '2020-09',
      endDate: '2022-07',
      highlights: [
        'Five-year fully funded enrichment programme for Year 9 students from partner state schools',
        'Five-day residential induction',
        'Regular study days at Wellington College',
        'Academic consolidation and soft-skills development',
        'Mentoring and work experience placements',
      ],
    },
    {
      id: '3',
      degree: 'A Levels',
      institution: 'Collingwood College',
      location: 'Surrey, United Kingdom',
      startDate: '2025-09',
      endDate: '2027-07',
      highlights: ['Computer Science', 'Mathematics', 'Geography'],
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
        "It's a student leadership role where I represent students and help organise sports activities and wellbeing initiatives across the college.",
      highlights: [
        'Organise and co-ordinate sports events for students',
        'Promote wellbeing initiatives and healthy lifestyle choices',
        'Represent students and communicate with staff',
        "It's helped me develop leadership and communication skills",
      ],
      techStack: ['Leadership', 'Event Organisation', 'Communication'],
    },
    {
      id: '2',
      role: 'RAF Work Experience',
      company: 'Royal Air Force',
      location: 'United Kingdom',
      startDate: '2025-03',
      current: false,
      endDate: '2025-03',
      description:
        'One-week virtual work experience placement at RAF. It was good to see what a professional environment looks like and understand how things work in bigger organisations.',
      highlights: ['Virtual placement', 'SpringPod programme'],
      techStack: [],
    },
    {
      id: '3',
      role: 'Lenovo Work Experience',
      company: 'Lenovo',
      location: 'Farnborough, United Kingdom',
      startDate: '2025-11',
      current: false,
      endDate: '2025-11',
      description:
        'We spent a week at Lenovo shadowing different teams. It gave me insight into how a large tech company operates, how different roles work together and what to expect in a professional environment.',
      highlights: [
        'Lead the planning of a hypothetical event which we pitched to the team',
        'Observed professional workplace routines and communication standards',
        'Gained insight into operations at a large tech company including meetings',
        'Learned what to expect in a professional and productive environment',
      ],
      techStack: ['Professional Communication', 'Workplace Awareness'],
    },
  ],

  employment: [
    {
      id: '1',
      role: 'Shelf Stocker / Store Assistant',
      company: 'Local Newsagents',
      location: 'Surrey, United Kingdom',
      startDate: '2024-01',
      current: true,
      description:
        "Customer service and shop floor work. It's pretty straightforward – help customers find what they need and keep shelves stocked.",
      highlights: [
        'Helped customers find what they needed accurately and efficiently',
        'Restocked shelves and kept the shop floor organised',
        'Managed multiple tasks during busy periods',
        "It's built reliability, punctuality, and time-management skills",
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
