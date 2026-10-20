import { Button } from './Button'
import { Container } from './Container'

export function Hero() {
  return (
    <section className="h-[490px] text-center mobile:h-[730px]">
      <p className="my-5 font-display text-[35px] text-muted mobile:mt-[60px] mobile:mb-2.5 mobile:text-[20px]">
        We are talented and dedicated <span className="text-accent">design agency</span>{' '}
        <Button href="#" imageSrc="/images/new.jpg" label="Contact us" imageClassName="mobile:w-[30%]" />
      </p>
      <Container>
        <img src="/images/banner.jpg" alt="R7 Plus – Style Grows Bolder" className="h-[400px] w-full mobile:h-[190px]" />
      </Container>
    </section>
  )
}
