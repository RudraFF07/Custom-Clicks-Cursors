import React from 'react';

interface BrowserIconProps {
  className?: string;
  size?: number;
}

/**
 * Official Mozilla Firefox Browser Logo PNG
 * Sourced directly from official high-resolution brand asset.
 */
export const FirefoxIcon: React.FC<BrowserIconProps> = ({
  className = '',
  size = 20,
}) => {
  return (
    <img
      src="/firefox.png"
      width={size}
      height={size}
      alt="Mozilla Firefox"
      className={`shrink-0 select-none object-contain ${className}`}
      loading="eager"
      referrerPolicy="no-referrer"
      style={{ width: size, height: size }}
    />
  );
};

/**
 * Official Microsoft Edge Browser Logo PNG
 * Sourced directly from official high-resolution brand asset.
 */
export const EdgeIcon: React.FC<BrowserIconProps> = ({
  className = '',
  size = 20,
}) => {
  return (
    <img
      src="/edge.png"
      width={size}
      height={size}
      alt="Microsoft Edge"
      className={`shrink-0 select-none object-contain ${className}`}
      loading="eager"
      referrerPolicy="no-referrer"
      style={{ width: size, height: size }}
    />
  );
};
