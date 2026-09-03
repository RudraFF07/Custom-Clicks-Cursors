/// <reference types="vite/client" />

/**
 * Asset URL helper to ensure compatibility with GitHub Pages
 * whether deployed at root, relative path, or repository subdirectory.
 */
export function getAssetUrl(path: string): string {
  const base = (import.meta as unknown as { env?: { BASE_URL?: string } })?.env?.BASE_URL || './';
  // Ensure base ends with a slash if it's not relative dot
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
