'use client'

import React from 'react'

import { CMSLink } from '../../Link'

export const HeaderNav: React.FC<{ header: any }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink key={i} {...link} className="text-secondary dark:text-white" appearance="link" />
        )
      })}
    </nav>
  )
}
