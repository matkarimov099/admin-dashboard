import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-sans transition-all duration-[120ms] ease-[cubic-bezier(0.2,0.9,0.25,1)] backdrop-blur-[10px] saturate-150 active:scale-[0.98]',
  {
    variants: {
      variant: {
        // Primary - Uses global theme color
        default:
          'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-sm border-control focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
        primary:
          'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-sm border-control focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',

        // Secondary (Green) - Uses global success color
        secondary:
          'bg-[var(--color-success)] text-white shadow-sm border-control hover:bg-[#16a34a] focus-visible:ring-2 focus-visible:ring-[var(--color-success)] focus-visible:ring-offset-2',
        success:
          'bg-[var(--color-success)] text-white shadow-sm border-control hover:bg-[#16a34a] focus-visible:ring-2 focus-visible:ring-[var(--color-success)] focus-visible:ring-offset-2',

        // Destructive - Uses global error color
        destructive:
          'bg-[var(--color-error)] text-white shadow-sm border-control hover:bg-[#dc2626] focus-visible:ring-2 focus-visible:ring-[var(--color-error)] focus-visible:ring-offset-2',

        // Outline/Ghost - Uses global theme color
        outline:
          'bg-control border-control text-primary hover:bg-[color-mix(in_srgb,var(--color-primary)_4%,transparent)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
        ghost:
          'bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',

        // Link - Uses global theme color
        link: 'text-[var(--color-primary)] underline-offset-4 hover:underline hover:text-[var(--color-primary-dark)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded [&_svg]:size-3',
        sm: 'h-8 px-3 text-sm rounded-md [&_svg]:size-3.5',
        default: 'h-9 px-4 text-sm rounded-md [&_svg]:size-4',
        md: 'h-9 px-4 text-sm rounded-md [&_svg]:size-4',
        lg: 'h-11 px-6 text-base rounded-lg [&_svg]:size-5',
        xl: 'h-12 px-8 text-lg rounded-lg [&_svg]:size-6',
        icon: 'h-9 w-9 rounded-md [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export { buttonVariants };
