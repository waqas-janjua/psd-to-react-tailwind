import { ClientLogos } from './ClientLogos'
import { SectionHeading } from './SectionHeading'
import { SkillList } from './SkillList'

const skills = ['Web Development', 'Internet Marketing', 'Email & Mobile Marketing', 'Branding & print', 'Art Direction']

/**
 * White section under the services band: intro text and skills side by side, client logos below.
 * Heights are minimums (the original's were fixed), so longer text pushes the content below down
 * instead of running into it.
 */
export function About() {
  return (
    <section className="mt-[7px] flex min-h-[460px] flex-wrap content-start items-start bg-surface mobile:mt-2 mobile:min-h-[690px] stacked:block">
      <div className="ml-[14%] min-h-[300px] w-[42%] pt-5 stacked:mx-[5%] stacked:flow-root stacked:min-h-0 stacked:w-[90%] mobile:min-h-[300px]">
        <SectionHeading>What do we really do?</SectionHeading>
        {/* On mobile the next heading sits 6px under the last line, as in the original, where the
            text ran 14px past its fixed-height column. */}
        <p className="mt-2.5 mb-[1em] font-display text-muted mobile:-mb-3.5 mobile:text-[15px]">
          <b>inFRONT</b> nec tincidunt metus ullamcorper eu.Donec at leo sapien. Ut vitae nisi ut{' '}
          <span className="text-accent">purus</span> suscipit placerat sit amet eleifend diam. Aliquam erat volutpat.
          Aenean ligula arcu, volupat sed fringilla vel, gravida ut ligula.
          <br />
          <br />
          <span className="text-accent">Morbi ligula</span> nulla, pharetra id ultricies ac, iterdum id massa, Quisque
          venenatis, nisi quis condimentum viverra, lorem erat interdum eros, ac feugiat lorem magna vitae lorem.
          Praesent leo diam, lacinia sit amet consectetur at, euismod et metus. Utat tortor sed sem mollis tempor.
        </p>
      </div>

      {/* The original's fixed 155px gap pushed this column under the text below 1123px; it now shrinks. */}
      <div className="ml-[min(155px,14%)] min-h-[300px] w-[30%] pt-5 mobile:min-h-[260px] stacked:mx-[5%] stacked:w-[90%]">
        <SectionHeading>Some of our skills</SectionHeading>
        <SkillList skills={skills} />
      </div>

      <ClientLogos className="mr-[14%] ml-auto w-[72%] stacked:mr-0 stacked:ml-[8%] stacked:w-[80%]" />
    </section>
  )
}
