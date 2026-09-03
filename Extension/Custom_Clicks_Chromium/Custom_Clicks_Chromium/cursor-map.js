/**
 * Custom Clicks Cursor Mapping Configuration
 * 
 * Standard CSS Cursor -> Custom SVG asset + Hotspot Coordinates (X, Y)
 * All asset paths are relative to the 'cursors/' directory in the extension.
 */

const DEFAULT_CUSTOM_CLICKS_MAP = {
  "alias": {
    "file": "alias.svg",
    "hotspot": [1, 1],
    "description": "Indicates an alias or shortcut is to be created"
  },
  "all-scroll": {
    "file": "all-scroll.svg",
    "hotspot": [16, 16],
    "description": "Indicates that something can be scrolled in any direction"
  },
  "auto": {
    "file": "default.svg",
    "hotspot": [1, 1],
    "description": "Default browser behavior (arrow for UI elements)"
  },
  "cell": {
    "file": "cell.svg",
    "hotspot": [16, 16],
    "description": "Indicates that a cell or set of cells may be selected"
  },
  "col-resize": {
    "file": "col-resize.svg",
    "hotspot": [16, 16],
    "description": "Column resize - horizontal divider can be dragged"
  },
  "context-menu": {
    "file": "context-menu.svg",
    "hotspot": [1, 1],
    "description": "Indicates a context menu is available"
  },
  "copy": {
    "file": "copy.svg",
    "hotspot": [1, 1],
    "description": "Indicates that something is to be copied"
  },
  "crosshair": {
    "file": "crosshair.svg",
    "hotspot": [16, 16],
    "description": "Crosshair cursor for precision selection/drawing"
  },
  "default": {
    "file": "default.svg",
    "hotspot": [1, 1],
    "description": "Standard arrow pointer"
  },
  "e-resize": {
    "file": "right_side.svg",
    "hotspot": [24, 16],
    "description": "East edge resize"
  },
  "ew-resize": {
    "file": "size_hor.svg",
    "hotspot": [16, 16],
    "description": "Bidirectional horizontal resize"
  },
  "grab": {
    "file": "openhand.svg",
    "hotspot": [16, 16],
    "description": "Open hand indicates an object can be grabbed"
  },
  "grabbing": {
    "file": "fleur.svg",
    "hotspot": [16, 16],
    "description": "Closed/active hand indicates dragging in progress"
  },
  "help": {
    "file": "help.svg",
    "hotspot": [1, 1],
    "description": "Indicates help is available"
  },
  "move": {
    "file": "dnd-move.svg",
    "hotspot": [16, 16],
    "description": "Indicates an item can be moved"
  },
  "n-resize": {
    "file": "top_side.svg",
    "hotspot": [16, 8],
    "description": "North edge resize"
  },
  "ne-resize": {
    "file": "top_right_corner.svg",
    "hotspot": [24, 8],
    "description": "North-East corner resize"
  },
  "nesw-resize": {
    "file": "size_fdiag.svg",
    "hotspot": [16, 16],
    "description": "Diagonal resize (North-East to South-West)"
  },
  "ns-resize": {
    "file": "size_ver.svg",
    "hotspot": [16, 16],
    "description": "Bidirectional vertical resize"
  },
  "nw-resize": {
    "file": "top_left_corner.svg",
    "hotspot": [8, 8],
    "description": "North-West corner resize"
  },
  "nwse-resize": {
    "file": "size_bdiag.svg",
    "hotspot": [16, 16],
    "description": "Diagonal resize (North-West to South-East)"
  },
  "no-drop": {
    "file": "dnd-no-drop.svg",
    "hotspot": [1, 1],
    "description": "Indicates a drop is not allowed here"
  },
  "not-allowed": {
    "file": "not-allowed.svg",
    "hotspot": [16, 16],
    "description": "Action forbidden / not allowed"
  },
  "pointer": {
    "file": "pointer.svg",
    "hotspot": [6, 1],
    "description": "Link / actionable button cursor"
  },
  "progress": {
    "file": "progress.svg",
    "hotspot": [1, 1],
    "description": "Background task in progress with pointer available",
    "animated": true,
    "frames": [
      "progress-01.svg", "progress-02.svg", "progress-03.svg", "progress-04.svg",
      "progress-05.svg", "progress-06.svg", "progress-07.svg", "progress-08.svg",
      "progress-09.svg", "progress-10.svg", "progress-11.svg", "progress-12.svg",
      "progress-13.svg", "progress-14.svg", "progress-15.svg", "progress-16.svg",
      "progress-17.svg", "progress-18.svg", "progress-19.svg", "progress-20.svg",
      "progress-21.svg", "progress-22.svg", "progress-23.svg"
    ]
  },
  "row-resize": {
    "file": "row-resize.svg",
    "hotspot": [16, 16],
    "description": "Row resize - vertical divider can be dragged"
  },
  "s-resize": {
    "file": "bottom_side.svg",
    "hotspot": [16, 24],
    "description": "South edge resize"
  },
  "se-resize": {
    "file": "bottom_right_corner.svg",
    "hotspot": [24, 24],
    "description": "South-East corner resize"
  },
  "sw-resize": {
    "file": "bottom_left_corner.svg",
    "hotspot": [8, 24],
    "description": "South-West corner resize"
  },
  "text": {
    "file": "text.svg",
    "hotspot": [16, 16],
    "description": "I-beam text selection cursor"
  },
  "vertical-text": {
    "file": "vertical-text.svg",
    "hotspot": [16, 16],
    "description": "Vertical text selection cursor"
  },
  "w-resize": {
    "file": "left_side.svg",
    "hotspot": [8, 16],
    "description": "West edge resize"
  },
  "wait": {
    "file": "wait.svg",
    "hotspot": [16, 16],
    "description": "Program busy / spinning wheel",
    "animated": true,
    "frames": [
      "wait-01.svg", "wait-02.svg", "wait-03.svg", "wait-04.svg",
      "wait-05.svg", "wait-06.svg", "wait-07.svg", "wait-08.svg",
      "wait-09.svg", "wait-10.svg", "wait-11.svg", "wait-12.svg",
      "wait-13.svg", "wait-14.svg", "wait-15.svg", "wait-16.svg",
      "wait-17.svg", "wait-18.svg", "wait-19.svg", "wait-20.svg",
      "wait-21.svg", "wait-22.svg", "wait-23.svg"
    ]
  },
  "zoom-in": {
    "file": "zoom-in.svg",
    "hotspot": [12, 12],
    "description": "Magnifying glass zoom in"
  },
  "zoom-out": {
    "file": "zoom-out.svg",
    "hotspot": [12, 12],
    "description": "Magnifying glass zoom out"
  }
};

// Export for WebExtension content scripts and options scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_CUSTOM_CLICKS_MAP, DEFAULT_WHITE_SUR_MAP: DEFAULT_CUSTOM_CLICKS_MAP };
} else if (typeof window !== 'undefined') {
  window.DEFAULT_CUSTOM_CLICKS_MAP = DEFAULT_CUSTOM_CLICKS_MAP;
  window.DEFAULT_WHITE_SUR_MAP = DEFAULT_CUSTOM_CLICKS_MAP;
}
