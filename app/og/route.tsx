import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b0a14',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Centered text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#f9f9f9',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Kaustubha M
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              letterSpacing: '0px',
            }}
          >
            Good at backends. Getting better in ML.
          </div>
        </div>

        {/* G1 gradient strip at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #ec4899, #a855f7, #3b82f6)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
