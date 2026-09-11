export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  technologies: string[]
  description: string
  visual: 'threat' | 'hospital'
  github?: string
  problem: string
  solution: string
  features: string[]
  implementation: string
}

export const projects: Project[] = [
  {
    id: 'threat-detection',
    index: '01',
    title: 'Facial Recognition & Threat Detection System',
    subtitle: 'AI-powered computer vision for real-time identity verification and surveillance monitoring.',
    technologies: ['Python', 'OpenCV', 'AI', 'Computer Vision'],
    description:
      'An AI-powered facial recognition system built with Python and OpenCV that detects faces in real time, verifies identities against stored facial datasets, and powers threat monitoring for surveillance applications.',
    visual: 'threat',
    github: 'https://github.com/0xdivxyansh/Threat-Detection-',
    problem:
      'Surveillance environments require fast, reliable identity verification as live camera feeds arrive, with the ability to keep monitoring for suspicious activity.',
    solution:
      'A Python + OpenCV recognition pipeline that detects faces in real time, compares live images against stored facial datasets, and provides a threat monitoring view for surveillance scenarios.',
    features: [
      'Real-time face detection from camera input',
      'Identity verification against stored facial datasets',
      'Live image comparison for recognition',
      'Threat monitoring interface for surveillance',
    ],
    implementation:
      'Built with Python and OpenCV. The system captures frames from a live feed, runs face detection, verifies identities against the stored facial dataset, and visualizes the monitoring process with a HUD-style interface.',
  },
  {
    id: 'hospital-queue',
    index: '02',
    title: 'Hospital Patient Queue Management System',
    subtitle: 'Automated patient queue dashboard powered by FCFS and priority scheduling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    description:
      'A patient queue dashboard that automates registration and queue management using FCFS and Priority Scheduling, built with React, Node, Express and MongoDB.',
    visual: 'hospital',
    problem:
      'Hospital queues are often managed manually, making registration, ordering and wait handling slow and inconsistent.',
    solution:
      'An automated queue dashboard that registers patients and manages queue order using FCFS and Priority Scheduling, with a clear visual view of the queue state.',
    features: [
      'Patient queue dashboard based on FCFS and Priority Scheduling',
      'Automated patient registration',
      'Automated queue management',
      'Built with React.js, Node.js, Express.js, MongoDB',
    ],
    implementation:
      'React.js front end with a Node.js + Express.js API and MongoDB storage. Scheduling logic handles registration and maintains queue order with FCFS and priority rules.',
  },
]