import type { ComponentPropsWithoutRef } from 'react'

type ContainerProps = ComponentPropsWithoutRef<'div'>

/** The page's content column: 73% wide and centred, the width of the banner image and the logo's left edge. */
export function Container({ className = '', ...props }: ContainerProps) {
  return <div className={`mx-auto w-[73%] ${className}`} {...props} />
}
