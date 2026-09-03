/**
 * Custom Clicks Extension Popup Controller
 * Chromium (Chrome, Edge, Brave, Opera) & Firefox compatible
 */

(function () {
  'use strict';

  const extApi = (typeof chrome !== 'undefined' && chrome.runtime) 
    ? chrome 
    : (typeof browser !== 'undefined' && browser.runtime) 
      ? browser 
      : null;

  let currentConfig = {
    extensionEnabled: true,
    customMap: {},
    disabledCursors: [],
    excludedDomains: []
  };

  let activeTabUrl = '';
  let activeTabHostname = '';

  const masterToggle = document.getElementById('masterToggle');
  const statusBanner = document.getElementById('statusBanner');
  const statusText = document.getElementById('statusText');
  const currentDomainEl = document.getElementById('currentDomain');
  const toggleSiteBtn = document.getElementById('toggleSiteBtn');
  const activeMappingsCountEl = document.getElementById('activeMappingsCount');
  const excludedSitesCountEl = document.getElementById('excludedSitesCount');
  const openOptionsBtn = document.getElementById('openOptionsBtn');
  const openTestBtn = document.getElementById('openTestBtn');

  function updateUI() {
    masterToggle.checked = currentConfig.extensionEnabled;

    const isSiteExcluded = activeTabHostname && currentConfig.excludedDomains.some(d => {
      const domain = d.toLowerCase().trim();
      return activeTabHostname === domain || activeTabHostname.endsWith('.' + domain);
    });

    if (!currentConfig.extensionEnabled) {
      statusBanner.className = 'status-banner paused';
      statusText.textContent = 'Extension is disabled globally';
    } else if (isSiteExcluded) {
      statusBanner.className = 'status-banner paused';
      statusText.textContent = 'Paused on this website';
    } else {
      statusBanner.className = 'status-banner active';
      statusText.textContent = 'Custom Clicks cursors active';
    }

    if (activeTabHostname) {
      currentDomainEl.textContent = activeTabHostname;
      toggleSiteBtn.textContent = isSiteExcluded ? 'Resume on this site' : 'Pause on this site';
      toggleSiteBtn.disabled = false;
    } else {
      currentDomainEl.textContent = 'Internal browser tab';
      toggleSiteBtn.textContent = 'N/A on internal page';
      toggleSiteBtn.disabled = true;
    }

    const defaultMap = window.DEFAULT_CUSTOM_CLICKS_MAP || window.DEFAULT_WHITE_SUR_MAP || {};
    const effective = Object.assign({}, defaultMap, currentConfig.customMap);
    const disabledSet = new Set(currentConfig.disabledCursors || []);
    const activeCount = Object.keys(effective).filter(k => !disabledSet.has(k)).length;

    activeMappingsCountEl.textContent = activeCount.toString();
    excludedSitesCountEl.textContent = (currentConfig.excludedDomains || []).length.toString();
  }

  function saveConfig() {
    if (extApi && extApi.storage && extApi.storage.local) {
      extApi.storage.local.set(currentConfig, function () {
        updateUI();
      });
    } else {
      localStorage.setItem('custom_clicks_cursor_cfg', JSON.stringify(currentConfig));
      updateUI();
    }
  }

  function loadConfig() {
    if (extApi && extApi.storage && extApi.storage.local) {
      extApi.storage.local.get(['extensionEnabled', 'customMap', 'disabledCursors', 'excludedDomains'], function (res) {
        if (res) {
          if (typeof res.extensionEnabled === 'boolean') currentConfig.extensionEnabled = res.extensionEnabled;
          if (res.customMap && typeof res.customMap === 'object') currentConfig.customMap = res.customMap;
          if (Array.isArray(res.disabledCursors)) currentConfig.disabledCursors = res.disabledCursors;
          if (Array.isArray(res.excludedDomains)) currentConfig.excludedDomains = res.excludedDomains;
        }
        updateUI();
      });
    }
  }

  // Detect active tab
  if (extApi && extApi.tabs && extApi.tabs.query) {
    extApi.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs[0] && tabs[0].url) {
        activeTabUrl = tabs[0].url;
        try {
          const parsed = new URL(activeTabUrl);
          if (parsed.protocol.startsWith('http')) {
            activeTabHostname = parsed.hostname.toLowerCase();
          } else {
            activeTabHostname = '';
          }
        } catch (e) {
          activeTabHostname = '';
        }
      }
      updateUI();
    });
  }

  // Listeners
  masterToggle.addEventListener('change', function () {
    currentConfig.extensionEnabled = masterToggle.checked;
    saveConfig();
  });

  toggleSiteBtn.addEventListener('click', function () {
    if (!activeTabHostname) return;
    const idx = currentConfig.excludedDomains.indexOf(activeTabHostname);
    if (idx >= 0) {
      currentConfig.excludedDomains.splice(idx, 1);
    } else {
      currentConfig.excludedDomains.push(activeTabHostname);
    }
    saveConfig();
  });

  openOptionsBtn.addEventListener('click', function () {
    if (extApi && extApi.runtime && extApi.runtime.openOptionsPage) {
      extApi.runtime.openOptionsPage();
    } else {
      window.open('options.html', '_blank');
    }
  });

  openTestBtn.addEventListener('click', function () {
    if (extApi && extApi.tabs && extApi.tabs.create) {
      extApi.tabs.create({ url: 'https://vibhorjaiswal.github.io/Cursor-Test/' });
    } else {
      window.open('https://vibhorjaiswal.github.io/Cursor-Test/', '_blank');
    }
  });

  loadConfig();
})();
