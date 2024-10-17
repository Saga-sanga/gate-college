'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Logo } from '../Logo/Logo'
import { leftNav, rightNav } from '@/config/navigation'
import { NavLink } from './Nav/NavLink'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
  className?: string
}

export function DrawerSheet({ className }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={className}>
        <Menu className="h-6 w-6 text-background" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-primary font-medium pl-4">
            <Link onClick={() => setOpen(false)} href="/">
              <Logo />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 mt-8 pl-6">
          {leftNav.map((navItem, i) => (
            <NavLink
              key={i}
              navItem={navItem}
              onClick={() => setOpen(false)}
              className="text-foreground/80 text-lg"
            />
          ))}
          {rightNav.map((navItem, i) => (
            <NavLink
              key={i}
              navItem={navItem}
              onClick={() => setOpen(false)}
              className="text-foreground/80 text-lg"
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
