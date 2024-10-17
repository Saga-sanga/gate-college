import * as React from 'react'
import { cn } from '@/_utilities'

interface ButtonHoverProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonHover({ children, className, ...props }: ButtonHoverProps) {
  return (
    <button
      {...props}
      className={cn(
        className,
        'relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100',
      )}
    >
      {children}
    </button>
  )
}
