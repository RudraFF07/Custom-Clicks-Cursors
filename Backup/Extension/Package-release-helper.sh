#!/usr/bin/env bash
# ==============================================================================
# Custom Clicks Cursor - Release Packaging Helper
# ==============================================================================
# Builds clean, production-ready distribution archives for Chromium and Firefox.
# Outputs:
#   - dist/releases/Custom_Clicks_Chromium.zip
#   - dist/releases/Custom_Clicks_Firefox.zip
#   - dist/releases/SHA256SUMS.txt
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DIST_DIR="${REPO_ROOT}/dist/releases"

GITHUB_REPO="RudraFF07/Custom-Clicks-Cursors"

echo "Building release archives for ${GITHUB_REPO} in: ${DIST_DIR}"
mkdir -p "${DIST_DIR}"

create_zip() {
  local src_dir="$1"
  local output_zip="$2"

  if command -v zip >/dev/null 2>&1; then
    (cd "${src_dir}" && zip -r -q "${output_zip}" . -x "*.DS_Store" "*__MACOSX*")
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c "
import os, zipfile
src = os.path.abspath('${src_dir}')
out = os.path.abspath('${output_zip}')
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, _, files in os.walk(src):
        for file in files:
            if file == '.DS_Store' or '__MACOSX' in root:
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, src)
            zf.write(full_path, rel_path)
"
  else
    echo "Error: Neither 'zip' nor 'python3' is available to create archives." >&2
    exit 1
  fi
}

# 1. Package Chromium build
if [[ -d "${REPO_ROOT}/Chromium/Custom_Clicks_Chromium" ]]; then
  echo "Packaging Chromium extension..."
  CHROMIUM_SRC="${REPO_ROOT}/Chromium/Custom_Clicks_Chromium"
  create_zip "${CHROMIUM_SRC}" "${DIST_DIR}/Custom_Clicks_Chromium.zip"
  echo "✔ Created ${DIST_DIR}/Custom_Clicks_Chromium.zip"
fi

# 2. Package Firefox build
if [[ -d "${REPO_ROOT}/Firefox/Custom_Clicks_Firefox" ]]; then
  echo "Packaging Firefox extension..."
  FIREFOX_SRC="${REPO_ROOT}/Firefox/Custom_Clicks_Firefox"
  create_zip "${FIREFOX_SRC}" "${DIST_DIR}/Custom_Clicks_Firefox.zip"
  echo "✔ Created ${DIST_DIR}/Custom_Clicks_Firefox.zip"
fi

# 3. Generate SHA256 Checksums
echo "Generating SHA-256 checksums..."
if command -v sha256sum >/dev/null 2>&1; then
  (cd "${DIST_DIR}" && sha256sum Custom_Clicks_Chromium.zip Custom_Clicks_Firefox.zip > SHA256SUMS.txt)
elif command -v shasum >/dev/null 2>&1; then
  (cd "${DIST_DIR}" && shasum -a 256 Custom_Clicks_Chromium.zip Custom_Clicks_Firefox.zip > SHA256SUMS.txt)
fi

if [[ -f "${DIST_DIR}/SHA256SUMS.txt" ]]; then
  cat "${DIST_DIR}/SHA256SUMS.txt"
fi

echo -e "\n✔ Release packaging complete!"
echo -e "Files ready in: ${DIST_DIR}"
echo -e "\nTo publish these files to GitHub Releases:"
echo -e "  1. Web UI: https://github.com/${GITHUB_REPO}/releases/new"
echo -e "  2. GitHub CLI:"
echo -e "     gh release create v1.0.0 ${DIST_DIR}/*.zip ${DIST_DIR}/SHA256SUMS.txt --repo ${GITHUB_REPO} --title \"Custom Clicks Cursor v1.0.0\""
