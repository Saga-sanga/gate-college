import { infoCardConfig } from '@/config/landing'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { InfoCardConfig } from '@/config/types'

type Props = {
  info: InfoCardConfig
}

function InfoCard({ info }: Props) {
  const { title, description, label, href } = info
  return (
    <article className="space-y-6">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p>{description}</p>
      <Link href={href} className={cn(buttonVariants({ size: 'lg' }))}>
        {label}
      </Link>
    </article>
  )
}

export function InfoCardList() {
  return (
    <section className="container grid py-24 grid-cols-3 gap-20">
      {infoCardConfig.map((info, i) => (
        <InfoCard key={i} info={info} />
      ))}
    </section>
  )
}
