<div align="center">

# Custom Clicks Cursor

> **Your browser. Your cursor.**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Manifest Version: V3](https://img.shields.io/badge/Manifest-V3-success.svg)](manifest.json)
[![Browsers: Chrome | Firefox | Edge | Brave](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Firefox%20%7C%20Edge%20%7C%20Brave-orange.svg)](#browser-support)
[![GitHub Release](https://img.shields.io/github/v/release/RudraFF07/Custom-Clicks-Cursors?logo=github&color=brightgreen)](https://github.com/RudraFF07/Custom-Clicks-Cursors/releases)
[![Privacy: 100% Offline](https://img.shields.io/badge/Privacy-100%25%20Offline-brightgreen.svg)](https://github.com/RudraFF07/Custom-Clicks-Cursors#privacy)
[![Zero Flicker](https://img.shields.io/badge/Performance-Zero%20Flicker-blueviolet.svg)](#features)
Visit https://custom-clicks-cursor.ai.studio Or https://rudraff07.github.io/Custom-Clicks-Cursors/
<br />

<img src="Promotional/large_promotional_tile_1400x560.png" alt="Custom Clicks Cursor Banner" width="100%" style="border-radius: 8px;" />

<br />
<br />

**Custom Clicks Cursor** is a modern, privacy-first browser extension that replaces standard web CSS cursors with sleek, high-definition vector cursor designs while preserving custom website cursors.

[Explore Features](#features) • [Browser Support](#browser-support) • [Installation Guide](#installation) • [Linux Helpers](#linux-installation) • [License & Credits](#license)

</div>

---

## 📖 Table of Contents

- [What is Custom Clicks Cursor?](#what-is-custom-clicks-cursor)
- [Key Features](#features)
- [Why Custom Clicks Cursor?](#why-custom-clicks-cursor)
- [Cursor System & Showcase](#cursor-system)
- [Browser Support](#browser-support)
- [Installation](#installation)
  - [Official Stores](#official-stores)
  - [GitHub Releases](#github-releases)
  - [Chromium Offline / Manual Installation](#chromium-offline--manual-installation)
  - [Firefox Offline / Manual Installation](#firefox-offline--manual-installation)
- [Linux Installation](#linux-installation)
  - [Method 1: Manual Loading](#method-1--manual-loading)
  - [Method 2: Command-Line Helper Scripts](#method-2--command-line-helper-scripts)
- [Usage & Controls](#usage)
- [Settings & Customization](#settings--customization)
- [Privacy Architecture](#privacy)
- [Project Structure](#project-structure)
- [Development & Packaging](#development--packaging)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License & Credits](#license)
- [Disclaimer](#disclaimer)

---

## What is Custom Clicks Cursor?

Standard desktop browser pointers often look dated or pixelated on modern high-DPI displays. While many cursor changer extensions exist, they frequently suffer from visible cursor flickering when hovering over links, heavy JavaScript polling on mouse movements, intrusive advertising, or breaking complex web applications.

**Custom Clicks Cursor** solves this with an elegant, native CSS-based approach:

- **What it does**: Dynamically maps standard CSS cursor states (`default`, `pointer`, `text`, `grab`, `col-resize`, etc.) to crisp, scalable SVG vector assets inspired by clean desktop aesthetics.
- **How it works**: Injects lightweight CSS custom properties (`--ws-cur-*`) directly into the document root. Cursor transitions happen natively in the browser rendering engine with **zero CPU polling** on mouse movements.
- **Who it is for**: Developers, designers, power users, and anyone wanting a cohesive, modern desktop cursor aesthetic without sacrificing browser performance or privacy.

> **Note**: Custom Clicks Cursor enhances the visual presentation of your mouse pointer. It does **not** alter website DOM layout, track your clicks, or tamper with page content.

---

## Features

### ⚡ Zero-Flicker Cursor Engine
Cursor transitions use native CSS inheritance and targeted element rules (`a`, `button`, `input`, `summary`, etc.). By binding custom vectors to CSS custom properties rather than rewriting inline element styles on continuous `mousemove` events, pointer changes are instant and free of visual stutter or delay.

### 🎨 93 Handcrafted Vector Cursors
Includes **93 vector SVG assets** covering all standard CSS cursor keywords, directional resize axes, precision crosshairs, document states, and fluid multi-frame animated spinning wheels for `wait` and `progress`.

### 🛡️ Smart Web Protection
The engine respects web application semantics:
- **`cursor: none` Preservation**: Preserves `cursor: none` in full-screen video players, web games, and canvas tools. Your pointer will never get in the way.
- **Custom Website Cursors**: Websites providing their own custom image cursors (`cursor: url(...)`) are never overwritten.
- **Graceful Keyword Fallback**: Any unmapped or non-standard cursor gracefully falls back to the browser's native cursor handling.

### 🌐 Per-Site Quick Controls
A single click in the extension toolbar popup lets you pause custom cursors for the current website (e.g. Figma, Canva, or Google Docs) while keeping them enabled for the rest of your browsing.

### ⚙️ Visual Settings & Hotspot Calibrator
An integrated options dashboard (`options.html`) lets you:
- Adjust individual cursor hotspot coordinates $(X, Y)$ with pixel precision.
- Enable or disable specific cursor types independently.
- Map custom keywords to any SVG asset in the cursor catalog.
- Export and import your entire configuration as clean JSON.

### 🔒 100% Offline & Privacy-First
- **Zero network requests**: No analytics, telemetry, remote font loading, or external CDNs.
- **Local storage only**: Configuration resides strictly on your machine via `chrome.storage.local` / `browser.storage.local`.

---

## Why Custom Clicks Cursor?

| Custom Clicks Cursor | Typical Cursor Extensions |
|---|---|
| **Ultra-sharp SVG vectors** that scale flawlessly on 4K & Retina displays | Low-resolution 32×32 pixelated `.cur` or `.png` images |
| **Native CSS root variable injection** with 0ms hover latency | Heavy `mousemove` JavaScript listeners causing CPU drain |
| **Smart preservation** of `cursor: none` and web-game canvases | Overrides full-screen video and interactive canvas tools |
| **Complete state coverage** (resize, text, drag, busy spinners) | Only replaces pointer and default arrow |
| **Per-site toggle** and complete hotspot calibration | All-or-nothing activation with fixed anchor points |
| **100% offline & open-source (GPLv3)** | Frequent tracking scripts or third-party ads |

---

## Cursor System

The extension maps standard CSS keywords to specific SVG assets in `extension/cursors/`. Below is a representative overview of the 93 bundled vector files:

<details open>
<summary><b>📂 Core Cursor Catalog (Click to expand/collapse)</b></summary>
<br />

| Category | CSS Keywords | Vector Assets | Default Hotspot | Description |
|---|---|---|:---:|---|
| **Pointers & Arrows** | `default`, `auto` | `default.svg` | `(1, 1)` | Sleek arrow pointer for general UI |
| | `pointer` | `pointer.svg` | `(6, 1)` | Actionable link and button pointer |
| | `help` | `help.svg` | `(1, 1)` | Pointer with help indicator |
| | `context-menu` | `context-menu.svg` | `(1, 1)` | Context menu available |
| **Text & Editing** | `text` | `text.svg` | `(16, 16)` | High-contrast I-beam text selector |
| | `vertical-text` | `vertical-text.svg` | `(16, 16)` | Vertical writing selector |
| | `cell` | `cell.svg` | `(16, 16)` | Spreadsheet cell selection indicator |
| **Hands & Dragging** | `grab` | `openhand.svg` | `(16, 16)` | Open hand indicating grabbable content |
| | `grabbing` | `fleur.svg` | `(16, 16)` | Closed/active hand during drag operations |
| | `move` | `dnd-move.svg` | `(16, 16)` | 4-way movable element indicator |
| | `all-scroll` | `all-scroll.svg` | `(16, 16)` | Omnidirectional scroll indicator |
| **Table & Grid Resize** | `col-resize` | `col-resize.svg` | `(16, 16)` | Horizontal column divider drag |
| | `row-resize` | `row-resize.svg` | `(16, 16)` | Vertical row divider drag |
| **Directional Resize** | `ew-resize`, `w-resize`, `e-resize` | `size_hor.svg`, `left_side.svg`, `right_side.svg` | Centered | Horizontal edge resizing |
| | `ns-resize`, `n-resize`, `s-resize` | `size_ver.svg`, `top_side.svg`, `bottom_side.svg` | Centered | Vertical edge resizing |
| | `nesw-resize`, `ne-resize`, `sw-resize`| `size_fdiag.svg`, `top_right_corner.svg`, `bottom_left_corner.svg` | Corner | Diagonal resizing |
| | `nwse-resize`, `nw-resize`, `se-resize`| `size_bdiag.svg`, `top_left_corner.svg`, `bottom_right_corner.svg` | Corner | Reverse diagonal resizing |
| **Precision & Tools** | `crosshair` | `crosshair.svg` | `(16, 16)` | Precision targeting and selection cross |
| | `zoom-in` | `zoom-in.svg` | `(12, 12)` | Magnifying glass zoom in |
| | `zoom-out` | `zoom-out.svg` | `(12, 12)` | Magnifying glass zoom out |
| **Status & Restrict** | `not-allowed` | `not-allowed.svg` | `(16, 16)` | Disabled element or forbidden action |
| | `no-drop` | `dnd-no-drop.svg` | `(1, 1)` | Drop forbidden at current drop target |
| | `copy` | `copy.svg` | `(1, 1)` | Content copy indicator |
| | `alias` | `alias.svg` | `(1, 1)` | Shortcut or alias creation indicator |
| **Animated Busy** | `wait` | `wait.svg` (24 frames) | `(16, 16)` | Smooth spinning loading wheel |
| | `progress` | `progress.svg` (24 frames) | `(1, 1)` | Arrow with spinning progress wheel |

> All 93 SVG assets and animation frame files can be viewed directly in [`extension/cursors/`](extension/cursors/).

</details>

---

## Browser Support

Both **Chromium** (Manifest V3) and **Firefox** (Manifest V3 with Gecko configuration) builds are supported natively:

| Browser | Supported Engine | Compatibility | Installation Method |
|---|---|:---:|---|
| **Google Chrome** | Chromium MV3 | Full | Unpacked / Web Store |
| **Brave Browser** | Chromium MV3 | Full | Unpacked |
| **Microsoft Edge** | Chromium MV3 | Full | Unpacked / Edge Add-ons |
| **Mozilla Firefox** | Gecko MV3 | Full (`min_version: 109.0`) | Temporary Add-on / AMO |
| **Opera / Opera GX** | Chromium MV3 | Full | Unpacked |
| **Vivaldi** | Chromium MV3 | Full | Unpacked |
| **Arc Browser** | Chromium MV3 | Full | Unpacked |
| **Librewolf / Waterfox** | Gecko MV3 | Full | Temporary Add-on |

---

## Installation

### Official Stores

- **Firefox Add-ons (AMO)**: *(Submission in progress)*
- **Microsoft Edge Add-ons**: *(Submission in progress)*
- **Chrome Web Store**: *(Submission in progress)*

---

### GitHub Releases

Pre-packaged extension archives are provided on the [GitHub Releases](https://github.com/RudraFF07/Custom-Clicks-Cursors/releases) page:

1. Navigate to the **[Releases](https://github.com/RudraFF07/Custom-Clicks-Cursors/releases)** section.
2. Download the package for your browser:
   - `Custom_Clicks_Chromium.zip` (for Google Chrome, Edge, Brave, Opera, Vivaldi, Arc)
   - `Custom_Clicks_Firefox.zip` (for Mozilla Firefox, Librewolf, Waterfox)
3. Follow the browser-specific steps below to load the extension.

---

### Chromium Offline / Manual Installation

*(Google Chrome, Microsoft Edge, Brave, Vivaldi, Opera, Arc)*

Because browsers enforce security on unsigned extensions, local installations use the browser's built-in **"Load unpacked"** developer mechanism.

1. Download or extract `Custom_Clicks_Chromium.zip` (or use the repository's `Chromium/Custom_Clicks_Chromium/` directory).
2. Move the extracted folder to a permanent location (e.g. `Documents` or `~/.local/share/`), so it will not be accidentally deleted.
3. Open your browser and navigate to the extensions management page:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Edge: `edge://extensions`
   - Vivaldi / Opera: `chrome://extensions`
4. Toggle **ON** the **"Developer mode"** switch in the top-right corner.
5. Click the **"Load unpacked"** button in the top-left toolbar.
6. Select the folder containing `manifest.json` (`Custom_Clicks_Chromium/`).
7. Custom Clicks Cursor will appear in your extension list and activate immediately across all open tabs.
8. *(Recommended)* Pin the extension icon to your toolbar for quick access.

> ⚠️ **Note**: Do not delete or move the extracted folder after loading it; Chromium reads extension files directly from this path.

---

### Firefox Offline / Manual Installation

Mozilla Firefox enforces strict add-on signing for permanent production installations. You have three ways to run Custom Clicks Cursor in Firefox:

#### Option A: Temporary Add-on (All Firefox Versions)
Ideal for testing, local development, or offline use:

1. Download and extract `Custom_Clicks_Firefox.zip` (or use `Firefox/Custom_Clicks_Firefox/`).
2. In Firefox, navigate to `about:debugging#/runtime/this-firefox`.
3. Under **Temporary Extensions**, click **"Load Temporary Add-on..."**.
4. In the file picker, select `manifest.json` inside the `Custom_Clicks_Firefox` folder.
5. The extension will activate immediately.

> ℹ️ *Note: Temporary add-ons in standard Firefox remain active until Firefox is restarted.*

#### Option B: Official Signed Add-on (AMO)
Install the signed `.xpi` directly from Mozilla Add-ons without developer prompts.

#### Option C: Unsigned Permanent Installation (Firefox Developer Edition / Nightly)
1. Open `about:config`.
2. Set `xpinstall.signatures.required` to `false`.
3. Drag and drop the packaged extension file into Firefox.

---

## Linux Installation

On Linux distributions (Ubuntu, Fedora, Arch, Debian, openSUSE, etc.), you can install Custom Clicks Cursor either manually or using our automated staging helper scripts.

### Method 1 — Manual Loading
Follow the standard manual instructions: extract the release ZIP and load the directory via your browser's extension manager (`chrome://extensions` or `about:debugging`).

---

### Method 2 — Command-Line Helper Scripts

We provide dedicated bash helper scripts in the [`installation/`](installation/) directory. These scripts safely stage the extension files into standard user space (`~/.local/share/custom-clicks-cursor/`), verify the `manifest.json` and 93 SVG assets, and display the exact instructions to activate it in your browser.

If you don't have the repository cloned or a release ZIP downloaded yet, the scripts can automatically download the latest release directly from GitHub Releases!

#### Quick One-Liner (Terminal):

```bash
# For Chrome, Brave, Edge, Opera, Vivaldi:
curl -fsSL https://raw.githubusercontent.com/RudraFF07/Custom-Clicks-Cursors/main/installation/Chrome-linux-install.sh | bash

# For Mozilla Firefox & Librewolf:
curl -fsSL https://raw.githubusercontent.com/RudraFF07/Custom-Clicks-Cursors/main/installation/Firefox-linux-install.sh | bash
```

#### From Local Repository Clone:

```bash
# Make helper scripts executable
chmod +x installation/*.sh

# Run Chromium installer (auto-detects local files, ~/Downloads, or latest release)
./installation/Chrome-linux-install.sh

# Run Firefox installer
./installation/Firefox-linux-install.sh

# Or provide an explicit path to a release ZIP
./installation/Chrome-linux-install.sh ~/Downloads/Custom_Clicks_Chromium.zip
```

**What the helper scripts do:**
- Stage the extension in `~/.local/share/custom-clicks-cursor/<browser>/` so your files are kept safe in a predictable location.
- Verify manifest syntax and ensure all 93 vector assets are intact.
- Automatically fall back to downloading the latest release from [`RudraFF07/Custom-Clicks-Cursors`](https://github.com/RudraFF07/Custom-Clicks-Cursors) if local files aren't found.
- Offer to open your browser directly to the extension management screen.
- Never require root privileges (`sudo` is not needed).
- Never modify unrelated system files or browser configuration files.

---

## Usage

Once loaded, Custom Clicks Cursor runs automatically:

1. **Everyday Browsing**: Move your mouse across links, buttons, form inputs, and splitters to experience crisp vector cursors.
2. **Toolbar Popup**: Click the Custom Clicks Cursor icon in your browser toolbar to:
   - Toggle the extension globally **ON** or **OFF**.
   - View the current website domain status.
   - Click **"Pause on this site"** to whitelist sites that need their native cursors.
   - Jump directly to the Visual Settings Manager.

<br />

<div align="center">
  <img src="Promotional/screenshot_4_extension_popup.png" alt="Extension Popup Interface" width="48%" style="border-radius: 6px;" />
  <img src="Promotional/screenshot_5_options_manager.png" alt="Options Manager" width="48%" style="border-radius: 6px;" />
</div>

<br />

---

## Settings & Customization

Access the Settings Manager by right-clicking the extension icon and selecting **Options**, or clicking **Settings** in the popup.

<div align="center">
  <img src="Promotional/screenshot_3_interactive_drag_resize.png" alt="Custom Cursor Interaction" width="100%" style="border-radius: 8px;" />
</div>

<br />

- **Domain Exclusions**: Add domain names (e.g. `figma.com`, `docs.google.com`) to bypass custom cursors on specific web apps.
- **Hotspot Offsets**: Adjust the active click point $(X, Y)$ for any cursor to fit your visual preference.
- **Selective Activation**: Uncheck any cursor keyword in the table to retain the operating system's native cursor for that specific state.
- **Custom Keywords**: Add custom keyword-to-SVG mappings.
- **Backup & Share**: Use the **Export Configuration JSON** button to save your setup or transfer it to another browser profile.

---

## Privacy

Custom Clicks Cursor is architected with strict respect for user privacy:

```text
[Browser DOM]  <---(Native CSS Root Injection)---  [Custom Clicks Extension]
                                                          |
                                                  [Local Storage Only]
                                                  (chrome.storage.local)
                                                          |
                                                  [No Network Calls]
                                                  [No Telemetry]
                                                  [No Remote Code]
```

- **Zero Network Traffic**: The extension contains no `fetch()`, `XMLHttpRequest`, analytics SDKs, or background beaconing.
- **No Third-Party CDNs**: All 93 SVG vectors are bundled locally inside the extension package.
- **Permission Justifications**:
  - `storage`: Required exclusively to save user preferences locally (master toggle, domain exclusion list, custom mappings, hotspot offsets).
  - `activeTab`: Invoked solely when you open the popup to read the current tab's hostname for the 1-click "Pause on this site" button.

---

## Project Structure

```text
custom-clicks-cursor/
├── Chromium/
│   └── Custom_Clicks_Chromium/   # Ready-to-load Chromium extension (Manifest V3)
│       ├── manifest.json
│       ├── content.js
│       ├── cursor-map.js
│       ├── popup.html / .js / .css
│       ├── options.html / .js / .css
│       ├── icons/                # 16px, 48px, 128px icons
│       └── cursors/              # 93 bundled SVG cursor assets
├── Firefox/
│   └── Custom_Clicks_Firefox/    # Ready-to-load Firefox extension (Gecko ID configured)
│       ├── manifest.json
│       └── ...
├── extension/                    # Canonical extension source directory
├── installation/                 # Linux helper scripts
│   ├── Chrome-linux-install.sh   # Staging helper for Chrome, Edge, Brave, Opera
│   ├── Firefox-linux-install.sh  # Staging helper for Firefox & Librewolf
│   └── package-release.sh        # Distribution packaging & SHA-256 generator
├── Promotional/                  # Store banners, screenshots & search terms
│   ├── large_promotional_tile_1400x560.png
│   ├── small_promotional_tile_440x280.png
│   ├── screenshot_1_browsing.png ... screenshot_6_smart_protection.png
│   └── search_terms.txt
├── CREDITS.md                    # Detailed open-source asset attributions
├── LICENSE                       # GNU General Public License v3.0
└── README.md                     # Project documentation
```

---

## Development & Packaging

### Testing Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/RudraFF07/Custom-Clicks-Cursors.git
   cd Custom-Clicks-Cursors
   ```
2. Make edits to `extension/content.js`, `extension/cursor-map.js`, or the options pages.
3. Sync changes to the browser-specific folders or load `extension/` directly in Developer Mode.

### Building Release Packages

To package production `.zip` files with SHA-256 checksums:

```bash
chmod +x installation/package-release.sh
./installation/package-release.sh
```

This generates:
- `dist/releases/Custom_Clicks_Chromium.zip`
- `dist/releases/Custom_Clicks_Firefox.zip`
- `dist/releases/SHA256SUMS.txt`

---

## Troubleshooting

### Cursors do not appear on internal browser tabs
Browser security policies forbid extensions from executing content scripts on privileged internal pages (e.g. `chrome://`, `edge://`, `about:`, or the Chrome Web Store). Cursors activate normally as soon as you navigate to any standard web page (`http://` or `https://`).

### Cursors did not update immediately after loading
Reload any existing browser tabs once (`Ctrl+R` / `F5`) so the content script can inject the dynamic CSS stylesheet. Newly opened tabs receive the stylesheet automatically.

### The cursor clicks slightly off-center
Open the **Settings Manager** (`options.html`) and inspect the Hotspot $(X, Y)$ coordinates for that cursor type. Adjust the coordinates by 1–2 pixels to align with your personal preference, then click Save.

### Firefox removed the extension after restart
Standard Firefox unloads temporary extensions when closed. To keep the extension loaded across sessions, install from the official Mozilla Add-ons listing when available, or use Firefox Developer Edition with `xpinstall.signatures.required` set to `false`.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Vector Quality**: SVG files added to `cursors/` must be optimized and contain well-formed XML with defined `viewBox` attributes.
2. **License Compatibility**: All contributed cursor graphics must be compatible with the **GNU General Public License v3.0 (GPL-3.0)**.
3. **Hotspot Accuracy**: When adding or updating cursor definitions in `cursor-map.js`, verify the active click point $(X, Y)$ across multiple zoom levels.
4. **Code Cleanliness**: Maintain zero external dependencies in extension content scripts and preserve passive event handling.

---

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0).  
See the [`LICENSE`](LICENSE) file for the full license text.

---

## Credits

Custom Clicks Cursor incorporates and builds upon high-quality open-source themes from the community:

- **Upstream Cursor Theme**: [WhiteSur Cursors](https://github.com/vinceliuice/WhiteSur-cursors) by **Vinceliuice**, licensed under **GNU General Public License v3.0 (GPL-3.0)**.
- **Predecessor Lineage**: [Capitaine Cursors](https://github.com/keeferrourke/capitaine-cursors) by **Keefer Rourke**, licensed under **LGPL v3.0**.
- **Extension Author & Maintainer**: **Rudraksh** ([@RudraFF07](https://github.com/RudraFF07) • [sayhitorudraksh@gmail.com](mailto:sayhitorudraksh@gmail.com))

For complete attributions and SPDX identifiers, see [`CREDITS.md`](CREDITS.md).

---

## Disclaimer

*Custom Clicks Cursor is an independent open-source project. Google Chrome, Chromium, Mozilla Firefox, Microsoft Edge, Brave, Opera, and Vivaldi are trademarks of their respective owners. Reference to these browsers does not imply endorsement or affiliation.*

<br />

<div align="center">
<sub>Crafted with care for a cleaner web browsing experience.</sub>
</div>
