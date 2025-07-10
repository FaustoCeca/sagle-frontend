import React, { useEffect } from 'react';

interface AdSenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  width?: string;
  height?: string;
}

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
  width,
  height,
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

  // Combine style with width and height if provided
  const combinedStyle = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
    maxWidth: '100%',
  };

  return (
    <div className={className}>
      <ins
        className={`adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`}
        style={combinedStyle}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSense;