export type ClientLogo = {
  src: string
  name: string
}

/** Listed right to left: the strip is laid out from its right edge. */
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
 * Ruled strip with the title on the left and logos on the right. When they no longer fit side by
 * side, the logos wrap onto their own line. On mobile they sit under the title at 30% width each.
 */
export function ClientLogos({ title = 'Our satisfied clients:', logos = defaultLogos, className = '' }: ClientLogosProps) {
  return (
    // pt-[18px] stands in for the stray "." line of text above the original's heading.
    <div className={`min-h-[96px] border-y-[3px] border-muted pt-[18px] mobile:min-h-[126px] ${className}`}>
      <div className="mt-2.5 flex flex-wrap items-start mobile:mt-0 mobile:block">
        <h2 className="pb-[15px] font-display text-[28px] font-lighter text-accent mobile:min-h-8 mobile:pb-[5px] mobile:text-[22px]">
          {title}
        </h2>
        <ul className="ml-auto flex flex-row-reverse items-start mobile:mt-[15px]">
          {logos.map((logo) => (
            <li key={logo.src} className="ml-[50px] mobile:mr-2.5 mobile:ml-0 mobile:w-[30%] mobile:min-w-0">
              <img src={logo.src} alt={logo.name} className="mobile:w-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
