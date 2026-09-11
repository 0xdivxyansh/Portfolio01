export type SkillCategory = 'PROGRAMMING' | 'WEB' | 'DATABASES' | 'TOOLS' | 'CORE'

export interface Skill {
  name: string
  category: SkillCategory
}

export const categoryMeta: Record<SkillCategory, { color: string; glow: string; desc: string }> = {
  PROGRAMMING: { color: '#4d7cff', glow: 'rgba(77,124,255,0.55)', desc: 'Java · Python · C · C++ — strong fundamentals' },
  WEB: { color: '#22d3ee', glow: 'rgba(34,211,238,0.55)', desc: 'HTML · CSS · JavaScript · React.js' },
  DATABASES: { color: '#8b7cff', glow: 'rgba(139,124,255,0.55)', desc: 'SQL — structured data & queries' },
  TOOLS: { color: '#f2c14e', glow: 'rgba(242,193,78,0.5)', desc: 'Git · VS Code' },
  CORE: { color: '#6ee7b7', glow: 'rgba(110,231,183,0.5)', desc: 'Problem-Solving · Analytical Thinking · Teamwork' },
}

export const categories: SkillCategory[] = ['PROGRAMMING', 'WEB', 'DATABASES', 'TOOLS', 'CORE']

export const skills: Skill[] = [
  { name: 'Java', category: 'PROGRAMMING' },
  { name: 'Python', category: 'PROGRAMMING' },
  { name: 'C', category: 'PROGRAMMING' },
  { name: 'C++', category: 'PROGRAMMING' },
  { name: 'HTML', category: 'WEB' },
  { name: 'CSS', category: 'WEB' },
  { name: 'JavaScript', category: 'WEB' },
  { name: 'React.js', category: 'WEB' },
  { name: 'SQL', category: 'DATABASES' },
  { name: 'Git', category: 'TOOLS' },
  { name: 'VS Code', category: 'TOOLS' },
  { name: 'Problem-Solving', category: 'CORE' },
  { name: 'Analytical Thinking', category: 'CORE' },
  { name: 'Teamwork', category: 'CORE' },
]

export const coursework = ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP']