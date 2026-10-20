export type ClientLogo = {
  src: string
  name: string
}

/** Listed right to left: the logos float right, as in the original. */
const defaultLogos: ClientLogo[] = [
  { src: '/images/logo5.jpg', name: "Rowan's Bar & Restaurant" },
  { src: '/images/logo6.jpg', name: 'unimall.de' },
  { src: '/images/logo8.jpg', name: 'Orange Group' },
]

type ClientLogosProps = {
  title?: string
  logos?: ClientLogo[]
  className?: string
}

/**
 * Ruled strip with the title on the left and the logos floated right on the same line, so when space
 * runs out the last logo drops below the others, as in the original. On mobile the logos sit under
 * the title at 30% width each. The strip contains its floats, so a dropped logo stretches it instead
 * of crossing the bottom rule (or, on mobile, landing in the footer).
 */
export function ClientLogos({ title = 'Our satisfied clients:', logos = defaultLogos, className = '' }: ClientLogosProps) {
  return (
    // pt-[18px] stands in for the stray "." line of text above the original's heading.
    <div className={`flow-root min-h-[96px] border-y-[3px] border-muted pt-[18px] mobile:min-h-[126px] ${className}`}>
      {/* Heading font on the wrapper, so the line the logos float beside has the heading's height. */}
      <div className="mt-2.5 pb-[15px] font-display text-[28px] font-lighter text-accent mobile:mt-0 mobile:pb-[5px] mobile:text-[22px]">
        <h2 className="inline">{title}</h2>{' '}
        {logos.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.name}
            className="float-right ml-[50px] mobile:mt-5 mobile:mr-2.5 mobile:ml-0 mobile:w-[30%]"
          />
        ))}
      </div>
    </div>
  )
}
