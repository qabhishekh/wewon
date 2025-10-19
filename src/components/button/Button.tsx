"use client";
import React from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children?: React.ReactNode;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--primary)]',
  outline: 'bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]',
  ghost: 'bg-transparent text-[var(--accent)] hover:bg-[var(--accent)]/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-6 py-2',
  lg: 'text-lg px-8 py-3',
}

export default function Button({ children, label, href, onClick, type = 'button', fullWidth = false, className = '', variant = 'primary', size = 'md', leftIcon, rightIcon, ariaLabel }: Props) {
  const base = `rounded-full shadow-lg transition-colors font-semibold inline-flex items-center cursor-pointer justify-center gap-3 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {leftIcon}
      {children ?? label}
      {rightIcon}
    </>
  );

  // internal link -> use next/link for client navigation
  if (href && href.startsWith('/')) {
    return (
      <Link href={href} aria-label={ariaLabel} className={base} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    // external link
    return (
      <a href={href} aria-label={ariaLabel} className={base} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} className={base} onClick={onClick}>
      {content}
    </button>
  );
}
