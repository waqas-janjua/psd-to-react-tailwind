export type Service = {
  title: string
  iconSrc: string
  iconAlt: string
  description: string
}

type ServiceCardProps = Service & {
  /** The first card is narrower and starts at the content column; the others have inset icon and text. */
  leading?: boolean
}

/**
 * One column of the services band: title, then icon and description side by side. The first card keeps
 * its 80px top padding until mobile, so its title clears the hero banner that overlaps the band.
 */
export function ServiceCard({ title, iconSrc, iconAlt, description, leading = false }: ServiceCardProps) {
  return (
    <article
      className={`pt-20 stacked:ml-[15%] stacked:w-[85%] ${leading ? 'ml-[14%] w-[26%] mobile:pt-10' : 'w-[27%] stacked:pt-10'}`}
    >
      <h2 className="my-[0.67em] pb-[15px] font-display text-[28px] font-lighter text-light">{title}</h2>
      <div className="flex">
        {/* Fixed 60px rows, as in the original: longer descriptions run past them rather than
            pushing the next card down. */}
        <div className={`h-[60px] shrink-0 ${leading ? 'w-[30%]' : 'w-[calc(28%+12px)] pl-3'}`}>
          <img src={iconSrc} alt={iconAlt} />
        </div>
        <div className={`h-[60px] shrink-0 ${leading ? 'w-[42%]' : 'w-[calc(40%+6px)] pl-1.5'}`}>
          <p className="my-3 font-display text-[12px] font-lighter text-light">{description}</p>
        </div>
      </div>
    </article>
  )
}
