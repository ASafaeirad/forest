import { tv } from 'tailwind-variants';

const button = tv({
  base: 'border-none font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-primary text-white hover:bg-primary-hover focus:ring-primary active:bg-primary-active disabled:bg-primary-disabled',
      secondary:
        'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={button({ variant, size, className })}
      type="button"
      {...props}
    />
  );
}
