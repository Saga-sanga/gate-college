'use client'
import Link from 'next/link'
import React from 'react'

import { Logo } from '../Logo/Logo'
import { leftNav, rightNav } from '@/config/navigation'
import { NavItems } from '@/config/types'

export const HeaderClient: React.FC = () => {
  return (
    <header className="bg-primary">
      <div className="container relative py-4 flex justify-between">
        <div className="head-logo z-40 absolute px-6 pt-3 pb-5 left-[calc(50%_-_99px)] shadow-xl top-0 rounded-b-[2.5rem] bg-white">
          <Link href="/" className="relative z-40 ">
            <Logo />
          </Link>
        </div>
        {/* <HeaderNav header={header} /> */}
        <MainNav />
      </div>
    </header>
  )
}

function MainNav() {
  return (
    <nav className="flex items-center justify-between w-full">
      <div className="space-x-10">
        {leftNav.map((navItem, i) => (
          <NavLink key={i} navItem={navItem} />
        ))}
      </div>
      <div className="space-x-10">
        {rightNav.map((navItem, i) => (
          <NavLink key={i} navItem={navItem} />
        ))}
      </div>
    </nav>
  )
}

function NavLink({ navItem }: { navItem: NavItems[number] }) {
  return (
    <Link
      href={navItem.href}
      className="text-white uppercase font-medium text-sm hover:underline hover:underline-offset-2"
    >
      {navItem.label}
    </Link>
  )
}
