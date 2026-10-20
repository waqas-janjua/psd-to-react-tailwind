import { ClientLogos } from './ClientLogos'
import { SectionHeading } from './SectionHeading'
import { SkillList } from './SkillList'

const skills = ['Web Development', 'Internet Marketing', 'Email & Mobile Marketing', 'Branding & print', 'Art Direction']

/**
 * White section under the services band: intro text and skills side by side (skills wrap under the
 * text below 1123px), client logos below. Heights are minimums where the original's were fixed, so
 * content that no longer fits pushes the footer down instead of spilling over it.
 */
export function About() {
  return (
    <section className="mt-[7px] flex min-h-[460px] flex-wrap content-start items-start bg-surface mobile:mt-2 mobile:min-h-[690px] stacked:block">
      <div className="ml-[14%] min-h-[300px] w-[42%] pt-5 stacked:mx-[5%] stacked:flow-root stacked:min-h-0 stacked:w-[90%] mobile:min-h-[300px]">
        <SectionHeading>What do we really do?</SectionHeading>
        {/* The original's column had a fixed height and the text could run past it, into the padding
            above the next heading (26px on desktop, at 894-1122px; 14px on mobile). The negative margin
            allows that much overrun before the column grows, so the next heading never sits closer
            than 4px (6px on mobile) to the text instead of overprinting it as the original did at 375px. */}
        <p className="mt-2.5 -mb-[26px] font-display text-muted stacked:mb-[1em] mobile:-mb-3.5 mobile:text-[15px]">
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

      {/* The fixed 155px gap moves this column under the text below 1123px, as in the original. */}
      <div className="ml-[155px] min-h-[300px] w-[30%] pt-5 mobile:min-h-[260px] stacked:mx-[5%] stacked:w-[90%]">
        <SectionHeading>Some of our skills</SectionHeading>
        <SkillList skills={skills} />
      </div>

      <ClientLogos className="mr-[14%] ml-auto w-[72%] stacked:mr-0 stacked:ml-[8%] stacked:w-[80%]" />
    </section>
  )
}
