/**
 * Custom Clicks Extension Options Logic
 */

(function () {
  'use strict';

  let currentConfig = {
    extensionEnabled: true,
    customMap: {},
    disabledCursors: [],
    excludedDomains: []
  };

  const defaultMap = window.DEFAULT_CUSTOM_CLICKS_MAP || window.DEFAULT_WHITE_SUR_MAP || {};

  // Cross-browser extension API abstraction (Chrome, Edge, Brave, Firefox, Opera)
  const extApi = (typeof chrome !== 'undefined' && chrome.runtime) 
    ? chrome 
    : (typeof browser !== 'undefined' && browser.runtime) 
      ? browser 
      : null;

  // Elements
  const masterToggle = document.getElementById('masterToggle');
  const masterToggleLabel = document.getElementById('masterToggleLabel');
  const newDomainInput = document.getElementById('newDomainInput');
  const addDomainBtn = document.getElementById('addDomainBtn');
  const domainTags = document.getElementById('domainTags');
  const mappingTableBody = document.getElementById('mappingTableBody');
  const addMappingBtn = document.getElementById('addMappingBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const importJsonInput = document.getElementById('importJsonInput');
  const statusMessage = document.getElementById('statusMessage');

  // Modal elements
  const customModal = document.getElementById('customModal');
  const modalKeyword = document.getElementById('modalKeyword');
  const modalFile = document.getElementById('modalFile');
  const modalHotspotX = document.getElementById('modalHotspotX');
  const modalHotspotY = document.getElementById('modalHotspotY');
  const modalDesc = document.getElementById('modalDesc');
  const modalSaveBtn = document.getElementById('modalSaveBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');

  function showStatus(text, isError = false) {
    statusMessage.textContent = text;
    statusMessage.className = 'status-msg ' + (isError ? 'error' : '');
    statusMessage.classList.remove('hidden');
    setTimeout(() => {
      statusMessage.classList.add('hidden');
    }, 4000);
  }

  function getEffectiveMap() {
    return Object.assign({}, defaultMap, currentConfig.customMap);
  }

  function saveConfig() {
    if (extApi && extApi.storage && extApi.storage.local) {
      extApi.storage.local.set(currentConfig, function () {
        showStatus('Settings saved successfully!');
      });
    } else {
      localStorage.setItem('custom_clicks_cursor_cfg', JSON.stringify(currentConfig));
      showStatus('Settings saved (localStorage mode)');
    }
  }

  function loadConfig(callback) {
    if (extApi && extApi.storage && extApi.storage.local) {
      extApi.storage.local.get(['extensionEnabled', 'customMap', 'disabledCursors', 'excludedDomains'], function (res) {
        if (res) {
          if (typeof res.extensionEnabled === 'boolean') currentConfig.extensionEnabled = res.extensionEnabled;
          if (res.customMap && typeof res.customMap === 'object') currentConfig.customMap = res.customMap;
          if (Array.isArray(res.disabledCursors)) currentConfig.disabledCursors = res.disabledCursors;
          if (Array.isArray(res.excludedDomains)) currentConfig.excludedDomains = res.excludedDomains;
        }
        if (callback) callback();
      });
    } else {
      const stored = localStorage.getItem('custom_clicks_cursor_cfg');
      if (stored) {
        try {
          currentConfig = JSON.parse(stored);
        } catch (e) {}
      }
      if (callback) callback();
    }
  }

  function renderMasterToggle() {
    masterToggle.checked = currentConfig.extensionEnabled;
    masterToggleLabel.textContent = currentConfig.extensionEnabled ? 'Extension Enabled' : 'Extension Disabled';
  }

  function renderDomainTags() {
    domainTags.innerHTML = '';
    currentConfig.excludedDomains.forEach((domain, idx) => {
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = `<span>${escapeHtml(domain)}</span><span class="tag-remove" data-idx="${idx}">&times;</span>`;
      domainTags.appendChild(tag);
    });
  }

  function renderMappingTable() {
    mappingTableBody.innerHTML = '';
    const effective = getEffectiveMap();
    const disabledSet = new Set(currentConfig.disabledCursors);

    const keys = Object.keys(effective).sort();

    keys.forEach(keyword => {
      const item = effective[keyword];
      const isEnabled = !disabledSet.has(keyword);
      const row = document.createElement('tr');

      const hotspotX = (item.hotspot && typeof item.hotspot[0] === 'number') ? item.hotspot[0] : 0;
      const hotspotY = (item.hotspot && typeof item.hotspot[1] === 'number') ? item.hotspot[1] : 0;

      row.innerHTML = `
        <td>
          <input type="checkbox" class="cursor-toggle" data-keyword="${keyword}" ${isEnabled ? 'checked' : ''}>
        </td>
        <td><code>${escapeHtml(keyword)}</code></td>
        <td>
          <input type="text" class="file-input" data-keyword="${keyword}" value="${escapeHtml(item.file || '')}">
        </td>
        <td>
          <input type="number" class="num-input hotspot-x" data-keyword="${keyword}" min="0" max="64" value="${hotspotX}">
        </td>
        <td>
          <input type="number" class="num-input hotspot-y" data-keyword="${keyword}" min="0" max="64" value="${hotspotY}">
        </td>
        <td style="color: var(--text-muted);">${escapeHtml(item.description || '')}</td>
        <td>
          ${defaultMap[keyword] ? '<span style="font-size:11px; color:var(--text-muted);">Default</span>' : `<button class="btn danger delete-btn" style="padding:2px 8px; font-size:11px;" data-keyword="${keyword}">Delete</button>`}
        </td>
      `;

      mappingTableBody.appendChild(row);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Event Listeners
  masterToggle.addEventListener('change', function () {
    currentConfig.extensionEnabled = masterToggle.checked;
    renderMasterToggle();
    saveConfig();
  });

  addDomainBtn.addEventListener('click', function () {
    const val = newDomainInput.value.trim().toLowerCase();
    if (val && !currentConfig.excludedDomains.includes(val)) {
      currentConfig.excludedDomains.push(val);
      newDomainInput.value = '';
      renderDomainTags();
      saveConfig();
    }
  });

  newDomainInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addDomainBtn.click();
  });

  domainTags.addEventListener('click', function (e) {
    if (e.target.classList.contains('tag-remove')) {
      const idx = parseInt(e.target.getAttribute('data-idx'), 10);
      if (!isNaN(idx)) {
        currentConfig.excludedDomains.splice(idx, 1);
        renderDomainTags();
        saveConfig();
      }
    }
  });

  mappingTableBody.addEventListener('change', function (e) {
    const target = e.target;
    const keyword = target.getAttribute('data-keyword');
    if (!keyword) return;

    if (target.classList.contains('cursor-toggle')) {
      const disabledSet = new Set(currentConfig.disabledCursors);
      if (target.checked) {
        disabledSet.delete(keyword);
      } else {
        disabledSet.add(keyword);
      }
      currentConfig.disabledCursors = Array.from(disabledSet);
      saveConfig();
    } else if (target.classList.contains('file-input')) {
      const currentMap = getEffectiveMap();
      const existing = currentMap[keyword] || {};
      existing.file = target.value.trim();
      currentConfig.customMap[keyword] = existing;
      saveConfig();
    } else if (target.classList.contains('hotspot-x') || target.classList.contains('hotspot-y')) {
      const row = target.closest('tr');
      const xInput = row.querySelector('.hotspot-x');
      const yInput = row.querySelector('.hotspot-y');
      const currentMap = getEffectiveMap();
      const existing = currentMap[keyword] || {};
      existing.hotspot = [parseInt(xInput.value, 10) || 0, parseInt(yInput.value, 10) || 0];
      currentConfig.customMap[keyword] = existing;
      saveConfig();
    }
  });

  mappingTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      const keyword = e.target.getAttribute('data-keyword');
      if (keyword && currentConfig.customMap[keyword]) {
        delete currentConfig.customMap[keyword];
        renderMappingTable();
        saveConfig();
      }
    }
  });

  resetDefaultsBtn.addEventListener('click', function () {
    if (confirm('Restore all cursor mappings and hotspot coordinates to initial defaults?')) {
      currentConfig.customMap = {};
      currentConfig.disabledCursors = [];
      renderMappingTable();
      saveConfig();
      showStatus('Restored default cursor mapping.');
    }
  });

  addMappingBtn.addEventListener('click', function () {
    modalKeyword.value = '';
    modalFile.value = '';
    modalHotspotX.value = '1';
    modalHotspotY.value = '1';
    modalDesc.value = '';
    customModal.classList.remove('hidden');
  });

  modalCancelBtn.addEventListener('click', function () {
    customModal.classList.add('hidden');
  });

  modalSaveBtn.addEventListener('click', function () {
    const kw = modalKeyword.value.trim().toLowerCase();
    const file = modalFile.value.trim();
    if (!kw || !file) {
      alert('Please provide both a CSS keyword and an SVG filename.');
      return;
    }

    currentConfig.customMap[kw] = {
      file: file,
      hotspot: [parseInt(modalHotspotX.value, 10) || 0, parseInt(modalHotspotY.value, 10) || 0],
      description: modalDesc.value.trim() || 'Custom user mapping'
    };

    customModal.classList.add('hidden');
    renderMappingTable();
    saveConfig();
  });

  exportJsonBtn.addEventListener('click', function () {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentConfig, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "custom-clicks-cursor-config.json");
    dlAnchor.click();
  });

  importJsonInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (typeof imported === 'object') {
          currentConfig = Object.assign(currentConfig, imported);
          renderMasterToggle();
          renderDomainTags();
          renderMappingTable();
          saveConfig();
          showStatus('Imported configuration successfully!');
        }
      } catch (err) {
        showStatus('Error parsing JSON configuration file', true);
      }
    };
    reader.readAsText(file);
  });

  // Init
  loadConfig(function () {
    renderMasterToggle();
    renderDomainTags();
    renderMappingTable();
  });
})();
