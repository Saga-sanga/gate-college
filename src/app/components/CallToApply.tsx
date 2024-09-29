import Link from 'next/link'

export function CallToApply() {
  return (
    <section className="py-20 background-radial-primary">
      <div className="container flex gap-8 flex-col md:flex-row items-center justify-between">
        <div>
          <p className="basis-3/5 text-background text-2xl max-w-[38ch] tracking-wide font-serif">
            {
              "Embark on a transformative journey at GATE Adventist Theology College, where we Guide, Assist, Treat, and Educate you to become a beacon of faith and knowledge in today's world."
            }
          </p>
          <hr className="w-[15%] border-t-4 mt-2 border-secondary" />
        </div>
        <Link
          href="/apply"
          className="fancy-button-secondary capitalize whitespace-nowrap text-center"
        >
          Apply Now
        </Link>
      </div>
    </section>
  )
}
