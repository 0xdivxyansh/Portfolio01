export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  metric: string
  metricLabel: string
  location: string
  featured?: boolean
}

export const education: Education[] = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    degree: 'B.Tech in Computer Science (IoT)',
    period: '2023 — 2027',
    metric: '9.03',
    metricLabel: 'CGPA',
    location: 'Vellore, India',
    featured: true,
  },
  {
    id: 'st-paul',
    institution: 'St. Paul High School',
    degree: 'Senior Secondary',
    period: '2021 — 2023',
    metric: '88.8%',
    metricLabel: 'Percentage',
    location: 'Bihar, India',
  },
  {
    id: 'bd-public',
    institution: 'B.D Public School',
    degree: 'Secondary Education',
    period: '2020 — 2021',
    metric: '89.0%',
    metricLabel: 'Percentage',
    location: 'Bihar, India',
  },
]