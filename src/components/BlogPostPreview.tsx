export type BlogPost = {
  title: string
  date: string
  /** Excerpt, one entry per line. */
  excerpt: string[]
  imageSrc: string
  href?: string
}

/** Thumbnail with title, date and a short accent-coloured excerpt. */
export function BlogPostPreview({ title, date, excerpt, imageSrc, href = '#' }: BlogPost) {
  return (
    <article className="group flex items-start">
      <a href={href} className="mt-5 w-1/4 shrink-0">
        <img src={imageSrc} alt={title} />
      </a>
      <div className="mt-[5px] w-3/4">
        {/* The last post has no bottom margin, so the footer rule spacing is measured from its text. */}
        <p className="mt-3 mb-4 font-display text-light group-last:mb-0">
          {title}
          <br />
          {date}
          <br />
          <span className="text-accent">
            {excerpt.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </span>
        </p>
      </div>
    </article>
  )
}
