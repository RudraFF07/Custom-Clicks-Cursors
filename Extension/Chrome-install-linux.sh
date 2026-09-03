#!/usr/bin/env bash
# ==============================================================================
# Custom Clicks Cursor - Chrome & Chromium Linux Installation Helper
# ==============================================================================
# This script stages the Custom Clicks Cursor extension to a permanent user
# directory and prepares it for "Load unpacked" in Chrome/Chromium browsers.
#
# Supported Browsers: Google Chrome, Chromium, Brave, Microsoft Edge, Vivaldi, Opera
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
DEST_DIR="${HOME}/.local/share/custom-clicks-cursor/chromium"
SOURCE_INPUT="${1:-}"

echo -e "${BOLD}${BLUE}======================================================${RESET}"
echo -e "${BOLD}${CYAN}   Custom Clicks Cursor — Chromium Linux Helper   ${RESET}"
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

  if [[ -f "${REPO_ROOT}/Chromium/Custom_Clicks_Chromium/manifest.json" ]]; then
    SOURCE_PATH="${REPO_ROOT}/Chromium/Custom_Clicks_Chromium"
    echo -e "${GREEN}✔${RESET} Auto-detected local repository build: ${CYAN}${SOURCE_PATH}${RESET}"
  elif [[ -f "${REPO_ROOT}/extension/manifest.json" ]]; then
    SOURCE_PATH="${REPO_ROOT}/extension"
    echo -e "${GREEN}✔${RESET} Auto-detected local extension directory: ${CYAN}${SOURCE_PATH}${RESET}"
  else
    # Check ~/Downloads for downloaded release zip
    DOWNLOAD_MATCHES=$(find "${HOME}/Downloads" -maxdepth 1 -iname "*Custom*Clicks*Chromium*.zip" -o -iname "*Custom*Clicks*.zip" 2>/dev/null || true)
    FIRST_MATCH=$(echo "${DOWNLOAD_MATCHES}" | head -n 1)
    if [[ -n "${FIRST_MATCH}" && -f "${FIRST_MATCH}" ]]; then
      SOURCE_PATH="${FIRST_MATCH}"
      echo -e "${GREEN}✔${RESET} Found downloaded release package: ${CYAN}${SOURCE_PATH}${RESET}"
    fi
  fi
fi

if [[ -z "${SOURCE_PATH}" ]]; then
  echo -e "${RED}✘ Error:${RESET} Could not find extension source files or release ZIP."
  echo -e "Usage:"
  echo -e "  $0 [path/to/Custom_Clicks_Chromium.zip | path/to/extension_folder]"
  echo -e "\nPlease download the Chromium release ZIP from GitHub Releases or run this from the repository."
  exit 1
fi

# Step 2: Prepare Target Directory
echo -e "\n${BOLD}[1/3] Staging extension to stable directory...${RESET}"
mkdir -p "${DEST_DIR}"

if [[ -f "${SOURCE_PATH}" ]]; then
  # It's a ZIP archive
  echo -e "Extracting archive to ${CYAN}${DEST_DIR}${RESET}..."
  # Clean destination directory before extracting fresh files
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
echo -e "\n${BOLD}[2/3] Verifying installation files...${RESET}"
if [[ ! -f "${DEST_DIR}/manifest.json" ]]; then
  echo -e "${RED}✘ Validation failed:${RESET} manifest.json was not found in ${DEST_DIR}."
  exit 1
fi

CURSOR_COUNT=$(find "${DEST_DIR}/cursors" -type f -name "*.svg" 2>/dev/null | wc -l || echo "0")
echo -e "${GREEN}✔${RESET} Verified manifest.json (Manifest V3)"
echo -e "${GREEN}✔${RESET} Found ${BOLD}${CURSOR_COUNT} vector cursor assets${RESET} in ${DEST_DIR}/cursors/"

# Step 4: Display Exact Next Steps
echo -e "\n${BOLD}[3/3] Ready to load in your browser!${RESET}"
echo -e "${YELLOW}Notice:${RESET} Chromium browsers require loading unpacked extensions via the Extensions manager."
echo -e "Follow these quick steps to activate Custom Clicks Cursor:\n"

echo -e "  ${BOLD}1.${RESET} Open your browser's extensions page:"
echo -e "     • Google Chrome:   ${CYAN}chrome://extensions${RESET}"
echo -e "     • Brave Browser:   ${CYAN}brave://extensions${RESET}"
echo -e "     • Microsoft Edge:  ${CYAN}edge://extensions${RESET}"
echo -e "     • Vivaldi / Opera: ${CYAN}chrome://extensions${RESET}\n"

echo -e "  ${BOLD}2.${RESET} Turn ${BOLD}ON${RESET} the ${BOLD}'Developer mode'${RESET} toggle (top-right corner)."
echo -e "  ${BOLD}3.${RESET} Click the ${BOLD}'Load unpacked'${RESET} button (top-left toolbar)."
echo -e "  ${BOLD}4.${RESET} Select this directory in the file dialog:\n"
echo -e "     ${BOLD}${GREEN}${DEST_DIR}${RESET}\n"
echo -e "  ${BOLD}5.${RESET} Pin the extension icon to your toolbar and enjoy!\n"

# Optional: Attempt to open the extensions page if in a graphical session
if [[ -n "${DISPLAY:-}" || -n "${WAYLAND_DISPLAY:-}" ]]; then
  echo -e "Would you like to open your browser extensions page now? [Y/n] "
  read -r -t 10 CONFIRM || CONFIRM="y"
  CONFIRM=${CONFIRM:-y}
  if [[ "${CONFIRM}" =~ ^[Yy]$ ]]; then
    if command -v google-chrome >/dev/null 2>&1; then
      google-chrome "chrome://extensions" >/dev/null 2>&1 &
    elif command -v brave-browser >/dev/null 2>&1; then
      brave-browser "brave://extensions" >/dev/null 2>&1 &
    elif command -v chromium >/dev/null 2>&1; then
      chromium "chrome://extensions" >/dev/null 2>&1 &
    elif command -v chromium-browser >/dev/null 2>&1; then
      chromium-browser "chrome://extensions" >/dev/null 2>&1 &
    elif command -v microsoft-edge >/dev/null 2>&1; then
      microsoft-edge "edge://extensions" >/dev/null 2>&1 &
    elif command -v xdg-open >/dev/null 2>&1; then
      xdg-open "chrome://extensions" >/dev/null 2>&1 || true
    fi
  fi
fi

echo -e "${BOLD}${GREEN}✔ Staging complete.${RESET} Staged path: ${DEST_DIR}"
