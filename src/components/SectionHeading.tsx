import type { ComponentPropsWithoutRef } from 'react'

type SectionHeadingProps = ComponentPropsWithoutRef<'h2'>

/** Grey Montserrat heading used in the white content section. */
export function SectionHeading({ className = '', ...props }: SectionHeadingProps) {
  return (
    <h2
      className={`mt-2.5 mb-[0.67em] pb-[15px] font-display text-[28px] font-lighter text-muted mobile:mt-0 mobile:pb-[5px] mobile:text-[22px] ${className}`}
      {...props}
    />
  )
}
