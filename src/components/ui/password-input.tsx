import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/utils/utils.ts';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled = props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="font block text-primary text-sm">
            {label}
            {props.required && (
              <span className="ml-1 text-red" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            className={cn('hide-password-toggle pr-10', className)}
            ref={ref}
            id={id}
            leftIcon={leftIcon}
            {...props}
          />
          <button
            type="button"
            className="-translate-y-1/2 absolute top-1/2 right-3 z-10 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setShowPassword(prev => !prev)}
            disabled={disabled}
            tabIndex={-1}
          >
            {showPassword && !disabled ? (
              <EyeIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            )}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
