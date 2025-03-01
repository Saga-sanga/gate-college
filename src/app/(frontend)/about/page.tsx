import { MainHero } from '@/components/MainHero'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Metadata } from 'next'
import { About } from 'src/payload-types'

export const metadata: Metadata = {
  title: 'About Page | GATE ATC',
  description: 'The about page of GATE ATC detailing the history and values held by the college',
}

export default async function AboutPage() {
  const { hero, content } = (await getCachedGlobal('about', 1)()) as About

  return (
    <div>
      <MainHero hero={hero} />
      <article className="space-y-16 mt-16">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-lg prose-h2:text-primary" key={i} content={item.richText} />
          ))}
        <div className="bg-muted pt-14 pb-28 ">
          <div className="container space-y-12">
            <h2 className="text-center font-bold text-4xl text-primary capitalize">Where We Are</h2>
            <GoogleMapEmbed />
          </div>
        </div>
      </article>
    </div>
  )
}

function GoogleMapEmbed() {
  const location = 'GATE+Adventist+Theological+College,+Parangarpar,+Falakata,+West+Bengal,+India'
  const src = `https://www.google.com/maps/embed/v1/place?q=${location}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
  return (
    <div className="w-full h-[500px] max-w-full">
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={src}
        allowFullScreen
      />
    </div>
  )
}
