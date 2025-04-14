import { Input as BaseInput } from '@base-ui-components/react';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'w-full',
  variants: {
    error: {
      true: 'border-red-500 focus:ring-red-500 focus:border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});

const inputField = tv({
  base: 'appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed',
});

const helperText = tv({
  base: 'mt-1 text-sm',
  variants: {
    error: {
      true: 'text-red-500',
      false: 'text-gray-500',
    },
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export function Input({
  className,
  error,
  helperText: helperTextContent,
  ...props
}: InputProps) {
  return (
    <div className={input({ error })}>
      <BaseInput
        className={className ? `${inputField()} ${className}` : inputField()}
        {...props}
      />
      {helperTextContent && (
        <p className={helperText({ error })}>{helperTextContent}</p>
      )}
    </div>
  );
}
