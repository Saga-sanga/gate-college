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
    <header className="dark:bg-card">
      <div
        className="container relative z-20 py-6 flex justify-between"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav header={header} />
      </div>
    </header>
  )
}
