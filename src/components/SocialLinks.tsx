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

/**
 * Row of social icons, bottom-aligned like the original's inline images (which differ in height),
 * with the original's line spacing: 4px under each row of icons and 4px more below the block. Icons
 * that don't fit wrap onto a new row as in the original, and the block grows to hold them.
 */
export function SocialLinks({ links = defaultLinks }: SocialLinksProps) {
  return (
    <ul className="mt-5 flex min-h-[50px] flex-wrap content-start items-end gap-x-3.5 gap-y-1 pb-2 pl-[50px]">
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
