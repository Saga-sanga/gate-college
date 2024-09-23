'use client'
import Link from 'next/link'
import React from 'react'

import { Logo } from '../Logo/Logo'
import { leftNav, rightNav } from '@/config/navigation'
import { DrawerSheet } from './DrawerSheet'
import { NavLink } from './Nav/NavLink'
import { cn } from '@/utilities/cn'

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {}

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
        <MainNav className="hidden lg:flex" />
        <DrawerSheet className="lg:hidden" />
      </div>
    </header>
  )
}

function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn('flex items-center justify-between w-full', className)}>
      <div className="space-x-6 xl:space-x-10">
        {leftNav.map((navItem, i) => (
          <NavLink key={i} navItem={navItem} />
        ))}
      </div>
      <div className="space-x-6 xl:space-x-10">
        {rightNav.map((navItem, i) => (
          <NavLink key={i} navItem={navItem} />
        ))}
      </div>
    </nav>
  )
}
