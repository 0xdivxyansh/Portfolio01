export interface Certification {
  id: string
  title: string
  provider: string
  glyph: string
}

export const certifications: Certification[] = [
  {
    id: 'ibm',
    title: 'IBM Cyber Security Analyst',
    provider: 'IBM SkillsBuild',
    glyph: 'SC',
  },
  {
    id: 'bank-atm',
    title: 'C Programming: Build Bank ATM Machine Software',
    provider: 'Udemy',
    glyph: 'AT',
  },
  {
    id: 'genai',
    title: 'GenAI Powered Data Analytics',
    provider: 'Tata Certificate',
    glyph: 'GA',
  },
]