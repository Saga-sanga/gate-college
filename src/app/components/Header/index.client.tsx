'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { Header } from '../../../payload-types'

import { Logo } from '../Logo/Logo'
import { HeaderNav } from './Nav'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="bg-primary">
      <div
        className="container relative py-6 flex justify-between"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="head-logo z-40 absolute px-6 pt-3 pb-5 left-[calc(50%_-_99px)] top-0 rounded-b-[2.5rem] bg-white">
          <Link href="/" className="relative z-40 ">
            <Logo />
          </Link>
        </div>
        <HeaderNav header={header} />
      </div>
    </header>
  )
}
