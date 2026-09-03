# Custom Clicks Cursor (Chromium & Firefox Extension)

A privacy-first, ultra-lightweight WebExtension (Manifest V3) that dynamically and intelligently replaces standard web CSS cursor keywords with sleek, custom vector SVG cursor files across **Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi, Arc, and Mozilla Firefox**.

---

## 📁 Extension Architecture & Structure

```text
Custom_Clicks/
├── manifest.json       # Manifest V3 (Chromium & Firefox compliant)
├── content.js          # Passive computedStyle pointer-tracker & cursor injector
├── cursor-map.js       # Central keyword-to-SVG & hotspot definitions
├── options.html        # Settings page UI (Chrome & Firefox)
├── options.js          # Configuration persistence (chrome.storage / browser.storage)
├── options.css         # Options styling
├── popup.html          # Quick toggle popup
├── popup.js            # Popup controller logic
├── popup.css           # Popup styles
├── icons/              # 16px, 48px, 128px PNG icons
├── CREDITS.md          # Open-source attributions
├── LICENSE             # GNU General Public License v3.0
├── README.md           # Documentation & installation instructions
└── cursors/            # 90+ local SVG assets
    ├── alias.svg
    ├── all-scroll.svg
    ├── cell.svg
    ├── col-resize.svg
    ├── default.svg
    ├── openhand.svg
    ├── pointer.svg
    ├── progress.svg (and progress-01.svg .. 23.svg)
    ├── wait.svg (and wait-01.svg .. 23.svg)
    └── ...
```

---

## 🚀 How to Install & Load the Extension

### Step 1: Load in Google Chrome / Chromium (Edge, Brave, Opera, Vivaldi, Arc)
1. Open **Google Chrome** (or your Chromium-based browser).
2. Navigate to: `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3. Toggle ON **"Developer mode"** in the top right corner.
4. Click the **"Load unpacked"** button in the top left toolbar.
5. Select the `Custom_Clicks_Chromium/` directory containing `manifest.json`.
6. The extension is now active and ready!

---

### Step 2: Load in Mozilla Firefox
1. Open **Firefox**.
2. Type `about:debugging` in the address bar and press **Enter**.
3. Click on **"This Firefox"** in the left sidebar.
4. Under **Temporary Extensions**, click **"Load Temporary Add-on..."**.
5. Navigate to your `Custom_Clicks_Firefox/` directory and select `manifest.json`.
6. The extension is now active!

---

## 🎯 How Cursor Detection & Safety Works

1. **Hardware-Accelerated Dynamic CSS Engine**: High-specificity global rules ensure 0ms per-element latency and zero flickering across links, buttons, and text fields.
2. **Safety Fallback Hierarchy**:
   - `cursor: none`: **Preserved as-is**. Never replaced with an SVG.
   - `cursor: url(...)`: **Preserved as-is**. Author-provided custom image cursors are never modified.
   - **Unknown / Unmapped keywords**: **Preserved as-is**. No unexpected fallback occurs.
   - **Specific Semantic Keywords**: (e.g. `col-resize`, `grab`, `zoom-in`) are mapped precisely to their designated SVG asset.

---

## 📜 Credits & License
- Upstream cursor theme assets by Vinceliuice (https://github.com/vinceliuice/WhiteSur-cursors) under GPL-3.0.
- See `CREDITS.md` and `LICENSE` for full legal attributions.
