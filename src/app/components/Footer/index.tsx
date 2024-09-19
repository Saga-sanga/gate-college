import Link from 'next/link'
import React from 'react'

export async function Footer() {
  return (
    <footer className="border-t border-border bg-accent-dark text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="space-y-2">
          <Link className="flex items-center" href="/">
            <picture>
              <img
                alt="Payload Logo"
                className="max-w-[6rem] invert-0"
                src="/gate-logo.png"
                // src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
              />
            </picture>
          </Link>
          <p>{}</p>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4"></nav>
        </div>
      </div>
    </footer>
  )
}
