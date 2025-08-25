'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-lg hover:shadow-xl',
        outlined: 'bg-transparent border-2 border-gray-300',
        ghost: 'bg-gray-50',
        gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

// Card Title
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      'text-lg sm:text-xl font-semibold leading-none tracking-tight text-gray-900',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

// Card Description
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

// Card Content
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));

CardContent.displayName = 'CardContent';

// Card Footer
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

// Feature Card - Specialized for landing pages
export interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick?: () => void;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, badge, onClick, className, ...props }, ref) => {
    const isClickable = !!onClick;
    
    return (
      <Card
        ref={ref}
        variant="elevated"
        className={cn(
          'relative overflow-hidden group',
          isClickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {badge && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
              {badge}
            </span>
          </div>
        )}
        
        <CardHeader>
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] mb-4">
              {icon}
            </div>
          )}
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
        
        {isClickable && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary-500)] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        )}
      </Card>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

// Metric Card - For dashboards
export interface MetricCardProps extends CardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  loading?: boolean;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, change, icon, loading, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="elevated"
        className={cn('relative', className)}
        {...props}
      >
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          {icon && (
            <div className="text-gray-400">
              {icon}
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              {change && (
                <p className={cn(
                  'text-xs mt-1',
                  change.trend === 'up' && 'text-[var(--color-success)]',
                  change.trend === 'down' && 'text-[var(--color-error)]',
                  change.trend === 'neutral' && 'text-gray-500'
                )}>
                  <span className="font-medium">
                    {change.trend === 'up' && '↑'}
                    {change.trend === 'down' && '↓'}
                    {change.trend === 'neutral' && '→'}
                  </span>
                  {' '}
                  {Math.abs(change.value)}%
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FeatureCard,
  MetricCard,
};