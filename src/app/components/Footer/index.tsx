import { contacts } from '@/config/footer'
import { leftNav, rightNav } from '@/config/navigation'
import { NavItems } from '@/config/types'
import Link from 'next/link'
import React from 'react'

export async function Footer() {
  return (
    <footer className="border-t border-muted-foreground bg-accent-dark text-accent-foreground">
      <div className="container py-14 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="gap-8 flex flex-col xl:flex-row items-start">
          <Link className="flex items-center" href="/">
            <picture>
              <img
                alt="Payload Logo"
                className="max-w-56 invert-0"
                src="/gate-logo.png"
                // src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
              />
            </picture>
          </Link>
          <div className="space-y-1 mt-3 ml-3">
            <h4 className="capitalize font-semibold text-lg">Contacts</h4>
            <div className="text-sm">
              {contacts.map((contact, i) => (
                <div key={i} className="space-x-8 grid font-light grid-cols-2">
                  <p>{contact.label}</p> <p>{contact.phone}</p>
                </div>
              ))}
              <p className="mt-2">Email: gateatc7@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-start gap-20 ml-3 pr-20">
          <nav className="flex flex-col gap-2">
            {leftNav.map((navItem, i) => (
              <NavItemLink key={i} navItem={navItem} />
            ))}
          </nav>
          <nav className="flex flex-col gap-2">
            {rightNav.map((navItem, i) => (
              <NavItemLink key={i} navItem={navItem} />
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-muted-foreground text-sm text-center py-4">
        <p className="container">©{new Date().getFullYear()} GATE Adventist Theology College</p>
      </div>
    </footer>
  )
}

function NavItemLink({ navItem }: { navItem: NavItems[number] }) {
  return (
    <Link className="hover:underline hover:underline-offset-2" href={navItem.href}>
      {navItem.label}
    </Link>
  )
}
