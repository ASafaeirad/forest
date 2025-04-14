import { Input as BaseInput } from '@base-ui-components/react';
import { tv } from 'tailwind-variants';

const input = tv({
  slots: {
    base: 'appearance-none border border-solid rounded relative block w-full px-3 py-2 placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed',
    helper: 'mt-1 text-sm',
  },
  variants: {
    error: {
      true: {
        base: 'border-error focus:ring-error focus:border-error',
        helper: 'text-error',
      },
    },
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export function Input({ className, error, helperText, ...props }: InputProps) {
  const { base, helper } = input({ error });
  return (
    <div>
      <BaseInput className={base()} {...props} />
      {helperText && <p className={helper()}>{helperText}</p>}
    </div>
  );
}
