import { Container } from './Container'

export type NavItem = {
  label: string
  href: string
  active?: boolean
}

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '#' },
  { label: 'Portfolio', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
]

type NavBarProps = {
  logoSrc?: string
  items?: NavItem[]
}

export function NavBar({ logoSrc = '/images/logo.jpg', items = defaultItems }: NavBarProps) {
  return (
    <header className="min-h-[82px] border-b-[3px] border-rule bg-surface mobile:h-[82px]">
      <Container className="flex flex-wrap items-start mobile:block mobile:w-full">
        {/* 80px logo in a 79px bar: it overlaps the bottom border by 1px, as in the original. */}
        <img src={logoSrc} alt="inFRONT logo" width={169} height={80} className="-mb-px" />

        {/* The nav's right edge sits 0.5% (of the page) inside the content column. On mobile it
            floats under the logo and the hero text flows below it, as in the original. */}
        <nav className="mt-[33px] mr-[calc(0.5%/0.73)] -mb-[3px] ml-auto mobile:float-left mobile:mx-0 mobile:mt-[15px] mobile:mb-0 mobile:w-full">
          <ul className="flex gap-[34px] mobile:block mobile:pt-4 mobile:pl-10">
            {items.map((item) => (
              <li
                key={item.label}
                className={`py-[14px] font-nav mobile:float-left mobile:ml-1 mobile:p-[3px] ${
                  item.active ? 'border-b-[3px] border-accent px-[14px]' : ''
                }`}
              >
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className="text-[16px] text-nav hover:text-accent hover:transition-[color] hover:duration-500 hover:ease-[ease] mobile:p-1 mobile:text-[19px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
