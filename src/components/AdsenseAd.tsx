// ⚠️ NO BORRAR: componente de anuncios de Google AdSense (banners manuales).
// Aunque los Auto ads colocan anuncios automáticamente, este componente se
// usa para las ubicaciones manuales en SagleApp.tsx. Mantener.
import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  client: string;
  slot: string;
  /** Responsive auto ad. When false, pass width + height for a fixed-size unit. */
  responsive?: boolean;
  format?: string;
  width?: string;
  height?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdSense: React.FC<AdSenseProps> = ({
  client,
  slot,
  responsive = true,
  format = 'auto',
  width,
  height,
  className = '',
}) => {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    // Only push once per <ins>. StrictMode (dev) runs effects twice and a
    // remount can re-run this, so we bail if AdSense already filled this slot
    // — otherwise it throws "All 'ins' elements ... already have ads in them".
    if (!ins || ins.getAttribute('data-adsbygoogle-status')) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error initializing AdSense:', e);
    }
  }, [slot]);

  // Fixed-size and responsive units require *different* markup. Mixing fixed
  // dimensions with data-ad-format / full-width-responsive makes AdSense ignore
  // one of them, so each path renders only the attributes it should.
  const insProps = responsive
    ? {
        style: { display: 'block' as const },
        'data-ad-format': format,
        'data-full-width-responsive': 'true',
      }
    : {
        style: {
          display: 'inline-block' as const,
          width,
          height,
          maxWidth: '100%',
        },
      };

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        {...insProps}
      />
    </div>
  );
};

export default AdSense;
