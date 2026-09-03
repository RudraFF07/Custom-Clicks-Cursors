import React from 'react';
import { getAssetUrl } from '../utils/assets';

interface CursorIconProps {
  type: string;
  size?: number;
  className?: string;
  variant?: 'dark' | 'light';
  showHotspot?: boolean;
}

const SVG_MAP: Record<string, string> = {
  default: 'default.svg',
  pointer: 'pointer.svg',
  'pointer-hand': 'pointer.svg',
  text: 'text.svg',
  'text-ibeam': 'text.svg',
  'vertical-text': 'vertical-text.svg',
  grab: 'openhand.svg',
  'grab-open': 'openhand.svg',
  grabbing: 'dnd-move.svg',
  'grabbing-fist': 'dnd-move.svg',
  move: 'dnd-move.svg',
  'move-all': 'all-scroll.svg',
  'all-scroll': 'all-scroll.svg',
  fleur: 'fleur.svg',
  'col-resize': 'col-resize.svg',
  'resize-ew': 'col-resize.svg',
  'ew-resize': 'col-resize.svg',
  'row-resize': 'row-resize.svg',
  'resize-ns': 'row-resize.svg',
  'ns-resize': 'row-resize.svg',
  'nwse-resize': 'size_fdiag.svg',
  'resize-nwse': 'size_fdiag.svg',
  'nesw-resize': 'size_bdiag.svg',
  'resize-nesw': 'size_bdiag.svg',
  'zoom-in': 'zoom-in.svg',
  'zoom-out': 'zoom-out.svg',
  crosshair: 'crosshair.svg',
  cell: 'cell.svg',
  wait: 'wait.svg',
  'wait-spinner': 'wait.svg',
  progress: 'progress.svg',
  help: 'help.svg',
  'not-allowed': 'not-allowed.svg',
  'no-drop': 'no-drop.svg',
  copy: 'copy.svg',
  alias: 'alias.svg',
  'context-menu': 'context-menu.svg',
  'color-picker': 'color-picker.svg',
  pencil: 'pencil.svg',
  draft: 'draft.svg',
  'up-arrow': 'up-arrow.svg',
  'down-arrow': 'down-arrow.svg',
  'left-arrow': 'left-arrow.svg',
  'right-arrow': 'right-arrow.svg',
  bottom_left_corner: 'bottom_left_corner.svg',
  bottom_right_corner: 'bottom_right_corner.svg',
  top_left_corner: 'top_left_corner.svg',
  top_right_corner: 'top_right_corner.svg',
  center_ptr: 'center_ptr.svg',
  right_ptr: 'right_ptr.svg',
  'x-cursor': 'x-cursor.svg',
  pirate: 'pirate.svg',
};

/**
 * Authentic WhiteSur vector cursor SVG renderer
 * Sourced directly from vinceliuice/WhiteSur-cursors (licensed under GNU GPL v3)
 */
export const CursorIcon: React.FC<CursorIconProps> = ({
  type,
  size = 28,
  className = '',
  variant = 'dark',
  showHotspot = false,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const isLight = variant === 'light';
  const fill = isLight ? '#FFFFFF' : '#111318';
  const stroke = isLight ? '#111318' : '#FFFFFF';
  const accent = '#007AFF';

  const svgFile = SVG_MAP[type] || `${type}.svg`;
  const svgUrl = getAssetUrl(`cursors/${svgFile}`);

  const renderShape = () => {
    switch (type) {
      case 'pointer':
      case 'pointer-hand':
        return (
          <g filter="url(#cursor-shadow)">
            {/* WhiteSur Hand Pointer */}
            <path
              d="M7 1 C7 0.5 7.5 0 8 0 C8.5 0 9 0.5 9 1 L9 10.5 C9 11 9.5 11.5 10 11.5 C10.5 11.5 11 11 11 10.5 L11 8 C11 7.5 11.5 7 12 7 C12.5 7 13 7.5 13 8 L13 10.5 C13 11 13.5 11.5 14 11.5 C14.5 11.5 15 11 15 10.5 L15 9 C15 8.5 15.5 8 16 8 C16.5 8 17 8.5 17 9 L17 15.5 C17 19.5 14 23 10 23 C6.5 23 4.5 20.5 3.5 18 L1.5 14 C1 13 1.5 11.8 2.5 11.3 C3.5 10.8 4.8 11.2 5.5 12.2 L7 14.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'text':
      case 'text-ibeam':
        return (
          <g filter="url(#cursor-shadow)">
            {/* WhiteSur Text I-Beam */}
            <path
              d="M8 4 H16 M12 4 V20 M8 20 H16 M9 4.5 V5.5 M15 4.5 V5.5 M9 18.5 V19.5 M15 18.5 V19.5"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M8 4 H16 M12 4 V20 M8 20 H16"
              stroke={fill}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        );

      case 'vertical-text':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M4 8 V16 M4 12 H20 M20 8 V16"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M4 8 V16 M4 12 H20 M20 8 V16"
              stroke={fill}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        );

      case 'grab':
      case 'grab-open':
        return (
          <g filter="url(#cursor-shadow)">
            {/* Open Palm */}
            <path
              d="M6 7 C6 6 7 5.5 8 6 L8 12 M8 4 C8 3 9 2.5 10 3 L10 12 M10 3 C10 2 11 1.5 12 2 L12 12 M12 4 C12 3 13 2.5 14 3 L14 13 M14 7 C14 6 15 5.5 16 6 L16 14 C16 18 14 21 10 21 C6 21 4 18 4 14 L4 11 C4 10 5 9.5 6 10.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'grabbing':
      case 'grabbing-fist':
        return (
          <g filter="url(#cursor-shadow)">
            {/* Clenched Fist */}
            <path
              d="M5 10 C5 9 6 8.5 7 9 C7.5 9.5 7.5 11 7.5 12 C7.5 10.5 8.5 9.5 9.5 10 C10 10.5 10 11.5 10 12 C10 10.5 11 9.5 12 10 C12.5 10.5 12.5 11.5 12.5 12.5 C12.5 11.5 13.5 10.5 14.5 11 C15.5 11.5 15.5 13 15.5 14 C15.5 17.5 13.5 20.5 9.5 20.5 C5.5 20.5 4 17.5 4 14 L4 12 C4 11 5 10.5 5.5 11.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'move':
      case 'move-all':
        return (
          <g filter="url(#cursor-shadow)">
            {/* 4-way move cross */}
            <path
              d="M12 2 L9 5 H11 V9 H7 V7 L4 10 L7 13 V11 H11 V15 H9 L12 18 L15 15 H13 V11 H17 V13 L20 10 L17 7 V9 H13 V5 H15 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'ew-resize':
      case 'resize-ew':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M2 12 L6 8 V11 H18 V8 L22 12 L18 16 V13 H6 V16 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'ns-resize':
      case 'resize-ns':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M12 2 L8 6 H11 V18 H8 L12 22 L16 18 H13 V6 H16 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'nwse-resize':
      case 'resize-nwse':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M4 4 H10 L7.5 6.5 L17.5 16.5 L20 14 V20 H14 L16.5 17.5 L6.5 7.5 L4 10 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'nesw-resize':
      case 'resize-nesw':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M20 4 H14 L16.5 6.5 L6.5 16.5 L4 14 V20 H10 L7.5 17.5 L17.5 7.5 L20 10 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'zoom-in':
        return (
          <g filter="url(#cursor-shadow)">
            <circle cx="10" cy="10" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
            <line x1="15" y1="15" x2="22" y2="22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="15" x2="22" y2="22" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
            {/* plus */}
            <path d="M7 10 H13 M10 7 V13" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 'zoom-out':
        return (
          <g filter="url(#cursor-shadow)">
            <circle cx="10" cy="10" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
            <line x1="15" y1="15" x2="22" y2="22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="15" x2="22" y2="22" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
            {/* minus */}
            <path d="M7 10 H13" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 'crosshair':
        return (
          <g filter="url(#cursor-shadow)">
            <circle cx="12" cy="12" r="3.5" fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3.5" fill="none" stroke={fill} strokeWidth="1.25" />
            {/* lines */}
            <path
              d="M12 2 V7 M12 17 V22 M2 12 H7 M17 12 H22"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M12 2 V7 M12 17 V22 M2 12 H7 M17 12 H22"
              stroke={fill}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        );

      case 'cell':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M9 3 H15 V9 H21 V15 H15 V21 H9 V15 H3 V9 H9 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'wait':
      case 'wait-spinner':
        return (
          <g className="origin-center animate-[spin_1s_linear_infinite]">
            {/* WhiteSur 8-segment wheel */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={angle}
                x1="12"
                y1="3"
                x2="12"
                y2="7"
                stroke={isLight ? '#111318' : '#F5F5F7'}
                strokeWidth="2.2"
                strokeLinecap="round"
                transform={`rotate(${angle} 12 12)`}
                opacity={0.25 + (i / 8) * 0.75}
              />
            ))}
          </g>
        );

      case 'progress':
        return (
          <g filter="url(#cursor-shadow)">
            {/* Base arrow */}
            <path
              d="M3 2 L3 19 L7.5 15 L11.5 21 L13.5 19.5 L9.5 13.5 L15 13.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            {/* Small spinning wheel beside arrow */}
            <g
              transform="translate(15, 14) scale(0.55)"
              className="origin-center animate-[spin_1.2s_linear_infinite]"
            >
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <line
                  key={angle}
                  x1="12"
                  y1="4"
                  x2="12"
                  y2="7"
                  stroke={accent}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 12 12)`}
                  opacity={0.3 + (i / 6) * 0.7}
                />
              ))}
            </g>
          </g>
        );

      case 'help':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M3 2 L3 19 L7.5 15 L11.5 21 L13.5 19.5 L9.5 13.5 L15 13.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            {/* Help Question Badge */}
            <circle cx="17" cy="16" r="5" fill="#007AFF" stroke="#FFFFFF" strokeWidth="1" />
            <text
              x="17"
              y="19"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8"
              fontWeight="bold"
              fontFamily="system-ui"
            >
              ?
            </text>
          </g>
        );

      case 'not-allowed':
        return (
          <g filter="url(#cursor-shadow)">
            {/* Prohibited slashed circle */}
            <circle cx="12" cy="12" r="8" fill="none" stroke="#FF3B30" strokeWidth="2.5" />
            <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" stroke="#FF3B30" strokeWidth="2.5" />
          </g>
        );

      case 'copy':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M3 2 L3 19 L7.5 15 L11.5 21 L13.5 19.5 L9.5 13.5 L15 13.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            {/* Plus badge */}
            <circle cx="17" cy="16" r="5" fill="#34C759" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M14.5 16 H19.5 M17 13.5 V18.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 'alias':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M3 2 L3 19 L7.5 15 L11.5 21 L13.5 19.5 L9.5 13.5 L15 13.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            {/* Curved shortcut arrow badge */}
            <circle cx="17" cy="16" r="5" fill="#5856D6" stroke="#FFFFFF" strokeWidth="1" />
            <path
              d="M15 18 C15 15 16 14 18.5 14 M16.5 12 L19 14 L16.5 16"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'col-resize':
        return (
          <g filter="url(#cursor-shadow)">
            <line x1="9" y1="3" x2="9" y2="21" stroke={stroke} strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="15" y1="3" x2="15" y2="21" stroke={stroke} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M4 12 L8 8 V11 H16 V8 L20 12 L16 16 V13 H8 V16 Z" fill={fill} stroke={stroke} strokeWidth="1.25" />
          </g>
        );

      case 'row-resize':
        return (
          <g filter="url(#cursor-shadow)">
            <line x1="3" y1="9" x2="21" y2="9" stroke={stroke} strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="3" y1="15" x2="21" y2="15" stroke={stroke} strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M12 4 L8 8 H11 V16 H8 L12 20 L16 16 H13 V8 H16 Z" fill={fill} stroke={stroke} strokeWidth="1.25" />
          </g>
        );

      case 'context-menu':
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M3 2 L3 19 L7.5 15 L11.5 21 L13.5 19.5 L9.5 13.5 L15 13.5 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            {/* Mini menu badge */}
            <rect x="13" y="12" width="9" height="7" rx="1.5" fill="#3A3A3C" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="15" y1="14.5" x2="20" y2="14.5" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="15" y1="16.5" x2="19" y2="16.5" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>
        );

      // Default WhiteSur Arrow
      default:
        return (
          <g filter="url(#cursor-shadow)">
            <path
              d="M3 2 L3 21.5 L8 16.5 L12.8 24 L15.5 22.5 L10.5 15.2 L17.5 15.2 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </g>
        );
    }
  };

  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size }}>
      {!imgError ? (
        <img
          src={svgUrl}
          width={size}
          height={size}
          alt={`WhiteSur ${type} cursor`}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <filter id="cursor-shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.32" />
            </filter>
          </defs>
          {renderShape()}
        </svg>
      )}

      {showHotspot && (
        <span
          className="absolute w-2 h-2 rounded-full bg-red-500 ring-2 ring-white pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            top: type.includes('pointer') ? '8%' : type.includes('text') || type.includes('grab') || type.includes('resize') || type.includes('crosshair') ? '50%' : '8%',
            left: type.includes('pointer') ? '33%' : type.includes('text') || type.includes('grab') || type.includes('resize') || type.includes('crosshair') ? '50%' : '12%',
          }}
          title="Active Hotspot"
        />
      )}
    </div>
  );
};
