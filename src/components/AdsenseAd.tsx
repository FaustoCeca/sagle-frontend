import React, { useEffect } from 'react';

interface AdSenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense: React.FC<AdSenseProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
  className = '',
}) => {
  useEffect(() => {
    try {
      // Ensure we're in browser environment and AdSense is loaded
      if (window) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('Error initializing AdSense:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className={`adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`}
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSense;