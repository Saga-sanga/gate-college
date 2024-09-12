import { infoCardConfig } from '@/config/landing'
import Link from 'next/link'
import { InfoCardConfig } from '@/config/types'

type Props = {
  info: InfoCardConfig
}

function InfoCard({ info }: Props) {
  const { title, description, label, href } = info
  return (
    <article className="flex flex-col bg-background space-y-8 justify-between rounded p-10 shadow-lg">
      <div className="space-y-6">
        <h2 className="font-serif text-3xl text-primary">{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={href} className="fancy-button capitalize text-center">
        {label}
      </Link>
    </article>
  )
}

export function InfoCardList() {
  return (
    <div className="background-radial-primary">
      <section className="container grid py-24 grid-cols-3 gap-20">
        {infoCardConfig.map((info, i) => (
          <InfoCard key={i} info={info} />
        ))}
      </section>
    </div>
  )
}
