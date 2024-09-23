import Link from 'next/link'
import { NavItems } from '@/config/types'
import { cn } from '@/utilities/cn'

interface NavLinkProps extends React.HTMLAttributes<HTMLLinkElement> {
  navItem: NavItems[number]
}

export function NavLink({ navItem, className }: NavLinkProps) {
  return (
    <Link
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
