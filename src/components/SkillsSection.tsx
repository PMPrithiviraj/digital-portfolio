import { motion, useReducedMotion } from 'framer-motion'

type SkillGroup = {
  title: string
  skills: { name: string; evidence: string }[]
}

const groups: SkillGroup[] = [
  {
    title: 'Languages & web',
    skills: [
      { name: 'Python', evidence: 'Encrypted file storage & face recognition projects' },
      { name: 'JavaScript (ES6+)', evidence: 'Site-wide — all interactive features' },
      { name: 'TypeScript', evidence: 'This portfolio rebuild' },
      { name: 'HTML5 / CSS3', evidence: 'All projects' },
      { name: 'ASP.NET', evidence: 'Coursework' },
    ],
  },
  {
    title: 'Full-stack & security',
    skills: [
      { name: 'MongoDB', evidence: 'Encrypted file storage — schema design' },
      { name: 'REST APIs', evidence: 'Encrypted file storage project' },
      { name: 'JWT authentication', evidence: 'Encrypted file storage — role-based access control' },
      { name: 'AES-256 encryption', evidence: 'Encrypted file storage project' },
      { name: 'SQL Server / Oracle', evidence: 'Coursework' },
    ],
  },
  {
    title: 'Tools & in progress',
    skills: [
      { name: 'React + Tailwind CSS', evidence: 'Built this entire portfolio (login & cart demos above)' },
      { name: 'Node.js', evidence: 'In progress — MERN Stack Training, Shavin Infotech' },
      { name: 'Git / GitHub', evidence: 'Version control across all projects' },
      { name: 'Bootstrap / jQuery', evidence: 'Coursework' },
      { name: 'Figma / Canva', evidence: 'Design assets for this site' },
    ],
  },
  {
    title: 'Education & certifications',
    skills: [
      { name: "Bachelor's in Computer Science", evidence: 'Sridevi Arts and Science College, Ponneri' },
      { name: 'MERN Stack Training', evidence: 'Shavin Infotech' },
      { name: 'Full Stack Development Masterclass', evidence: 'NoviTech R&D Pvt Ltd' },
    ],
  },
]

export default function SkillsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="bg-bg-base px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-ink-primary sm:text-4xl">Skills</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-secondary">
          Tied to the work above, not self-rated percentages.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-card bg-bg-card p-6"
            >
              <h3 className="font-display text-lg text-ink-primary">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <p className="text-sm font-medium text-ink-primary">{skill.name}</p>
                    <p className="text-xs text-ink-muted">{skill.evidence}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
