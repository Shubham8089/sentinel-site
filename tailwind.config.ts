import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        recede: 'var(--recede)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: {
          DEFAULT: 'var(--accent)',
          hi: 'var(--accent-hi)',
          bg: 'var(--accent-bg)',
        },
        ok: 'var(--ok)',
        warn: 'var(--warn)',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      maxWidth: {
        measure: '32ch',
        prose: '52ch',
      },
    },
  },
}
