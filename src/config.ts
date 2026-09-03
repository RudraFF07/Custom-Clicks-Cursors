/**
 * Centralized Application & Extension Configuration
 *
 * Update download store links, repository details, video asset paths,
 * and cursor resource URLs in one central place.
 */

export interface DownloadPlatformConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  ctaText: string;
  url: string;
  isLive: boolean; // Set to false if store review is in progress / coming soon
  badgeText?: string;
  iconName: 'edge' | 'firefox' | 'github';
  version: string;
  storeRating?: string;
}

export const APP_CONFIG = {
  name: 'Custom Clicks Cursor',
  tagline: 'Your browser. Your cursor.',
  shortDescription:
    'A modern browser cursor replacement with 90+ handcrafted vector cursors, zero-flicker behavior, smart web protection, per-site controls, and a privacy-first offline architecture.',
  version: 'v1.2.0',
  license: 'GNU GPL v3',
  releaseDate: 'September 2026',

  // Store & Repository URLs (configured in one place)
  urls: {
    edgeStore: 'https://microsoftedge.microsoft.com/addons/detail/custom-clicks-cursor/mmogkgejfphpjdjkokejfipnnhogfcfg',
    firefoxAddons: '#firefox-install', // User will supply exact page URL later
    github: 'https://github.com/RudraFF07/Custom-Clicks-Cursors',
    githubIssues: 'https://github.com/RudraFF07/Custom-Clicks-Cursors/issues',
    githubReleases: 'https://github.com/RudraFF07/Custom-Clicks-Cursors/releases',
    whiteSurSource: 'https://github.com/vinceliuice/WhiteSur-cursors',
  },

  // Video assets (can drop actual MP4/WebM files into /public/videos/)
  videoAssets: {
    heroDemo: '/videos/cursor-demo.mp4',
    showcase: '/videos/cursor-showcase.mp4',
    extensionOverview: '/videos/extension-demo.mp4',
    statesDemo: '/videos/cursor-states.mp4',
  },

  // Download Cards Config
  platforms: [
    {
      id: 'firefox',
      name: 'Mozilla Firefox',
      title: 'Get It for Firefox',
      subtitle: 'Official Firefox package. Instant installation across desktop tabs.',
      ctaText: 'Get It for Firefox',
      url: '#firefox-install', // User will supply exact URL later
      isLive: true,
      badgeText: 'Firefox',
      iconName: 'firefox',
      version: '1.2.0',
      storeRating: 'Page URL Coming Soon',
    },
    {
      id: 'edge',
      name: 'Microsoft Edge',
      title: 'Get it from Microsoft Edge Extension store',
      subtitle: 'Install directly from the Microsoft Edge Add-ons store with instant sync.',
      ctaText: 'Get it on Microsoft Edge',
      url: 'https://microsoftedge.microsoft.com/addons/detail/custom-clicks-cursor/mmogkgejfphpjdjkokejfipnnhogfcfg',
      isLive: true,
      badgeText: 'Edge Add-ons',
      iconName: 'edge',
      version: '1.2.0',
      storeRating: 'Official Store',
    },
    {
      id: 'github',
      name: 'GitHub',
      title: 'GitHub Releases & Source',
      subtitle: 'Full source code, unpacked extensions, issue tracker, and contributions.',
      ctaText: 'View on GitHub',
      url: 'https://github.com/RudraFF07/Custom-Clicks-Cursors',
      isLive: true,
      badgeText: 'GNU GPL v3',
      iconName: 'github',
      version: 'v1.2.0',
    },
  ] as DownloadPlatformConfig[],

  // Legal & Attribution
  disclaimer:
    'Custom Clicks Cursor is an open-source project released under the GNU General Public License v3.0. Vector cursor SVGs are sourced from the open-source WhiteSur-cursors theme created by vinceliuice under GNU GPL v3. Custom Clicks is independent and not affiliated with Apple Inc. or Microsoft Corporation.',
};
