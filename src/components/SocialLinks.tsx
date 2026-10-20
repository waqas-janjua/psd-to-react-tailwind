export type SocialLink = {
  label: string
  href: string
  iconSrc: string
}

const defaultLinks: SocialLink[] = [
  { label: 'Facebook', href: '#', iconSrc: '/images/face.jpg' },
  { label: 'Twitter', href: '#', iconSrc: '/images/twi.jpg' },
  { label: 'Flickr', href: '#', iconSrc: '/images/soc3.jpg' },
  { label: 'RSS', href: '#', iconSrc: '/images/soc4.jpg' },
]

type SocialLinksProps = {
  links?: SocialLink[]
}

/** Row of social icons, bottom-aligned like the original's inline images (which differ in height). */
export function SocialLinks({ links = defaultLinks }: SocialLinksProps) {
  return (
    <ul className="mt-5 flex h-[50px] items-end gap-3.5 pb-2 pl-[50px]">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href}>
            <img src={link.iconSrc} alt={link.label} />
          </a>
        </li>
      ))}
    </ul>
  )
}
