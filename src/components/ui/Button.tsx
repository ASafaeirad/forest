import { tv } from 'tailwind-variants';

const button = tv({
  base: 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline:
        'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
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
  variant?: 'outline' | 'primary' | 'secondary';
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
