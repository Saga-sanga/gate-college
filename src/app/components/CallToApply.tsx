import { callToAction } from '@/config/callToAction'
import Link from 'next/link'

export function CallToApply() {
  return (
    <section className="py-20 background-radial-primary">
      <div className="container flex gap-8 flex-col md:flex-row items-center justify-between">
        <div>
          <p className="basis-3/5 text-background text-2xl max-w-[38ch] tracking-wide font-serif">
            {callToAction.description}
          </p>
          <hr className="w-[15%] border-t-4 mt-2 border-secondary" />
        </div>
        <Link
          href={callToAction.href}
          className="fancy-button-secondary capitalize whitespace-nowrap text-center"
        >
          {callToAction.label}
        </Link>
      </div>
    </section>
  )
}
