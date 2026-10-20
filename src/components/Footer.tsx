import { type BlogPost, BlogPostPreview } from './BlogPostPreview'
import { FooterColumn } from './FooterColumn'
import { SocialLinks } from './SocialLinks'

const posts: BlogPost[] = [
  {
    title: 'Maecenas elit enim',
    date: '31 january 2011',
    excerpt: ['Aenean ligula arcu,', 'volutpat sed fringilla...'],
    imageSrc: '/images/logo9.jpg',
  },
  {
    title: 'Maecenas elit enim',
    date: '31 january 2011',
    excerpt: ['Praesent leo diam,', 'lacinia slt amet consectetur...'],
    imageSrc: '/images/logo10.jpg',
  },
]

/**
 * Dark footer: tweets, social links and contact details, recent posts, then the copyright rule.
 * Heights are minimums (the original's were fixed), so when text wraps more, the rule moves down
 * rather than running through the posts.
 */
export function Footer() {
  return (
    <footer className="min-h-[404px] border-t-4 border-ink-soft bg-footer stacked:min-h-[924px]">
      {/* With the rule 11px under it, the 329px minimum puts the rule where the original's sat. */}
      <div className="flex min-h-[329px] items-start stacked:block">
        <FooterColumn title="Latest tweets" className="ml-[14%] stacked:ml-[10%] stacked:h-[250px]">
          {/* The text may run 2px past the box, as in the original at 414px; past that the box grows
              (the original's fixed 150px let the last line spill out of the box at narrower widths). */}
          <div className="mt-5 flow-root min-h-[150px] rounded-lg bg-ink-soft stacked:w-[80%]">
            <p className="-mb-0.5 font-display text-light">
              ©<span className="text-accent">uniMall</span> Quisque venenatis, nisi quis condimentum viverra, lorem erat
              interdum eros, ac feugiat lorem magna vitae lorem.
              <br />
              <br />
              ©<span className="text-accent">orgGrp</span> Donec et leo saplen. Ut vitae nisi ut purus suscipit.
            </p>
          </div>
          <img src="/images/spr.jpg" alt="Twitter bird" />
        </FooterColumn>

        <FooterColumn title="Socialize with us" className="ml-[35px] stacked:h-[250px]">
          <SocialLinks />
          <address className="mt-3 mb-4 font-display not-italic">
            23rd Bluish Ave,
            <br />
            Bucharest, Romania
            <br />
            (40)733.123.321 / (40)733.124.421
            <br />
            <br />
            <span className="text-accent">
              hello@infront.com
              <br />
              http://blog.infront.com
            </span>
          </address>
        </FooterColumn>

        <FooterColumn title="Recent blog enteries" className="ml-[35px]">
          {posts.map((post) => (
            <BlogPostPreview key={post.imageSrc} {...post} />
          ))}
        </FooterColumn>
      </div>

      <div className="mt-[11px] ml-[14%] flex w-[72%] border-t-4 border-ink-soft font-display text-light stacked:ml-[10%] stacked:w-[80%]">
        <p className="mt-5 mb-4 w-1/2">
          ©inFRONT 2011.<span className="text-accent"> All right reserved.</span>
        </p>
        <div className="flex w-1/2 justify-end">
          <p className="mt-5 mb-4">Design by waqas janjua</p>
        </div>
      </div>
    </footer>
  )
}
