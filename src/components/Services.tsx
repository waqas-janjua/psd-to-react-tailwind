import { type Service, ServiceCard } from './ServiceCard'

const defaultServices: Service[] = [
  {
    title: 'Web design',
    iconSrc: '/images/icon1.jpg',
    iconAlt: 'Laptop icon',
    description: 'Nulla dapibus sem at velit gravida vulputate. Viivamus ut risus leo. Pellenlesque nec orci nec dolor.',
  },
  {
    title: 'Logo design',
    iconSrc: '/images/logo2.jpg',
    iconAlt: 'Stamp icon',
    description:
      'Suspenxdisse enim risus. laculis suscipil elementum vel, ornare eu libero.In posuere urna posuere congue.',
  },
  {
    title: 'Print design',
    iconSrc: '/images/logo3.jpg',
    iconAlt: 'Pencil cup icon',
    description:
      'Lorem ipsum color sit emet, consectetur adipiscing elit.Maecenas placerat, libero quis pulvinar.',
  },
]

type ServicesProps = {
  services?: Service[]
}

/**
 * Full-bleed blue band that slides 70px up behind the bottom of the hero banner (500px on mobile,
 * where the banner is shorter than the hero). It sits behind the page (`-z-1`), so the banner image
 * stays on top and the white section below covers whatever runs past the band's fixed desktop height.
 * Below 894px the cards stack and the band grows to fit them; the original kept a fixed height there
 * too, which hid the last card's icon and text on mobile.
 */
export function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section
      aria-label="Services"
      className="relative -z-1 -mx-2 -mt-[70px] h-[228px] border-y-4 border-band-edge bg-band mobile:-mt-[500px] stacked:h-auto stacked:pb-[67px]"
    >
      <div className="flex stacked:block">
        {services.map((service, i) => (
          <ServiceCard key={service.title} {...service} leading={i === 0} />
        ))}
      </div>
    </section>
  )
}
