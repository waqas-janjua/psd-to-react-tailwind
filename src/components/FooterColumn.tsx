import type { ComponentPropsWithoutRef } from 'react'

type FooterColumnProps = ComponentPropsWithoutRef<'div'> & {
  title: string
}

/** A titled footer column: 22% wide on desktop, stacked at 80% width below 894px. */
export function FooterColumn({ title, className = '', children, ...props }: FooterColumnProps) {
  return (
    <div className={`mt-[50px] flow-root w-[22%] text-light stacked:mt-2.5 stacked:w-[80%] ${className}`} {...props}>
      <h2 className="my-[0.67em] font-footer text-[30px] font-lighter text-light">{title}</h2>
      {children}
    </div>
  )
}
