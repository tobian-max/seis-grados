'use client';

interface LogoProps {
  mode?: 'dark' | 'light';
  variant?: 'horizontal' | 'stacked' | 'mark';
  markHeight?: number;
}

export default function Logo({ mode = 'dark', variant = 'horizontal', markHeight = 32 }: LogoProps) {
  const fill = mode === 'dark' ? '#F5F0EB' : '#1C1917';

  const Mark = () => (
    <svg
      viewBox="0 0 200 210"
      xmlns="http://www.w3.org/2000/svg"
      height={markHeight}
      width={(markHeight * 200) / 210}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <text
        x="4"
        y="200"
        fontFamily="var(--font-space, 'Space Grotesk', sans-serif)"
        fontWeight="700"
        fontSize="210"
        fill={fill}
      >
        6
      </text>
      <circle cx="172" cy="22" r="12" fill="none" stroke="#F97316" strokeWidth="5" />
    </svg>
  );

  const wordmarkFontSize = Math.max(12, markHeight * 0.55);
  const subtitleFontSize = Math.max(7, markHeight * 0.25);

  const Wordmark = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span
        style={{
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontWeight: 700,
          fontSize: `${wordmarkFontSize}px`,
          letterSpacing: '-0.5px',
          color: fill,
          lineHeight: 1,
        }}
      >
        grados
      </span>
      <span
        style={{
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontWeight: 300,
          fontSize: `${subtitleFontSize}px`,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#F97316',
          lineHeight: 1,
        }}
      >
        Business Solutions
      </span>
    </div>
  );

  if (variant === 'mark') return <Mark />;

  if (variant === 'stacked') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <Mark />
        <Wordmark />
      </div>
    );
  }

  // horizontal (default)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Mark />
      <Wordmark />
    </div>
  );
}
