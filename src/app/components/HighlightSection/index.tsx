import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

function convertEmbedURL(url: string): string {
  const videoCode = url.split('=')[1]
  return `https://www.youtube.com/embed/${videoCode}`
}

export async function HighlightSection() {
  const payload = await getPayloadHMR({ config })

  const highlight = await payload.findGlobal({
    slug: 'highlight-section',
    depth: 1,
  })

  console.log({ highlight })

  // return nothing if highlight is empty
  if (Object.keys(highlight).length === 0) {
    return null
  }

  return (
    <section className="py-20 space-y-10 background-radial-primary">
      <article className="container text-white space-y-12">
        <h2 className="font-serif text-5xl capitalize">{highlight.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="h-full pt-4 pe-12">
            <p className="text-2xl font-light">{highlight.description}</p>
          </div>
          {highlight['youtube-link'] && (
            <iframe
              width="560"
              height="315"
              src={convertEmbedURL(highlight['youtube-link'])}
              title={highlight.title}
              allowFullScreen
            ></iframe>
          )}
        </div>
      </article>
    </section>
  )
}
