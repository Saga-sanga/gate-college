import { getCachedGlobal } from '@/utilities/getGlobals'
import type { HighlightSection } from 'src/payload-types'

function convertEmbedURL(url: string): string {
  const videoCode = url.split('=')[1]
  return `https://www.youtube.com/embed/${videoCode}`
}

export async function HighlightSection() {
  const highlight = (await getCachedGlobal('highlight-section', 1)()) as HighlightSection

  // return nothing if highlight is empty
  if (Object.keys(highlight).length === 0) {
    return null
  }

  return (
    <section className="py-20 space-y-10 background-radial-primary">
      <article className="container text-white space-y-14">
        <div>
          <h2 className="font-serif text-5xl capitalize">{highlight.title}</h2>
          <hr className="w-[15%] border-t-4 mt-1 border-secondary" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {highlight['youtube-link'] && (
            <iframe
              className="w-full"
              width="560"
              height="315"
              src={convertEmbedURL(highlight['youtube-link'])}
              title={highlight.title}
              allowFullScreen
            ></iframe>
          )}
          <div className="h-full pt-4 pe-12">
            <p className="text-3xl font-serif max-w-[38ch] tracking-wide">
              {highlight.description}
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
