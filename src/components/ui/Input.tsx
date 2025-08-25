'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      disabled,
      required,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    // Use a stable ID based on name or id prop to avoid hydration mismatches
    // Only use useId if absolutely necessary (no name or id provided)
    const inputId = React.useMemo(() => {
      if (id) return id;
      if (name) return `input-${name}`;
      // Avoid useId for SSR compatibility - use a stable fallback
      return 'input-field';
    }, [id, name]);
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-2',
              error ? 'text-[var(--color-error)]' : 'text-gray-700'
            )}
          >
            {label}
            {required && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            className={cn(
              // Base styles - Mobile optimized with 44px min height
              'flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-base',
              'transition-all duration-200',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
              'touch-manipulation', // Optimize for touch
              
              // Conditional styles
              leftIcon && 'pl-10',
              (rightIcon || (isPassword && showPasswordToggle)) && 'pr-10',
              
              // Error styles
              error
                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)] text-[var(--color-error)]'
                : 'border-gray-300 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)]',
              
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          
          {/* Right Icon or Password Toggle */}
          {(rightIcon || (isPassword && showPasswordToggle)) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isPassword && showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <span className="text-gray-400">{rightIcon}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <div
            id={`${inputId}-error`}
            className="mt-2 flex items-center text-sm text-[var(--color-error)]"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Hint Message */}
        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="mt-2 text-sm text-gray-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component - Similar styling
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      disabled,
      required,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium mb-2',
              error ? 'text-[var(--color-error)]' : 'text-gray-700'
            )}
          >
            {label}
            {required && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={cn(
            // Base styles
            'flex w-full rounded-lg border bg-white px-3 py-2 text-base',
            'transition-all duration-200 resize-y min-h-[100px]',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            'touch-manipulation',
            
            // Error styles
            error
              ? 'border-[var(--color-error)] focus:ring-[var(--color-error)] text-[var(--color-error)]'
              : 'border-gray-300 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)]',
            
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />
        
        {/* Error Message */}
        {error && (
          <div
            id={`${textareaId}-error`}
            className="mt-2 flex items-center text-sm text-[var(--color-error)]"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Hint Message */}
        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
            className="mt-2 text-sm text-gray-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };