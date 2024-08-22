import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '../../../payload-types'

import { ThemeSelector } from '../../providers/Theme/ThemeSelector'
import { CMSLink } from '../Link'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  const navItems = footer?.navItems || []

  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
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
          <p>{footer.message}</p>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
