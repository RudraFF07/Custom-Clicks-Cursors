/**
 * Custom Clicks Cursor Content Script
 * 
 * High-Performance, Zero-Flicker Architecture:
 * - Dynamic High-Specificity Global Stylesheet with CSS Custom Properties
 * - 0ms hardware-accelerated transitions (no per-pixel mousemove polling)
 * - Safe keyword detection via dataset attributes (avoids inline style thrashing)
 * - Preserves website custom cursors (cursor: url(...)) and cursor: none
 * - Seamless animation ticker via CSS root variables for wait and progress
 */

(function () {
  'use strict';

  // State
  let extensionEnabled = true;
  let cursorMap = Object.assign({}, (window.DEFAULT_CUSTOM_CLICKS_MAP || window.DEFAULT_WHITE_SUR_MAP) || {});
  let disabledCursors = new Set();
  let excludedDomains = [];
  let animTimer = null;
  let animFrameIndex = 0;

  const currentHost = window.location.hostname ? window.location.hostname.toLowerCase() : '';
  const STYLE_ID = 'custom-clicks-cursor-engine';

  // Cross-browser extension API abstraction
  const extApi = (typeof chrome !== 'undefined' && chrome.runtime) 
    ? chrome 
    : (typeof browser !== 'undefined' && browser.runtime) 
      ? browser 
      : null;

  // Helper to get local extension asset URL
  function getAssetUrl(filename) {
    if (extApi && extApi.runtime && extApi.runtime.getURL) {
      return extApi.runtime.getURL('cursors/' + filename);
    }
    return 'cursors/' + filename;
  }

  // Check if a URL string belongs to our extension
  function isOurExtensionUrl(urlStr) {
    if (!urlStr) return false;
    return urlStr.includes('chrome-extension://') || 
           urlStr.includes('moz-extension://') || 
           urlStr.includes('safari-web-extension://') ||
           urlStr.includes('cursors/');
  }

  // Check if current domain is excluded
  function isDomainExcluded() {
    if (!excludedDomains || excludedDomains.length === 0 || !currentHost) return false;
    return excludedDomains.some(domain => {
      if (!domain) return false;
      return currentHost === domain || currentHost.endsWith('.' + domain);
    });
  }

  // Generate CSS rules for all active mappings
  function generateCss() {
    if (!extensionEnabled || isDomainExcluded()) {
      return '';
    }

    const rules = [];
    const rootVars = [];

    // Build CSS variables and rules
    Object.keys(cursorMap).forEach(keyword => {
      if (disabledCursors.has(keyword)) return;
      const mapping = cursorMap[keyword];
      if (!mapping || !mapping.file) return;

      const hotspotX = (mapping.hotspot && typeof mapping.hotspot[0] === 'number') ? mapping.hotspot[0] : 0;
      const hotspotY = (mapping.hotspot && typeof mapping.hotspot[1] === 'number') ? mapping.hotspot[1] : 0;
      const fileUrl = getAssetUrl(mapping.file);

      const varName = `--ws-cur-${keyword}`;
      rootVars.push(`${varName}: url("${fileUrl}") ${hotspotX} ${hotspotY}, ${keyword};`);

      // Attribute selector rule
      rules.push(`[data-ws-cursor="${keyword}"], [data-ws-cursor="${keyword}"] * { cursor: var(${varName}) !important; }`);
    });

    // Native Element Target Rules for seamless, zero-lag hover
    if (!disabledCursors.has('default') && cursorMap['default']) {
      rules.push(`html, body { cursor: var(--ws-cur-default, auto); }`);
    }

    if (!disabledCursors.has('pointer') && cursorMap['pointer']) {
      rules.push(`
        a, a *, 
        button, button *, 
        [role="button"], [role="button"] *, 
        input[type="button"], input[type="submit"], input[type="reset"], 
        label[for], select, summary, 
        [tabindex]:not([tabindex="-1"]),
        .cursor-pointer {
          cursor: var(--ws-cur-pointer, pointer) !important;
        }
      `);
    }

    if (!disabledCursors.has('text') && cursorMap['text']) {
      rules.push(`
        input[type="text"], input[type="search"], input[type="email"], 
        input[type="password"], input[type="number"], input[type="tel"], 
        input[type="url"], textarea, [contenteditable="true"],
        .cursor-text {
          cursor: var(--ws-cur-text, text) !important;
        }
      `);
    }

    if (!disabledCursors.has('not-allowed') && cursorMap['not-allowed']) {
      rules.push(`
        [disabled], :disabled, [aria-disabled="true"], [disabled] * {
          cursor: var(--ws-cur-not-allowed, not-allowed) !important;
        }
      `);
    }

    // Preservation rules: If author specified cursor: none or custom cursor, do not force override
    rules.push(`
      [style*="cursor: none"], [style*="cursor:none"] {
        cursor: none !important;
      }
    `);

    return `
      :root {
        ${rootVars.join('\n        ')}
      }
      ${rules.join('\n      ')}
    `;
  }

  // Update or inject the global stylesheet
  function updateGlobalStyle() {
    let styleEl = document.getElementById(STYLE_ID);
    const css = generateCss();

    if (!css) {
      if (styleEl) styleEl.remove();
      stopAnimation();
      return;
    }

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(styleEl);
    }
    styleEl.textContent = css;

    startAnimation();
  }

  // Animate wait / progress cursors smoothly via CSS variables
  function startAnimation() {
    stopAnimation();
    if (!extensionEnabled || isDomainExcluded()) return;

    const waitMapping = cursorMap['wait'];
    const progressMapping = cursorMap['progress'];
    const hasAnimated = (waitMapping && waitMapping.animated) || (progressMapping && progressMapping.animated);

    if (!hasAnimated) return;

    animFrameIndex = 0;
    animTimer = setInterval(() => {
      animFrameIndex++;
      const root = document.documentElement;
      if (!root) return;

      if (waitMapping && waitMapping.animated && Array.isArray(waitMapping.frames) && waitMapping.frames.length > 0) {
        const frame = waitMapping.frames[animFrameIndex % waitMapping.frames.length];
        const hX = (waitMapping.hotspot && waitMapping.hotspot[0]) || 0;
        const hY = (waitMapping.hotspot && waitMapping.hotspot[1]) || 0;
        root.style.setProperty('--ws-cur-wait', `url("${getAssetUrl(frame)}") ${hX} ${hY}, wait`);
      }

      if (progressMapping && progressMapping.animated && Array.isArray(progressMapping.frames) && progressMapping.frames.length > 0) {
        const frame = progressMapping.frames[animFrameIndex % progressMapping.frames.length];
        const hX = (progressMapping.hotspot && progressMapping.hotspot[0]) || 0;
        const hY = (progressMapping.hotspot && progressMapping.hotspot[1]) || 0;
        root.style.setProperty('--ws-cur-progress', `url("${getAssetUrl(frame)}") ${hX} ${hY}, progress`);
      }
    }, 60); // 16.6fps smooth rotation
  }

  function stopAnimation() {
    if (animTimer) {
      clearInterval(animTimer);
      animTimer = null;
    }
  }

  // Inspect hovering target on mouseover to tag elements with semantic cursor types (e.g. col-resize, grab, crosshair)
  function handleMouseOver(event) {
    if (!extensionEnabled || isDomainExcluded()) return;

    const target = event.target;
    if (!target || !(target instanceof Element)) return;

    // If already tagged, skip
    if (target.dataset.wsCursor) return;

    // Check computed style
    const computed = window.getComputedStyle(target);
    const cursorStyle = computed ? computed.cursor : null;
    if (!cursorStyle) return;

    const trimmed = cursorStyle.trim();

    // Preserve cursor: none
    if (trimmed === 'none') return;

    // Preserve site's custom image cursors (unless it is our extension URL)
    if (trimmed.includes('url(')) {
      if (!isOurExtensionUrl(trimmed)) {
        return;
      }
    }

    // Extract keyword
    const parts = trimmed.split(',').map(s => s.trim());
    const keyword = parts[0].toLowerCase();

    if (keyword && cursorMap[keyword] && !disabledCursors.has(keyword)) {
      target.dataset.wsCursor = keyword;
    }
  }

  // Load user settings from storage
  function loadSettings() {
    if (extApi && extApi.storage && extApi.storage.local) {
      extApi.storage.local.get(['extensionEnabled', 'customMap', 'disabledCursors', 'excludedDomains'], function (res) {
        if (!res) return;
        if (typeof res.extensionEnabled === 'boolean') {
          extensionEnabled = res.extensionEnabled;
        }
        if (res.customMap && typeof res.customMap === 'object') {
          cursorMap = Object.assign({}, (window.DEFAULT_CUSTOM_CLICKS_MAP || window.DEFAULT_WHITE_SUR_MAP), res.customMap);
        }
        if (Array.isArray(res.disabledCursors)) {
          disabledCursors = new Set(res.disabledCursors);
        }
        if (Array.isArray(res.excludedDomains)) {
          excludedDomains = res.excludedDomains.map(d => d.trim().toLowerCase());
        }
        updateGlobalStyle();
      });

      // Listen for runtime updates from Options page / Popup
      if (extApi.storage.onChanged) {
        extApi.storage.onChanged.addListener(function (changes, area) {
          if (area === 'local') {
            if (changes.extensionEnabled) extensionEnabled = changes.extensionEnabled.newValue;
            if (changes.customMap) cursorMap = Object.assign({}, (window.DEFAULT_CUSTOM_CLICKS_MAP || window.DEFAULT_WHITE_SUR_MAP), changes.customMap.newValue);
            if (changes.disabledCursors) disabledCursors = new Set(changes.disabledCursors.newValue || []);
            if (changes.excludedDomains) excludedDomains = (changes.excludedDomains.newValue || []).map(d => d.trim().toLowerCase());
            updateGlobalStyle();
          }
        });
      }
    } else {
      updateGlobalStyle();
    }
  }

  // Initialize
  loadSettings();

  // Attach mouseover listener (fires once on element entry, ZERO per-pixel polling)
  document.addEventListener('mouseover', handleMouseOver, { passive: true, capture: true });

  // Re-inject stylesheet if DOM was rebuilt or dynamically updated
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateGlobalStyle);
  } else {
    updateGlobalStyle();
  }
})();
