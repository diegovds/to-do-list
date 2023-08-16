import { cn } from '../libs/utils'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-gray-50 transition-all hover:bg-emerald-500 disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button