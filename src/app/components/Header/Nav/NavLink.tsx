import Link from 'next/link'
import { NavItems } from '@/config/types'
import { cn } from '@/utilities/cn'
import { MouseEventHandler } from 'react'

interface NavLinkProps {
  className?: string
  navItem: NavItems[number]
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function NavLink({ navItem, className, onClick }: NavLinkProps) {
  return (
    <Link
      onClick={onClick}
      href={navItem.href}
      className={cn(
        'text-white capitalize font-medium text-sm hover:underline hover:underline-offset-2',
        className,
      )}
    >
      {navItem.label}
    </Link>
  )
}
