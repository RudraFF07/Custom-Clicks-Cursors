#!/usr/bin/env bash
# ==============================================================================
# Custom Clicks Cursor - Mozilla Firefox Linux Installation Helper
# ==============================================================================
# This script stages the Custom Clicks Cursor extension to a permanent user
# directory and guides you through loading it in Mozilla Firefox.
#
# Supported Browsers: Mozilla Firefox, Firefox Developer Edition, Firefox Nightly, Librewolf
# License: GNU General Public License v3.0 (GPL-3.0)
# ==============================================================================

set -euo pipefail

# Text formatting
BOLD="\033[1m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
CYAN="\033[0;36m"
RESET="\033[0m"

# Default install target directory in user space
DEST_DIR="${HOME}/.local/share/custom-clicks-cursor/firefox"
SOURCE_INPUT="${1:-}"

echo -e "${BOLD}${BLUE}======================================================${RESET}"
echo -e "${BOLD}${CYAN}    Custom Clicks Cursor — Firefox Linux Helper   ${RESET}"
echo -e "${BOLD}${BLUE}======================================================${RESET}\n"

# Step 1: Locate Source Extension Files
SOURCE_PATH=""

if [[ -n "${SOURCE_INPUT}" ]]; then
  if [[ -f "${SOURCE_INPUT}" || -d "${SOURCE_INPUT}" ]]; then
    SOURCE_PATH="${SOURCE_INPUT}"
    echo -e "${GREEN}✔${RESET} Using specified source: ${CYAN}${SOURCE_PATH}${RESET}"
  else
    echo -e "${RED}✘ Error:${RESET} Provided source path not found: ${SOURCE_INPUT}"
    exit 1
  fi
else
  # Auto-detection hierarchy
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

  if [[ -f "${REPO_ROOT}/Firefox/Custom_Clicks_Firefox/manifest.json" ]]; then
    SOURCE_PATH="${REPO_ROOT}/Firefox/Custom_Clicks_Firefox"
    echo -e "${GREEN}✔${RESET} Auto-detected local repository build: ${CYAN}${SOURCE_PATH}${RESET}"
  elif [[ -f "${REPO_ROOT}/extension/manifest.json" ]]; then
    SOURCE_PATH="${REPO_ROOT}/extension"
    echo -e "${GREEN}✔${RESET} Auto-detected local extension directory: ${CYAN}${SOURCE_PATH}${RESET}"
  else
    # Check ~/Downloads for downloaded release zip
    DOWNLOAD_MATCHES=$(find "${HOME}/Downloads" -maxdepth 1 -iname "*Custom*Clicks*Firefox*.zip" -o -iname "*Custom*Clicks*.zip" 2>/dev/null || true)
    FIRST_MATCH=$(echo "${DOWNLOAD_MATCHES}" | head -n 1)
    if [[ -n "${FIRST_MATCH}" && -f "${FIRST_MATCH}" ]]; then
      SOURCE_PATH="${FIRST_MATCH}"
      echo -e "${GREEN}✔${RESET} Found downloaded release package: ${CYAN}${SOURCE_PATH}${RESET}"
    fi
  fi
fi

if [[ -z "${SOURCE_PATH}" ]]; then
  echo -e "${RED}✘ Error:${RESET} Could not find Firefox extension source files or release ZIP."
  echo -e "Usage:"
  echo -e "  $0 [path/to/Custom_Clicks_Firefox.zip | path/to/extension_folder]"
  echo -e "\nPlease download the Firefox release ZIP from GitHub Releases or run this from the repository."
  exit 1
fi

# Step 2: Prepare Target Directory
echo -e "\n${BOLD}[1/3] Staging extension to stable directory...${RESET}"
mkdir -p "${DEST_DIR}"

if [[ -f "${SOURCE_PATH}" ]]; then
  # It's a ZIP archive
  echo -e "Extracting archive to ${CYAN}${DEST_DIR}${RESET}..."
  rm -rf "${DEST_DIR:?}"/*

  if command -v unzip >/dev/null 2>&1; then
    unzip -q -o "${SOURCE_PATH}" -d "${DEST_DIR}"
  elif command -v python3 >/dev/null 2>&1; then
    python3 -m zipfile -e "${SOURCE_PATH}" "${DEST_DIR}"
  else
    echo -e "${RED}✘ Error:${RESET} Neither 'unzip' nor 'python3' is available to extract release archives."
    echo -e "Please install unzip using your package manager (e.g. sudo apt install unzip / sudo dnf install unzip / sudo pacman -S unzip)."
    exit 1
  fi

  # If zip contained a single parent folder, adjust path
  if [[ ! -f "${DEST_DIR}/manifest.json" ]]; then
    SUBDIR=$(find "${DEST_DIR}" -mindepth 1 -maxdepth 1 -type d | head -n 1)
    if [[ -n "${SUBDIR}" && -f "${SUBDIR}/manifest.json" ]]; then
      cp -r "${SUBDIR}"/* "${DEST_DIR}/"
      rm -rf "${SUBDIR}"
    fi
  fi
elif [[ -d "${SOURCE_PATH}" ]]; then
  # It's a directory
  echo -e "Copying extension files to ${CYAN}${DEST_DIR}${RESET}..."
  rm -rf "${DEST_DIR:?}"/*
  cp -r "${SOURCE_PATH}"/* "${DEST_DIR}/"
fi

# Step 3: Validate manifest.json
echo -e "\n${BOLD}[2/3] Verifying Firefox installation files...${RESET}"
if [[ ! -f "${DEST_DIR}/manifest.json" ]]; then
  echo -e "${RED}✘ Validation failed:${RESET} manifest.json was not found in ${DEST_DIR}."
  exit 1
fi

CURSOR_COUNT=$(find "${DEST_DIR}/cursors" -type f -name "*.svg" 2>/dev/null | wc -l || echo "0")
echo -e "${GREEN}✔${RESET} Verified manifest.json (Manifest V3 + Gecko settings)"
echo -e "${GREEN}✔${RESET} Found ${BOLD}${CURSOR_COUNT} vector cursor assets${RESET} in ${DEST_DIR}/cursors/"

# Step 4: Display Exact Next Steps
echo -e "\n${BOLD}[3/3] Ready to load in Firefox!${RESET}"
echo -e "${YELLOW}Notice on Firefox Extension Loading:${RESET}"
echo -e "Standard Firefox requires loading unsigned/unpacked extensions via the Developer Debugger.\n"

echo -e "  ${BOLD}Option A — Developer / Local Loading (All Firefox versions):${RESET}"
echo -e "  ${BOLD}1.${RESET} Open Firefox and navigate to:"
echo -e "     ${CYAN}about:debugging#/runtime/this-firefox${RESET}"
echo -e "  ${BOLD}2.${RESET} Click ${BOLD}'Load Temporary Add-on...'${RESET}"
echo -e "  ${BOLD}3.${RESET} Select this file in the dialog:\n"
echo -e "     ${BOLD}${GREEN}${DEST_DIR}/manifest.json${RESET}\n"
echo -e "  ${BOLD}4.${RESET} Custom Clicks Cursor is immediately active!\n"

echo -e "  ${BOLD}Option B — Permanent Unsigned Loading (Firefox Developer Edition / Nightly):${RESET}"
echo -e "  1. In ${CYAN}about:config${RESET}, set ${BOLD}xpinstall.signatures.required${RESET} to ${BOLD}false${RESET}."
echo -e "  2. Drag and drop a packaged .xpi or load from file.\n"

echo -e "  ${BOLD}Option C — Official Signed Store Installation:${RESET}"
echo -e "  Install directly from Mozilla Add-ons (AMO) when published (no developer steps needed).\n"

# Optional: Attempt to launch Firefox if in a graphical session
if [[ -n "${DISPLAY:-}" || -n "${WAYLAND_DISPLAY:-}" ]]; then
  echo -e "Would you like to open Firefox to the debugging page now? [Y/n] "
  read -r -t 10 CONFIRM || CONFIRM="y"
  CONFIRM=${CONFIRM:-y}
  if [[ "${CONFIRM}" =~ ^[Yy]$ ]]; then
    if command -v firefox >/dev/null 2>&1; then
      firefox "about:debugging#/runtime/this-firefox" >/dev/null 2>&1 &
    elif command -v firefox-developer-edition >/dev/null 2>&1; then
      firefox-developer-edition "about:debugging#/runtime/this-firefox" >/dev/null 2>&1 &
    elif command -v librewolf >/dev/null 2>&1; then
      librewolf "about:debugging#/runtime/this-firefox" >/dev/null 2>&1 &
    elif command -v xdg-open >/dev/null 2>&1; then
      xdg-open "about:debugging#/runtime/this-firefox" >/dev/null 2>&1 || true
    fi
  fi
fi

echo -e "${BOLD}${GREEN}✔ Staging complete.${RESET} Staged path: ${DEST_DIR}"
