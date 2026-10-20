import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  /** Pre-rendered button graphic, as used by the original design. */
  imageSrc: string
  label: string
  imageClassName?: string
}

/** Link rendered as an image button (the original's buttons are bitmap graphics). */
export function Button({ imageSrc, label, imageClassName = '', ...props }: ButtonProps) {
  return (
    <a {...props}>
      <img src={imageSrc} alt={label} className={`inline align-bottom ${imageClassName}`} />
    </a>
  )
}
