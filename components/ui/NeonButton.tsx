import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink' | 'purple' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'cyan', size = 'md', glow = true, children, ...props }, ref) => {
    const variantStyles = {
      cyan: 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-arcade-bg hover:shadow-neon-cyan',
      pink: 'border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-arcade-bg hover:shadow-neon-pink',
      purple: 'border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-arcade-bg hover:shadow-neon-purple',
      gold: 'border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-arcade-bg hover:shadow-neon-gold',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-[10px]',
      md: 'px-5 py-2.5 text-xs',
      lg: 'px-8 py-4 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'font-pixel uppercase tracking-wider',
          'bg-arcade-surface border-2 rounded',
          'transition-all duration-200',
          'active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-arcade-surface disabled:hover:shadow-none',
          'relative overflow-hidden group',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Shine effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export { NeonButton };
