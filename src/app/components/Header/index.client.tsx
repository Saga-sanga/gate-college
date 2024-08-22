'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '../../../payload-types'

import { Logo } from '../Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  return (
    <header
      className="dark container relative z-20 py-6 flex justify-between"
      // {...(theme ? { 'data-theme': theme } : {})}
    >
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
