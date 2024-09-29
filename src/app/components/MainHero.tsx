import { Fragment } from 'react'
import RichText from './RichText'
import { Media } from './Media'
import { HeroMain } from 'src/payload-types'
import { CMSLink } from './Link'

type Props = {
  hero: HeroMain['hero']
}

export async function MainHero({ hero: { richText, links, media } }: Props) {
  return (
    <section className="text-white relative flex font-serif items-end">
      <div className="container mb-10 z-10">
        <div className="max-w-[34rem]">
          <RichText className="mb-6 prose-p:text-xl" content={richText} enableGutter={false} />
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[85dvh] select-none">
        {typeof media === 'object' && (
          <Fragment>
            <Media fill imgClassName="-z-10 object-cover" resource={media} priority />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </Fragment>
        )}
      </div>
    </section>
  )
}
