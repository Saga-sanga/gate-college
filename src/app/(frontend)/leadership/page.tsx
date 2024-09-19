import { Media } from '@/components/Media'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Leadership } from 'src/payload-types'

type Group = Leadership['content'][number]

type ItemProfieProps = {
  item: Group['items'][number]
}

export default async function LeadershipPage() {
  const { highlight, content, ...leadership } = (await getCachedGlobal(
    'leadership',
    1,
  )()) as Leadership

  return (
    <main className="my-16">
      <section className="container">
        <h1 className="text-primary text-5xl font-serif">{leadership.title}</h1>
        <hr className="mt-5 border-secondary-muted" />
        <p className="p-16 text-muted-foreground">{leadership.description}</p>
      </section>
      <section className="flex flex-col md:flex-row container">
        <div className="relative w-full bg-primary-muted basis-1/3">
          {!highlight.image && <div className="">No image</div>}
          {highlight.image && typeof highlight.image !== 'string' && (
            <img
              src={highlight.image.url}
              alt={highlight.image.alt}
              className="object-cover h-full"
            />
            // <Media resource={highlight.image} size="360" className="h-full" />
          )}
        </div>
        <div className="basis-2/3 relative flex flex-col justify-center bg-muted py-24 px-16 space-y-8">
          <hr className="border-8 w-1/2 border-secondary absolute top-0 left-0" />
          <h2 className="text-5xl text-primary font-medium font-serif">{highlight.name}</h2>
          <p className="text-lg text-muted-foreground">{highlight.description}</p>
        </div>
      </section>
      <div className="bg-muted mt-12">
        <section className="container py-12 space-y-20">
          {content.length > 0 &&
            content.map((group) => <ItemsGroup key={group.id} group={group} />)}
        </section>
      </div>
    </main>
  )
}

function ItemsGroup({ group }: { group: Group }) {
  return (
    <div className="space-y-8">
      <h3 className="uppercase text-2xl text-muted-foreground font-medium">{group.heading}</h3>
      <div className="grid grid-cols-3 gap-10">
        {group?.items?.length > 0 &&
          group.items.map((item) => <ItemProfile key={item.id} item={item} />)}
      </div>
    </div>
  )
}

function ItemProfile({ item }: ItemProfieProps) {
  return (
    <article className="flex flex-row items-center space-x-5">
      <img
        src={item.image.url}
        alt={item.image.alt}
        className="rounded-full object-cover h-28 w-28"
      />
      <div>
        <h4 className="font-medium text-lg">{item.name}</h4>
        <span className="text-sm text-muted-foreground">{item.descripton}</span>
      </div>
    </article>
  )
}
