type SkillListProps = {
  skills: string[]
  iconSrc?: string
}

/** Check-marked list of skills. */
export function SkillList({ skills, iconSrc = '/images/logo4.jpg' }: SkillListProps) {
  return (
    // No bottom margin: the original's 16px ran past its fixed-height column and took no space.
    <ul className="mt-4 pl-10">
      {skills.map((skill) => (
        <li key={skill} className="p-2 font-display text-muted">
          {/* Inline on the text baseline, as in the original: the 18px-tall check sets the line height. */}
          <img src={iconSrc} alt="" className="inline align-baseline" />
          {` ${skill}`}
        </li>
      ))}
    </ul>
  )
}
