import { cn } from '@/utilities/cn'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'
import type { Leadership } from 'src/payload-types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leadership Page | GATE ATC',
  description:
    'The leadership page of GATE ATC which contains a list of all the faculty, staff and leaders that work in the institution',
}

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
    <div className="mt-16">
      <section className="container">
        <h1 className="text-primary text-5xl font-serif">{leadership.title}</h1>
        <hr className="mt-5 border-secondary-muted" />
        <p className="p-16 text-muted-foreground">{leadership.description}</p>
      </section>
      <section className="flex flex-col lg:flex-row container">
        <div className="relative w-full bg-primary-muted basis-1/3">
          {!highlight.image && <div className="">No image</div>}
          {highlight.image && typeof highlight.image !== 'string' && (
            <Image
              // @ts-ignore : valid type
              src={highlight.image.url}
              width={437}
              height={300}
              // @ts-ignore : valid type
              alt={highlight.image.alt}
              className="object-cover w-full h-full"
              priority
            />
          )}
        </div>
        <div className="basis-2/3 relative flex flex-col justify-center bg-muted py-24 px-16 space-y-8">
          <hr className="border-8 w-1/2 border-secondary absolute top-0 left-0" />
          <h2 className="text-5xl text-primary font-medium font-serif">{highlight.name}</h2>
          <p className="text-lg text-muted-foreground">{highlight.description}</p>
        </div>
      </section>
      <div className="bg-muted mt-12 pb-10">
        <section className="container py-12 px-8 space-y-20">
          {content.length > 0 &&
            content.map((group) => <ItemsGroup key={group.id} group={group} />)}
        </section>
      </div>
    </div>
  )
}

function ItemsGroup({ group }: { group: Group }) {
  return (
    <div className="space-y-16">
      <h3 className="uppercase text-2xl text-foreground/75 font-medium">{group.heading}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {group?.items?.length > 0 &&
          group.items.map((item) => <ItemProfile key={item.id} item={item} />)}
      </div>
    </div>
  )
}

function ItemProfile({ item }: ItemProfieProps) {
  return (
    <article className="flex flex-col items-center space-y-5">
      <div className={cn(!item.image && 'bg-white', 'rounded-full shrink-0 h-36 w-36')}>
        {item.image && (
          <Image
            // @ts-ignore : valid type
            src={item.image.url}
            // @ts-ignore : valid type
            alt={item.image.alt}
            width={112}
            height={112}
            className="rounded-full object-cover h-36 w-36"
          />
        )}
      </div>
      <div className="px-4">
        <h4 className="font-medium text-xl mb-1.5">{item.name}</h4>
        <p className="text-base text-muted-foreground text-justify">{item.descripton}</p>
      </div>
    </article>
  )
}
