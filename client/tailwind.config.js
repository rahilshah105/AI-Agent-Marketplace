/**
 * @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
 * @type {import('tailwindcss').Config}
 * NOTE: the project is ESM ("type":"module" in package.json) so we use `import`.
 */
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],

  // ────────────────────────────────────────────────────────────────
  //  Tell Tailwind which files to scan for class names
  // ────────────────────────────────────────────────────────────────
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx,js,jsx}',     // keep if you really store files here
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
  ],

  // ────────────────────────────────────────────────────────────────
  //  Theme
  // ────────────────────────────────────────────────────────────────
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },

    extend: {
      /* ---------- Design-token colours (CSS variables) ---------- */
      colors: {
        border:        'hsl(var(--border))',
        input:         'hsl(var(--input))',
        ring:          'hsl(var(--ring))',
        background:    'hsl(var(--background))',
        foreground:    'hsl(var(--foreground))',

        primary: {
          DEFAULT:     'hsl(var(--primary))',
          foreground:  'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:     'hsl(var(--secondary))',
          foreground:  'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:     'hsl(var(--destructive))',
          foreground:  'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:     'hsl(var(--muted))',
          foreground:  'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:     'hsl(var(--accent))',
          foreground:  'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:     'hsl(var(--popover))',
          foreground:  'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:     'hsl(var(--card))',
          foreground:  'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT:            'hsl(var(--sidebar-background))',
          foreground:         'hsl(var(--sidebar-foreground))',
          primary:            'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent:             'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border:             'hsl(var(--sidebar-border))',
          ring:               'hsl(var(--sidebar-ring))',
        },
      },

      /* ---------- New utilities you asked to add ---------- */
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(200px, 1fr))',
      },

      spacing: {
        'section-height': '500px',
      },

      fontSize: {
        default:                       ['15px', '21px'],
        'course-deatails-heading-small': ['26px', '36px'],
        'course-deatails-heading-large': ['36px', '44px'],
        'home-heading-small':           ['28px', '34px'],
        'home-heading-large':           ['48px', '56px'],
      },

      maxWidth: {
        'course-card': '424px',
      },

      boxShadow: {
        'custom-card': '0px 4px 15px 2px rgba(0, 0, 0, 0.1)',
      },

      /* ---------- Border radius ---------- */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /* ---------- Animations ---------- */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up   0.2s ease-out',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────
  //  Plugins
  // ────────────────────────────────────────────────────────────────
  plugins: [animate],
};
